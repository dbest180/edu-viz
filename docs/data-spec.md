# Data Specification

All data is generated statically and served as JSON/CSV files.

## Subject JSON Schema (e.g., `mathematics.json`)

Data is denormalized to prevent frontend joining. Each record contains full student metadata.

```json
[
  {
    "student_id": 1,
    "name": "Leo Smith",
    "gender": "Male",
    "form_class": "9A",
    "score": 85,
    "band": "Distinction"
  }
]
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `student_id` | Integer | Unique identifier for the student |
| `name` | String | Full name of the student |
| `gender` | String | `Male` or `Female` |
| `form_class` | String | Class assignment (9A, 9B, 10A, 10B, 11A, 11B) |
| `score` | Integer | Score from 0-100 |
| `band` | String | Performance band based on score |

### Performance Bands

| Band | Score Range |
|------|-------------|
| Distinction | 80-100 |
| Merit | 60-79 |
| Pass | 40-59 |
| Needs Support | 0-39 |

## Metadata JSON Schema (`metadata.json`)

```json
{
  "total_students": 20,
  "total_subjects": 5,
  "subjects": {
    "mathematics": {
      "average_score": 67.2,
      "highest_score": 95,
      "lowest_score": 43,
      "passing_rate": 100.0,
      "band_distribution": {
        "Distinction": 5,
        "Merit": 8,
        "Pass": 7,
        "Needs Support": 0
      }
    }
  }
}
```

## CSV Format

CSV files mirror the JSON structure with headers:
```csv
student_id,name,gender,form_class,score,band
1,Leo Smith,Male,9A,85,Distinction
```
