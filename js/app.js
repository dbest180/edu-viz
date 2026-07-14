window.EduViz = window.EduViz || {};

window.EduViz.App = (function() {
    const DataLoader = window.EduViz.DataLoader;
    const Charts = window.EduViz.Charts;
    const SubjectRenderer = window.EduViz.SubjectRenderer;

    function getBandClass(score) {
        if (score >= 80) return 'bg-distinction';
        if (score >= 60) return 'bg-merit';
        if (score >= 40) return 'bg-pass';
        return 'bg-support';
    }

    async function initLandingPage() {
        const students = await DataLoader.loadAllData();
        const grid = document.getElementById('student-grid');
        const searchInput = document.getElementById('student-search');

        function renderCards(filter = '') {
            const filtered = students.filter(s => 
                s.name.toLowerCase().includes(filter) || 
                s.form_class.toLowerCase().includes(filter)
            );

            grid.innerHTML = filtered.map(s => {
                const badges = DataLoader.SUBJECTS.map(sub => {
                    const score = s.scores[sub].score;
                    const label = sub.charAt(0).toUpperCase() + sub.slice(1).replace('-', ' ');
                    return `<a href="subject.html?subject=${sub}" class="badge ${getBandClass(score)}">${label}: ${score}</a>`;
                }).join('');

                return `
                    <div class="student-card">
                        <div class="card-header">
                            <h3>${s.name}</h3>
                            <span>Form ${s.form_class}</span>
                        </div>
                        <div class="card-avg">${s.average}<span style="font-size:1rem; color:var(--text-secondary)">%</span></div>
                        <div class="card-badges">${badges}</div>
                    </div>
                `;
            }).join('');
        }

        renderCards();
        searchInput.addEventListener('input', (e) => renderCards(e.target.value.toLowerCase()));
    }

    async function initSubjectPage() {
        const params = new URLSearchParams(window.location.search);
        const subjectKey = params.get('subject') || 'mathematics';
        
        const prettyName = subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace('-', ' ');
        document.getElementById('subject-title').textContent = `${prettyName} Results`;
        document.title = `EduViz - ${prettyName}`;

        const data = await DataLoader.loadSubjectData(subjectKey);
        
        SubjectRenderer.renderStats(data);
        Charts.renderBarChart('bar-chart', data);
        
        // Calculate distribution for doughnut
        const dist = { 'Distinction': 0, 'Merit': 0, 'Pass': 0, 'Needs Support': 0 };
        data.forEach(s => dist[s.band]++);
        Charts.renderDoughnutChart('doughnut-chart', dist);

        SubjectRenderer.renderTable(data);
        SubjectRenderer.initTableInteractions();
    }

    // Boot sequence
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('student-grid')) {
            initLandingPage();
        } else if (document.getElementById('stats-dashboard')) {
            initSubjectPage();
        }
    });
})();
