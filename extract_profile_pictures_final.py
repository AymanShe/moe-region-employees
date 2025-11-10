#!/usr/bin/env python3
"""
Extract the 7th image (profile picture) from all PPTX files.
"""

import os
import zipfile
import shutil
from pathlib import Path

def extract_specific_image(pptx_path, image_index, output_dir):
    """
    Extract a specific image (by index) from a PPTX file.

    Args:
        pptx_path: Path to the PPTX file
        image_index: Index of the image to extract (1-based)
        output_dir: Directory to save the extracted image

    Returns:
        Path to the extracted image or None if failed
    """
    pptx_name = Path(pptx_path).stem
    temp_dir = f"/tmp/pptx_extract_specific_{os.getpid()}_{pptx_name.replace(' ', '_')}"

    try:
        # Extract PPTX (it's a ZIP file)
        with zipfile.ZipFile(pptx_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Find all images in ppt/media/ folder
        media_dir = os.path.join(temp_dir, 'ppt', 'media')

        if not os.path.exists(media_dir):
            print(f"✗ Warning: No media folder found in {pptx_name}")
            return None

        # Get all image files (common image extensions)
        image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif')
        image_files = [f for f in os.listdir(media_dir)
                      if f.lower().endswith(image_extensions)]

        if not image_files:
            print(f"✗ Warning: No images found in {pptx_name}")
            return None

        # Sort to ensure consistent ordering (same as the sample extraction)
        image_files.sort()

        # Check if the requested index exists
        if image_index > len(image_files):
            print(f"✗ Warning: Only {len(image_files)} images found in {pptx_name}, cannot extract image #{image_index}")
            return None

        # Get the requested image (convert 1-based index to 0-based)
        target_image = image_files[image_index - 1]
        ext = os.path.splitext(target_image)[1]

        # Extract person name from filename
        person_name = pptx_name.replace('Welcome onboard - ', '').replace('Welcome onboard -', '').strip()
        output_filename = f"{person_name}{ext}"
        output_path = os.path.join(output_dir, output_filename)

        # Copy the image
        source_path = os.path.join(media_dir, target_image)
        shutil.copy2(source_path, output_path)

        # Get file size for display
        size = os.path.getsize(output_path)
        size_str = f"{size/1024:.1f}KB" if size >= 1024 else f"{size}B"

        print(f"✓ Extracted: {output_filename} ({size_str})")
        return output_path

    except Exception as e:
        print(f"✗ Error processing {pptx_name}: {str(e)}")
        return None

    finally:
        # Clean up temp directory
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def main():
    slides_dir = "/mnt/d/repos/MOE-region-employees/slides"
    image_index = 7  # The 7th image is the profile picture

    # Find all PPTX files
    pptx_files = [f for f in os.listdir(slides_dir) if f.endswith('.pptx')]

    print(f"Extracting image #{image_index} (profile picture) from {len(pptx_files)} PPTX files")
    print("=" * 60)

    success_count = 0
    failed_files = []

    for pptx_file in sorted(pptx_files):
        pptx_path = os.path.join(slides_dir, pptx_file)
        result = extract_specific_image(pptx_path, image_index, slides_dir)

        if result:
            success_count += 1
        else:
            failed_files.append(pptx_file)

    print("=" * 60)
    print(f"\nExtraction complete:")
    print(f"  Success: {success_count}/{len(pptx_files)}")

    if failed_files:
        print(f"  Failed: {len(failed_files)}")
        for f in failed_files:
            print(f"    - {f}")
        return False

    return True

if __name__ == "__main__":
    exit(0 if main() else 1)
