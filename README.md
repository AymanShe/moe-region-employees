# Saudi Arabia Interactive Map - Employee Directory

An interactive map application showing MOE employees across different regions of Saudi Arabia.

## Features

- Interactive SVG map with region highlighting
- Employee directory by region
- Employee profile viewer with image carousel
- CV download functionality
- Responsive design with RTL (Arabic) support

## Project Structure

```
/
├── index.html              # Main HTML file (140 lines - reduced from 446!)
├── data/
│   └── regions.json        # Employee data (20KB)
├── js/
│   └── app.js              # Application logic (8KB)
├── css/                    # Styles (to be added)
├── images/                 # Employee photos
├── cvs/                    # Employee CVs
├── plan.md                 # Improvement plan with ~150 checkboxes
└── README.md               # This file

##  Recent Updates (2025-10-29)

### ✅ Phase 1: Data Externalization - COMPLETE!

- [x] Created organized directory structure
- [x] Extracted employee data to `data/regions.json`
- [x] Added English translations for bilingual support
- [x] Added unique employee IDs
- [x] Created `EmployeeMapApp` class
- [x] Implemented async data loading
- [x] Reduced index.html from 446 to 140 lines
- [x] Improved maintainability and performance

## How to Test

1. Open `index.html` in a modern web browser
2. The application will automatically load employee data from `data/regions.json`
3. Hover over regions to see tooltips
4. Click on regions to view employees
5. Click on employee names to view profiles

### Testing Checklist

- [ ] Data loads successfully (check browser console)
- [ ] Tooltip appears on hover
- [ ] Region modal opens on click
- [ ] Employee list displays correctly
- [ ] Employee modal shows images and CV link
- [ ] All regions work (13 total)
- [ ] Error handling works (test by renaming regions.json temporarily)

## Data Structure

Employee data is stored in JSON format:

```json
{
  "regions": {
    "SA-01": {
      "id": "SA-01",
      "name": "منطقة الرياض",
      "nameEn": "Riyadh Region",
      "employees": [...]
    }
  },
  "metadata": {
    "lastUpdated": "2025-10-29",
    "version": "1.0.0",
    "totalEmployees": 34,
    "totalRegions": 13
  }
}
```

## Technology Stack

- **HTML5** with RTL support
- **Bootstrap 5.2.3** for UI components
- **Vanilla JavaScript** (ES6+)
- **Inline SVG** for interactive map

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

See `plan.md` for comprehensive improvement roadmap including:

- **Phase 2**: Search & filter, accessibility, mobile optimization
- **Phase 3**: Export, bilingual support, analytics
- **Testing**: Comprehensive QA checklist
- **Deployment**: Production setup guide

## Contributing

To update employee data, edit `data/regions.json` and ensure proper JSON formatting.

## License

Internal use only - Ministry of Education

---

**Last Updated:** 2025-10-29
**Version:** 1.0.0
**Status:** Phase 1 Complete ✅
