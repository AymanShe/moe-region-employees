#!/usr/bin/env python3
"""
Rename profile pictures to lowercase with underscores and no dashes.
"""

import os
import re
from pathlib import Path

def normalize_filename(filename):
    """
    Normalize filename: lowercase, underscores instead of spaces, no dashes.

    Args:
        filename: Original filename with extension

    Returns:
        Normalized filename
    """
    # Split filename and extension
    name, ext = os.path.splitext(filename)

    # Convert to lowercase
    name = name.lower()

    # Replace spaces with underscores
    name = name.replace(' ', '_')

    # Remove dashes
    name = name.replace('-', '')

    # Ensure extension is lowercase too
    ext = ext.lower()

    return f"{name}{ext}"

def main():
    slides_dir = "/mnt/d/repos/MOE-region-employees/slides"

    # Get all profile picture files (jpg, jpeg, png)
    # Exclude PPTX files and specific files we don't want to rename
    all_files = os.listdir(slides_dir)

    profile_pictures = []
    for f in all_files:
        # Only rename profile pictures (not PPTX files or the Arabic files)
        if (f.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')) and
            not f.startswith('Welcome onboard') and
            not f.startswith('صورة')):
            profile_pictures.append(f)

    if not profile_pictures:
        print("No profile pictures found to rename.")
        return False

    print(f"Renaming {len(profile_pictures)} profile pictures")
    print("=" * 60)

    renamed_count = 0

    for old_filename in sorted(profile_pictures):
        new_filename = normalize_filename(old_filename)

        if old_filename == new_filename:
            print(f"  ↔ {old_filename} (no change)")
            continue

        old_path = os.path.join(slides_dir, old_filename)
        new_path = os.path.join(slides_dir, new_filename)

        # Check if target already exists
        if os.path.exists(new_path):
            print(f"  ✗ Cannot rename {old_filename} -> {new_filename} (target exists)")
            continue

        try:
            os.rename(old_path, new_path)
            print(f"  ✓ {old_filename}")
            print(f"    -> {new_filename}")
            renamed_count += 1
        except Exception as e:
            print(f"  ✗ Error renaming {old_filename}: {str(e)}")

    print("=" * 60)
    print(f"\nRename complete: {renamed_count}/{len(profile_pictures)} files renamed")

    return True

if __name__ == "__main__":
    exit(0 if main() else 1)
