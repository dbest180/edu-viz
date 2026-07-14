# Data Specification
All data is generated statically and served as JSON/CSV.

### Subject JSON Schema (e.g., `mathematics.json`)
Data is denormalized to prevent frontend joining.
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
