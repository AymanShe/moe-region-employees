#!/usr/bin/env python3
"""
Add placeholder avatar fallback for employees without profile pictures
"""

import json

def main():
    with open('data/regions.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    placeholder_path = "images/placeholder-avatar.svg"
    updated_count = 0

    # Update all employees without images to use placeholder
    for region_id, region in data.get('regions', {}).items():
        for employee in region.get('employees', []):
            images = employee.get('images', [])
            # If employee has no images or empty images array, add placeholder
            if not images or len(images) == 0:
                employee['images'] = [placeholder_path]
                updated_count += 1
                print(f"  Added placeholder for: {employee['name']}")

    # Save updated file
    with open('data/regions.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Updated {updated_count} employees with placeholder avatar")
    return True

if __name__ == "__main__":
    main()
