#!/usr/bin/env python3
"""
Fix image paths in regions.json to point to images/ folder
"""

import json

def main():
    with open('data/regions.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated_count = 0

    # Update all image paths
    for region_id, region in data.get('regions', {}).items():
        for employee in region.get('employees', []):
            images = employee.get('images', [])
            for i, image_path in enumerate(images):
                # Change slides/ to images/
                if image_path.startswith('slides/'):
                    new_path = image_path.replace('slides/', 'images/')
                    images[i] = new_path
                    updated_count += 1

    # Save updated file
    with open('data/regions.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✓ Updated {updated_count} image paths in regions.json")
    return True

if __name__ == "__main__":
    main()
