
#### `docs/api-reference.md`
```markdown
# API Reference (Static File Endpoints)
Since this is a static frontend, the "API" consists of the generated JSON files.

### Endpoints
- `GET /data-generator/output/metadata.json` - Student demographics.
- `GET /data-generator/output/{subject}.json` - Denormalized scores for a specific subject.
  - Valid subjects: `mathematics`, `english`, `business-studies`, `science`, `history`.

### Query Parameters (Frontend Routing)
- `subject.html?subject={subject_key}` - Deep links to a specific subject's dashboard.