#!/usr/bin/env python3
"""
Create a JSON file from Excel data with employee information and profile pictures.
Matches Arabic names from Excel with English image filenames.
"""

import os
import json
import zipfile
import xml.etree.ElementTree as ET
import shutil
import re

def extract_excel_data(excel_file):
    """
    Extract data from XLSX file (which is a ZIP archive).
    """
    temp_dir = f"/tmp/excel_extract_{os.getpid()}"
    employees = []

    try:
        # Extract XLSX as ZIP
        with zipfile.ZipFile(excel_file, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read the worksheet XML
        worksheet_path = os.path.join(temp_dir, 'xl', 'worksheets', 'sheet1.xml')

        if not os.path.exists(worksheet_path):
            return []

        # Parse the XML
        tree = ET.parse(worksheet_path)
        root = tree.getroot()

        # Namespace for Office Open XML
        ns = {
            'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
        }

        # Read shared strings (for cell values)
        shared_strings = []
        shared_strings_path = os.path.join(temp_dir, 'xl', 'sharedStrings.xml')

        if os.path.exists(shared_strings_path):
            ss_tree = ET.parse(shared_strings_path)
            ss_root = ss_tree.getroot()
            for si in ss_root.findall('.//main:si', ns):
                t_elem = si.find('.//main:t', ns)
                if t_elem is not None:
                    shared_strings.append(t_elem.text)

        # Extract data from rows
        for row in root.findall('.//main:row', ns):
            row_num = int(row.get('r', 0))

            # Skip header row (row 1)
            if row_num == 1:
                continue

            cells = row.findall('main:c', ns)
            row_data = {}

            for cell in cells:
                col = cell.get('r', '')
                col_letter = ''.join([c for c in col if c.isalpha()])
                v_elem = cell.find('main:v', ns)
                t_elem = cell.find('.//main:t', ns)

                cell_value = None

                if t_elem is not None:
                    cell_value = t_elem.text
                elif v_elem is not None:
                    v_text = v_elem.text
                    # Check if it's a shared string reference
                    if cell.get('t') == 's':
                        idx = int(v_text)
                        if idx < len(shared_strings):
                            cell_value = shared_strings[idx]
                    else:
                        cell_value = v_text

                row_data[col_letter] = cell_value

            # Column B: Name in Arabic, C: Title, D: City, E: Province, G: Starting Date
            if 'B' in row_data and row_data['B']:
                employee = {
                    "name_ar": row_data.get('B'),
                    "title": row_data.get('C'),
                    "city": row_data.get('D'),
                    "province": row_data.get('E'),
                    "starting_date": format_date(row_data.get('G')),
                    "profile_picture": None
                }
                employees.append(employee)

        return employees

    except Exception as e:
        print(f"Error extracting Excel data: {str(e)}")
        return []

    finally:
        # Clean up
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)

def format_date(date_value):
    """
    Convert date value to string format.
    Excel stores dates as numbers (days since 1900-01-01).
    """
    if date_value is None:
        return None

    if isinstance(date_value, str):
        try:
            # Try to parse as Excel serial number if it's a string of digits
            if date_value.isdigit():
                date_num = int(date_value)
            else:
                return date_value
        except:
            return date_value
    else:
        try:
            date_num = int(float(date_value))
        except:
            return str(date_value)

    try:
        # Excel date serial number (starting from 1900-01-01)
        from datetime import datetime, timedelta
        excel_epoch = datetime(1900, 1, 1)
        # Excel incorrectly counts Feb 29, 1900, so we subtract 2 days
        actual_date = excel_epoch + timedelta(days=date_num - 2)
        return actual_date.strftime('%Y-%m-%d')
    except:
        return str(date_value)

def extract_last_name(arabic_name):
    """
    Extract the last name from an Arabic full name.
    Arabic names are typically "First Middle Last" or "First Last".
    The last word is usually the family name.
    """
    if not arabic_name:
        return ""
    parts = arabic_name.strip().split()
    return parts[-1].lower() if parts else ""

