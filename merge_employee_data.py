#!/usr/bin/env python3
"""
Merge employees.json data into regions.json structure
"""

import json
import os

# Mapping from Arabic province names to region IDs and English names
PROVINCE_MAPPING = {
    "منطقة مكة المكرمة": ("SA-02", "Makkah Region"),
    "المدينة المنورة": ("SA-03", "Al Madinah"),
    "منطقة المدينة المنورة": ("SA-03", "Al Madinah"),
    "المنطقة الشرقية": ("SA-04", "Eastern Province"),
    "منطقة القصيم": ("SA-05", "Al Qassim Region"),
    "منطقة حائل": ("SA-06", "Hail Region"),
    "منطقة تبوك": ("SA-07", "Tabuk Region"),
    "منطقة الحدود الشمالية": ("SA-08", "Northern Borders Region"),
    "منطقة جازان": ("SA-09", "Jazan Region"),
    "منطقة نجران": ("SA-10", "Najran Region"),
    "منطقة الباحة": ("SA-11", "Al Bahah Region"),
    "منطقة الجوف": ("SA-12", "Al Jouf Region"),
    "منطقة عسير": ("SA-14", "Asir Region"),
}

def transliterate_arabic_name(arabic_name):
    """
    Create a simple English transliteration mapping.
    This is based on the actual employees we extracted.
    """
    mapping = {
        "خالد الزهراني": "Khalid Al Zahrani",
        "أحمد الحربي": "Ahmad Al Harbi",
        "فهد السحيباني": "Fahad Al Suhibani",
        "محمد الغامدي": "Muhammad Al Ghamdi",
        "ضيف الله العمراني": "Dhaifallah Al Omrani",
        "سلمان البلوي": "Salman Al Balawi",
        "عدنان المطوع": "Adnan Al Mutawa",
        "عبدالله السبيعي": "Abdullah Al Subai",
        "سعيد القاضي": "Saeed Al Qadi",
        "خالد القحطاني": "Khalid Al Qahtani",
        "عبدالله السحيمي": "Abdullah Al Saihmi",
        "عبدالرحمن الحيدري": "Abdulrahman Al Haidari",
        "حسين عتودي": "Hussein Atoudi",
        "محمد نجمي": "Muhammad Najmi",
        "عبدالله النصر": "Abdullah Al Nasser",
        "عبدالرحمن الرباعي": "Abdulrahman Al Rubai",
        "فيصل الغامدي": "Faisal Al Ghamdi",
        "سلطان الشمري": "Sultan Al Shammari",
        "سلطان القحطاني": "Sultan Al Qahtani",
    }
    return mapping.get(arabic_name, arabic_name)

def translate_title(arabic_title):
    """Translate job titles from Arabic to English"""
    title_mapping = {
        "مستشار": "Consultant",
        "مهندس خبير": "Senior Engineer",
        "كبير مهندسين": "Chief Engineer",
        "مهندس محترف": "Professional Engineer",
        "منسق إقليمي": "Regional Coordinator",
        "ضابط علاقات عامة": "Public Relations Officer",
        "مهندس نظم": "Systems Engineer",
        "محلل أعمال": "Business Analyst",
        "مدير عمليات": "Operations Manager",
        "محللة مالية": "Financial Analyst",
        "مهندس شبكات": "Network Engineer",
        "مديرة موارد بشرية": "HR Manager",
        "محلل نظم": "Systems Analyst",
        "مديرة الموردين": "Vendor Manager",
        "محلل بيانات": "Data Analyst",
        "أمير النعيمي": "Amira Al Naimi",
        "مهندسة برمجيات": "Software Engineer",
        "مدير مشاريع": "Project Manager",
        "أخصائية تسويق": "Marketing Specialist",
        "مصممة جرافيك": "Graphic Designer",
        "مدير مبيعات": "Sales Manager",
        "ضمان الجودة": "Quality Assurance",
    }
    return title_mapping.get(arabic_title, arabic_title)

def main():
    employees_file = "employees.json"
    regions_file = "data/regions.json"

    # Read employees data
    with open(employees_file, 'r', encoding='utf-8') as f:
        employees = json.load(f)

    # Read regions data
    with open(regions_file, 'r', encoding='utf-8') as f:
        regions_data = json.load(f)

    # Group employees by province
    employees_by_region = {}
    for region_id in regions_data["regions"].keys():
        employees_by_region[region_id] = []

    unmatched_employees = []
    emp_id_counter = 1

    for emp in employees:
        province = emp.get("province", "")
        if province not in PROVINCE_MAPPING:
            unmatched_employees.append(emp)
            continue

        region_id, region_name = PROVINCE_MAPPING[province]

        # Transform employee data
        profile_picture = emp.get("profile_picture")
        images = []
        if profile_picture:
            # Add the profile picture to images
            images.append(f"slides/{profile_picture}")

        employee_obj = {
            "id": f"emp{emp_id_counter:03d}",
            "name": emp.get("name_ar", ""),
            "nameEn": transliterate_arabic_name(emp.get("name_ar", "")),
            "position": emp.get("title", ""),
            "positionEn": translate_title(emp.get("title", "")),
            "startDate": emp.get("starting_date") or "2025-01-01",
            "images": images,
            "cv": ""  # No CV data available
        }

        employees_by_region[region_id].append(employee_obj)
        emp_id_counter += 1

    # Update regions with real employee data
    for region_id, emps in employees_by_region.items():
        if region_id in regions_data["regions"]:
            regions_data["regions"][region_id]["employees"] = emps

    # Update metadata
    total_employees = sum(len(emps) for emps in employees_by_region.values())
    regions_data["metadata"]["totalEmployees"] = total_employees
    regions_data["metadata"]["totalRegions"] = len([r for r in regions_data["regions"].values() if r["employees"]])

    # Save updated regions.json
    with open(regions_file, 'w', encoding='utf-8') as f:
        json.dump(regions_data, f, ensure_ascii=False, indent=2)

    print(f"✓ Updated {regions_file}")
    print(f"  Total employees: {total_employees}")
    print(f"  Total regions with employees: {regions_data['metadata']['totalRegions']}")

    if unmatched_employees:
        print(f"\n⚠ {len(unmatched_employees)} employees could not be matched to regions:")
        for emp in unmatched_employees:
            print(f"  - {emp.get('name_ar')} (province: {emp.get('province')})")

    return True

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
