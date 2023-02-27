{% if "drawHistogram" not in imports %}
{% add_js_import imports "drawHistogram" %}

import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js";

{% verbatim %}
function drawHistogram(chartData) {
    const ctx = document.getElementById(chartData.id).getContext('2d');
    if ("title_two" in chartData){
        return drawTwoDatasetHistogram(chartData);
    }
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: chartData.title,
                data: chartData.binned_counts,
                backgroundColor: 'rgba(89, 158, 227, 0.1)',
                borderColor: 'rgb(89, 158, 227)',
                fill: 'origin',
                borderWidth:chartData.border_width,
                opacity: 2,
                hidden: chartData.hidden
            }],
            labels: chartData.labels
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: chartData.x_label,
                        fontSize: 15
                    },
                    gridLines: {
                        offsetGridLines: true,
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        offsetGridLines: true,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return mixedChart;
}

function drawTwoDatasetHistogram(chartData) {
    const ctx = document.getElementById(chartData.id).getContext('2d');
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: chartData.title_one,
                data: chartData.binned_counts_one,
                backgroundColor: 'rgba(54, 124, 43, 0.5)',
                borderColor: 'rgb(54, 124, 43)',
                fill: 'origin',
                borderWidth:chartData.border_width,
                opacity: 2,
                hidden:chartData.hidden_one
            },
            {
                label: chartData.title_two,
                data: chartData.binned_counts_two,
                backgroundColor: 'rgba(89, 158, 227, 0.5)',
                borderColor: 'rgb(89, 158, 227)',
                fill: 'origin',
                borderWidth:chartData.border_width,
                opacity: 1,
                hidden: chartData.hidden_two
            }],
            labels: chartData.labels
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: chartData.x_label,
                        fontSize: 15
                    },
                    gridLines: {
                        offsetGridLines: true,
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        offsetGridLines: true,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    return mixedChart;
}


{% endverbatim %}

{% endif %}