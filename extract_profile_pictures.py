#!/usr/bin/env python3
"""
Extract profile pictures from the first slide of PPTX files.
"""

import os
import zipfile
import shutil
import re
import xml.etree.ElementTree as ET
from pathlib import Path

def extract_profile_picture(pptx_path, output_dir):
    """
    Extract the profile picture from the first slide of a PPTX file.

    Args:
        pptx_path: Path to the PPTX file
        output_dir: Directory to save the extracted image

    Returns:
        Path to the extracted image or None if failed
    """
    pptx_name = Path(pptx_path).stem
    temp_dir = f"/tmp/pptx_extract_{os.getpid()}"

    try:
        # Extract PPTX (it's a ZIP file)
        with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read slide1.xml to find which image is on the first slide
        slide1_path = os.path.join(temp_dir, 'ppt', 'slides', 'slide1.xml')

        if not os.path.exists(slide1_path):
            print(f"Warning: slide1.xml not found in {pptx_name}")
            return None

        # Parse the XML to find image relationships
        tree = ET.parse(slide1_path)
        root = tree.getroot()

        # Find all image references (blip elements with embed attribute)
        # Namespace handling for Office Open XML
        namespaces = {
            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
            'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
            'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'
        }

        # Find blip elements (images)
        blips = root.findall('.//a:blip', namespaces)

        if not blips:
            print(f"Warning: No images found in first slide of {pptx_name}")
            return None

        # Get the first image's relationship ID
        rel_id = blips[0].get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')

        if not rel_id:
            print(f"Warning: No relationship ID found for image in {pptx_name}")
            return None

        # Read slide1.xml.rels to map relationship ID to actual image file
        rels_path = os.path.join(temp_dir, 'ppt', 'slides', '_rels', 'slide1.xml.rels')

        if not os.path.exists(rels_path):
            print(f"Warning: slide1.xml.rels not found in {pptx_name}")
            return None

        rels_tree = ET.parse(rels_path)
        rels_root = rels_tree.getroot()

        # Find the relationship with matching ID
        rel_namespaces = {
            'r': 'http://schemas.openxmlformats.org/package/2006/relationships'
        }

        for rel in rels_root.findall('.//r:Relationship', rel_namespaces):
            if rel.get('Id') == rel_id:
                target = rel.get('Target')
                # Target is usually like "../media/image1.jpeg"
                image_filename = os.path.basename(target)
                image_path = os.path.join(temp_dir, 'ppt', 'media', image_filename)

                if os.path.exists(image_path):
                    # Get file extension
                    ext = os.path.splitext(image_filename)[1]
                    output_path = os.path.join(output_dir, f"{pptx_name}{ext}")

                    # Copy the image to output directory
                    shutil.copy2(image_path, output_path)
                    print(f"✓ Extracted: {pptx_name}{ext}")
                    return output_path
                else:
                    print(f"Warning: Image file not found at {image_path}")
                    return None

        print(f"Warning: Could not find image relationship in {pptx_name}")
        return None

    except Exception as e:
        print(f"Error processing {pptx_name}: {str(e)}")
        return None

    finally:
        # Clean up temp directory
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def main():
    slides_dir = "/mnt/d/repos/MOE-region-employees/slides"

    # Find all PPTX files
    pptx_files = [f for f in os.listdir(slides_dir) if f.endswith('.pptx')]

    print(f"Found {len(pptx_files)} PPTX files")
    print("-" * 60)

    success_count = 0
    failed_files = []

    for pptx_file in sorted(pptx_files):
        pptx_path = os.path.join(slides_dir, pptx_file)
        result = extract_profile_picture(pptx_path, slides_dir)

        if result:
            success_count += 1
        else:
            failed_files.append(pptx_file)

    print("-" * 60)
    print(f"\nExtraction complete:")
    print(f"  Success: {success_count}/{len(pptx_files)}")

    if failed_files:
        print(f"  Failed: {len(failed_files)}")
        for f in failed_files:
            print(f"    - {f}")

    return success_count == len(pptx_files)

if __name__ == "__main__":
    exit(0 if main() else 1)
