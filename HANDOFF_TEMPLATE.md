# EduViz - Project Handoff

## Project Overview
EduViz is a multi-page dashboard displaying exam results for 20 students across 5 subjects. The landing page serves as a global student directory, while each subject has its own dedicated page with rich visualizations.

## Key Features
- **Landing Page**: Searchable student directory with performance cards and subject badges
- **Subject Pages**: Dynamic pages with statistics, charts, and sortable tables
- **Colorblind-Safe Design**: Accessible color palette throughout
- **Responsive Layout**: Desktop-optimized with responsive considerations

## File Structure
```
/workspace/
├── index.html              # Landing page (student directory)
├── subject.html            # Subject details page (dynamic via query param)
├── css/
│   ├── style.css           # Global styles and CSS variables
│   ├── landing.css         # Landing page specific styles
│   └── subject.css         # Subject page specific styles
├── js/
│   ├── app.js              # Main application logic and routing
│   ├── data-loader.js      # Data fetching and caching
│   ├── charts.js           # Chart.js wrappers for visualizations
│   └── subject-renderer.js # Stats and table rendering
├── data-generator/
│   ├── generator.py        # Python script to generate test data
│   └── output/             # Generated JSON/CSV files
└── docs/
    ├── api-reference.md    # API documentation
    └── data-spec.md        # Data schema documentation
```

## Running the Application

### Option 1: Static Server (Recommended)
```bash
cd /workspace
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### Option 2: Regenerate Data
```bash
cd /workspace
python data-generator/generator.py
```

## Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js (loaded via CDN)
- **Data Generation**: Python 3 (standard library only)
- **No Backend Required**: Purely static files

## Known Issues & Future Improvements
1. **Mobile Responsiveness**: Currently desktop-optimized; could benefit from mobile-first approach
2. **Data Persistence**: All data is static; no backend integration
3. **Accessibility**: Could add ARIA labels and keyboard navigation improvements
4. **Error Handling**: Basic error handling implemented; could be more robust

## Testing Checklist
- [ ] Landing page loads with all student cards
- [ ] Student search filters correctly
- [ ] Subject badges link to correct subject pages
- [ ] Subject page displays correct statistics
- [ ] Bar chart renders with correct colors
- [ ] Doughnut chart shows band distribution
- [ ] Table sorting works for all columns
- [ ] Table filtering works
- [ ] Back button returns to landing page
