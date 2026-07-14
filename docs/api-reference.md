# API Reference (Static File Endpoints)

Since this is a static frontend, the "API" consists of the generated JSON files.

## Endpoints

### `GET /data-generator/output/metadata.json`
Returns overall statistics for all subjects including:
- Total students and subjects count
- Per-subject statistics (average, highest, lowest scores, passing rate)
- Band distribution per subject

### `GET /data-generator/output/{subject}.json`
Returns denormalized scores for a specific subject.

**Valid subjects:** `mathematics`, `english`, `business-studies`, `science`, `history`

**Response Schema:**
```json
[
  {
    "student_id": 1,
    "name": "Student Name",
    "gender": "Male|Female",
    "form_class": "9A|9B|10A|10B|11A|11B",
    "score": 85,
    "band": "Distinction|Merit|Pass|Needs Support"
  }
]
```

## Query Parameters (Frontend Routing)

### `subject.html?subject={subject_key}`
Deep links to a specific subject's dashboard.

**Example:** `subject.html?subject=mathematics`

## JavaScript Modules

### `window.EduViz.DataLoader`
- `loadAllData()` - Loads and combines data from all subjects
- `loadSubjectData(subjectKey)` - Loads data for a specific subject
- `SUBJECTS` - Array of valid subject keys

### `window.EduViz.Charts`
- `renderBarChart(canvasId, data)` - Renders sorted bar chart
- `renderDoughnutChart(canvasId, distribution)` - Renders band distribution

### `window.EduViz.SubjectRenderer`
- `renderStats(data)` - Renders statistics dashboard
- `renderTable(data)` - Renders sortable student table
- `initTableInteractions()` - Initializes table sorting and filtering

### `window.EduViz.App`
- `initLandingPage()` - Initializes the student directory
- `initSubjectPage()` - Initializes the subject details page
