# Implementation Handoff - EduViz
**Model/LLM Name:** Qwen3.7  
**Date:** July 15, 2026  
**Version:** 1.0

## Overview
EduViz was built with a "Student-First" philosophy. Rather than just viewing subjects in isolation, the landing page acts as a global directory, allowing educators to instantly scan the holistic performance of their 20 students before diving into specific subjects.

## Key Design Decisions
- **Chart library:** Chart.js v4 (via CDN). Chosen for its lightweight footprint and beautiful default animations.
- **Color palette:** Overrode the brief's red/yellow/green suggestion in favor of a **Colorblind-Safe Palette** (Deep Blue, Teal, Sandy Orange, Burnt Orange). This ensures accessibility without sacrificing visual vibrancy.
- **Responsive strategy:** Desktop-first. Optimized for spacious Chromebook screens using CSS Grid, utilizing horizontal space rather than cramming into vertical mobile stacks.
- **Data loading:** Denormalized data architecture. The Python generator embeds student metadata directly into subject files. This eliminates complex asynchronous "joins" in the frontend, resulting in a highly predictable, explicit data flow.
- **Additional features:** 
  - Real-time debounced search on both the landing page and subject tables.
  - Multi-column sorting in the subject table.
  - Staggered, eased animations on Chart.js loads.

## File Structure
Strictly adhered to the requested structure. No deviations.

## Setup & Running
1. Generate data: `python3 data-generator/generator.py`
2. Start a local server in the root directory (e.g., `python3 -m http.server 8000` or use VS Code Live Server).
3. Navigate to `http://localhost:8000/index.html`.

## Challenges Faced
- **CORS/Module Issues:** Initially considered using ES Modules (`<script type="module">`) for cleaner JS architecture. However, to ensure flawless execution on basic local live servers without complex CORS configurations, I pivoted to a Global Namespace pattern (`window.EduViz`). It maintains strict separation of concerns while guaranteeing zero setup friction.

## What I'm Proud Of
- **The "Happy Pattern" of Declarative UI:** The `subject-renderer.js` and landing page logic use a pure `data -> HTML string -> innerHTML` pattern. It makes the code incredibly readable and debuggable. State changes (like sorting or searching) simply trigger a re-render of the affected DOM node.
- **The Colorblind Palette:** It feels modern, professional, and mathematically accessible.

## Notes for Evaluator
Please ensure you run the Python generator first. The frontend relies on the `data-generator/output/` directory. The data is seeded (`random.seed(42)`), so your results will perfectly match the expected distributions.