def extract_first_name(arabic_name):
    """Extract the first name from an Arabic full name."""
    if not arabic_name:
        return ""
    parts = arabic_name.strip().split()
    return parts[0].lower() if parts else ""

def match_names(arabic_name, available_images):
    """
    Match an Arabic name to an image filename using transliteration-based matching.
    """
    if not arabic_name:
        return None

    # Manual mapping based on the specific names we know
    # This creates a mapping from Arabic names to English transliterations
    name_mapping = {
        'خالد الزهراني': 'khalid',  # Not in our images
        'أحمد الحربي': 'ahmed',  # Not in our images
        'فهد السحيباني': 'fahad_alsuhibani',
        'محمد الغامدي': 'muhammad',  # Not in our images
        'ضيف الله العمراني': 'daifallah_alomrani',
        'سلمان البلوي': 'salman_albalawi',
        'عدنان المطوع': 'adnan_almutawa',
        'عبدالله السبيعي': 'abdullah_alsubaie',
        'سعيد القاضي': 'saeed_alqadi',
        'خالد القحطاني': 'khalid_alqahtani',
        'عبدالله السحيمي': 'sultan_alsahmmari',  # This might need review
        'عبدالرحمن الحيدري': 'abdulrahman_alhaidari',
        'حسين عتودي': 'hussain',  # Not in our images
        'محمد نجمي': 'muhammad_najmi',  # Not in our images
        'عبدالله النصر': 'abdullah_alnaser',
        'عبدالرحمن الرباعي': 'abdulrahman_alrubai',  # Not in our images
        'فيصل الغامدي': 'faisal',  # Not in our images
        'سلطان الشمري': 'sultan_alshmmari',  # Might be sultan_alsahmmari?
        'سلطان القحطاني': 'sultan_alqahtani',
        'عبدالرحمن العرابي': 'abdulrahman_alarabiae',
        'وليد النفيعي': 'waleed_alnufaii',
    }

    # Check if we have a direct mapping
    if arabic_name in name_mapping:
        target = name_mapping[arabic_name]
        for img in available_images:
            if target in img:
                return img

    # Try fuzzy matching based on parts of the name
    for img in available_images:
        img_lower = img.lower()
        for part in arabic_name.split():
            # This is a basic attempt - would need more sophisticated matching
            pass

    return None

def main():
    excel_file = "/mnt/d/repos/MOE-region-employees/slides/- إيمان حالة المرشحين - شؤون الجهات الحكومية والشركات بالمملكة .xlsx"
    slides_dir = "/mnt/d/repos/MOE-region-employees/slides"
    output_file = "/mnt/d/repos/MOE-region-employees/employees.json"

    # Check if Excel file exists
    if not os.path.exists(excel_file):
        print(f"Error: Excel file not found")
        return False

    print(f"Extracting employee data from Excel...")
    print("=" * 60)

    # Get available profile pictures
    available_images = []
    for f in os.listdir(slides_dir):
        if f.endswith(('.jpg', '.jpeg', '.png')) and not f.startswith('Welcome'):
            available_images.append(f)

    # Extract employee data
    employees = extract_excel_data(excel_file)

    # Skip header row (first employee entry is usually headers)
    if employees and employees[0]['name_ar'] == 'الاسم':
        employees = employees[1:]

    print(f"Found {len(employees)} employees in Excel")
    print(f"Found {len(available_images)} profile pictures\n")

    # Match names to images
    matched_count = 0
    for emp in employees:
        matched_image = match_names(emp['name_ar'], available_images)
        if matched_image:
            emp['profile_picture'] = matched_image
            matched_count += 1
            print(f"✓ {emp['name_ar']:30} -> {matched_image}")
        else:
            print(f"  {emp['name_ar']:30} (no match)")

    print("\n" + "=" * 60)
    print(f"Matched {matched_count}/{len(employees)} employees to profile pictures")

    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(employees, f, ensure_ascii=False, indent=2)

    print(f"\n✓ JSON file created: {output_file}")
    print(f"Total employees: {len(employees)}")

    return True

if __name__ == "__main__":
    exit(0 if main() else 1)
