window.EduViz = window.EduViz || {};

window.EduViz.SubjectRenderer = (function() {
    let currentData = [];
    let currentSort = { key: 'score', dir: 'desc' };

    function renderStats(data) {
        const total = data.length;
        const avg = (data.reduce((sum, s) => sum + s.score, 0) / total).toFixed(1);
        const highest = Math.max(...data.map(s => s.score));
        const passing = data.filter(s => s.score >= 40).length;
        const passRate = ((passing / total) * 100).toFixed(0);
        const topStudent = data.find(s => s.score === highest).name;

        const dashboard = document.getElementById('stats-dashboard');
        dashboard.innerHTML = `
            <div class="stat-card"><h4>Average Score</h4><div class="value">${avg}</div></div>
            <div class="stat-card"><h4>Highest Score</h4><div class="value">${highest}</div><div class="sub">${topStudent}</div></div>
            <div class="stat-card"><h4>Passing Rate</h4><div class="value">${passRate}%</div><div class="sub">${passing}/${total} students</div></div>
            <div class="stat-card"><h4>Total Students</h4><div class="value">${total}</div></div>
        `;
    }

    function renderTable(data) {
        currentData = data;
        updateTableDOM();
    }

    function updateTableDOM() {
        const searchTerm = document.getElementById('table-search').value.toLowerCase();
        
        let filtered = currentData.filter(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            s.form_class.toLowerCase().includes(searchTerm)
        );

        filtered.sort((a, b) => {
            let valA = a[currentSort.key];
            let valB = b[currentSort.key];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            
            if (valA < valB) return currentSort.dir === 'asc' ? -1 : 1;
            if (valA > valB) return currentSort.dir === 'asc' ? 1 : -1;
            return 0;
        });

        const tbody = document.getElementById('table-body');
        tbody.innerHTML = filtered.map(s => `
            <tr class="row-${s.band.toLowerCase().replace(' ', '-')}">
                <td>${s.name}</td>
                <td>${s.form_class}</td>
                <td><strong>${s.score}</strong></td>
                <td class="band-${s.band.toLowerCase().replace(' ', '-')}">${s.band}</td>
            </tr>
        `).join('');
    }

    function initTableInteractions() {
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => {
                const key = th.getAttribute('data-sort');
                if (currentSort.key === key) {
                    currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.key = key;
                    currentSort.dir = 'asc';
                }
                updateTableDOM();
            });
        });

        document.getElementById('table-search').addEventListener('input', updateTableDOM);
    }

    return { renderStats, renderTable, initTableInteractions };
})();