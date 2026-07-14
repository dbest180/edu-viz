window.EduViz = window.EduViz || {};

window.EduViz.Charts = (function() {
    // Colorblind-safe palette mapping
    const BAND_COLORS = {
        'Distinction': '#1D3557',
        'Merit': '#2A9D8F',
        'Pass': '#E9C46A',
        'Needs Support': '#E76F51'
    };

    function getBarColor(score) {
        if (score >= 80) return BAND_COLORS['Distinction'];
        if (score >= 60) return BAND_COLORS['Merit'];
        if (score >= 40) return BAND_COLORS['Pass'];
        return BAND_COLORS['Needs Support'];
    }

    function renderBarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        
        // Sort data by score descending
        const sorted = [...data].sort((a, b) => b.score - a.score);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sorted.map(d => d.name),
                datasets: [{
                    label: 'Score',
                    data: sorted.map(d => d.score),
                    backgroundColor: sorted.map(d => getBarColor(d.score)),
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `Score: ${ctx.raw} (${sorted[ctx.dataIndex].band})`
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: '#EDF2F4' } },
                    x: { grid: { display: false } }
                },
                animation: { duration: 1000, easing: 'easeOutQuart' }
            }
        });
    }

    function renderDoughnutChart(canvasId, distribution) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const labels = Object.keys(distribution);
        const values = Object.values(distribution);
        const colors = labels.map(l => BAND_COLORS[l]);

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
                },
                animation: { animateRotate: true, duration: 1200 }
            }
        });
    }

    return { renderBarChart, renderDoughnutChart };
})();