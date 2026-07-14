// Centralized data fetching and state management
window.EduViz = window.EduViz || {};

window.EduViz.DataLoader = (function() {
    const BASE_URL = 'data-generator/output';
    const SUBJECTS = ['mathematics', 'english', 'business-studies', 'science', 'history'];

    // In-memory cache
    let cache = {};

    async function fetchJSON(filename) {
        if (cache[filename]) return cache[filename];
        const res = await fetch(`${BASE_URL}/${filename}`);
        if (!res.ok) throw new Error(`Failed to load ${filename}`);
        const data = await res.json();
        cache[filename] = data;
        return data;
    }

    async function loadAllData() {
        const promises = SUBJECTS.map(sub => fetchJSON(`${sub}.json`));
        const results = await Promise.all(promises);

        // Combine into a single map for the landing page
        const studentMap = {};
        results.forEach((subjectData, index) => {
            const subjectName = SUBJECTS[index];
            subjectData.forEach(record => {
                if (!studentMap[record.student_id]) {
                    studentMap[record.student_id] = {
                        id: record.student_id,
                        name: record.name,
                        form_class: record.form_class,
                        gender: record.gender,
                        scores: {},
                        totalScore: 0,
                        subjectCount: 0
                    };
                }
                studentMap[record.student_id].scores[subjectName] = record;
                studentMap[record.student_id].totalScore += record.score;
                studentMap[record.student_id].subjectCount += 1;
            });
        });

        return Object.values(studentMap).map(s => ({
            ...s,
            average: Math.round(s.totalScore / s.subjectCount)
        }));
    }

    async function loadSubjectData(subjectKey) {
        return fetchJSON(`${subjectKey}.json`);
    }

    return { loadAllData, loadSubjectData, SUBJECTS };
})();
