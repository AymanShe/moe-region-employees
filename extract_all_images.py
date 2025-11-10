#!/usr/bin/env python3
"""
Extract all images from a PPTX file with numbering.
"""

import os
import zipfile
import shutil
from pathlib import Path

def extract_all_images(pptx_path, output_dir):
    """
    Extract all images from a PPTX file and number them.

    Args:
        pptx_path: Path to the PPTX file
        output_dir: Directory to save the extracted images

    Returns:
        List of extracted image paths
    """
    pptx_name = Path(pptx_path).stem
    temp_dir = f"/tmp/pptx_extract_all_{os.getpid()}"
    extracted_images = []

    try:
        # Extract PPTX (it's a ZIP file)
        with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Find all images in ppt/media/ folder
        media_dir = os.path.join(temp_dir, 'ppt', 'media')

        if not os.path.exists(media_dir):
            print(f"Warning: No media folder found in {pptx_name}")
            return []

        # Get all image files (common image extensions)
        image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif')
        image_files = [f for f in os.listdir(media_dir)
                      if f.lower().endswith(image_extensions)]

        if not image_files:
            print(f"Warning: No images found in {pptx_name}")
            return []

        # Sort to ensure consistent ordering
        image_files.sort()

        print(f"Found {len(image_files)} images in {pptx_name}")
        print("-" * 60)

        # Extract and number each image
        for idx, image_file in enumerate(image_files, start=1):
            ext = os.path.splitext(image_file)[1]
            # Clean up the person name for filename
            person_name = pptx_name.replace('Welcome onboard - ', '').replace(' ', '-')
            output_filename = f"{person_name}-image-{idx}{ext}"
            output_path = os.path.join(output_dir, output_filename)

            source_path = os.path.join(media_dir, image_file)
            shutil.copy2(source_path, output_path)

            # Get file size for display
            size = os.path.getsize(output_path)
            size_str = f"{size/1024:.1f}KB" if size >= 1024 else f"{size}B"

            print(f"  {idx}. {output_filename} ({size_str})")
            extracted_images.append(output_path)

        print("-" * 60)
        print(f"Extracted {len(extracted_images)} images to {output_dir}")

        return extracted_images

    except Exception as e:
        print(f"Error processing {pptx_name}: {str(e)}")
        return []

    finally:
        # Clean up temp directory
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def main():
    pptx_file = "/mnt/d/repos/MOE-region-employees/slides/Welcome onboard - Abdullah Alnaser.pptx"
    output_dir = "/mnt/d/repos/MOE-region-employees/slides"

    if not os.path.exists(pptx_file):
        print(f"Error: File not found: {pptx_file}")
        return False

    print(f"Extracting all images from: {os.path.basename(pptx_file)}")
    print("=" * 60)

    images = extract_all_images(pptx_file, output_dir)

    if images:
        print(f"\n✓ Successfully extracted {len(images)} images")
        print("\nPlease review the images and identify which number is the profile picture.")
        return True
    else:
        print("\n✗ No images were extracted")
        return False

if __name__ == "__main__":
    exit(0 if main() else 1)
