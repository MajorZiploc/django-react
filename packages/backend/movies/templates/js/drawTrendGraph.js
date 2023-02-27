{% if "drawTrendGraph" not in imports %}
{% add_js_import imports "drawTrendGraph" %}

import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js";

{% verbatim %}
function drawTrendGraph(trendData) {
    const ctx = document.getElementById(trendData.id).getContext('2d');
    var mixedChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: trendData.title_one,
                data: trendData.data_list_one,
                backgroundColor: 'rgba(54, 124, 43, 0.5)',
                borderColor: 'rgb(54, 124, 43)',
                fill: false,
                borderWidth:trendData.border_width,
                opacity: 2,
                hidden:trendData.hidden_one
            },
            {
                label: trendData.title_two,
                data: trendData.data_list_two,
                backgroundColor: 'rgba(89, 158, 227, 0.5)',
                borderColor: 'rgb(89, 158, 227)',
                fill: false,
                borderWidth:trendData.border_width,
                opacity: 1,
                hidden: trendData.hidden_two,
            }],
            labels: trendData.labels,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: trendData.title
            },
            elements: {
                point:{
                    radius: 0.2
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: trendData.x_label,
                        fontSize: 15
                    },
                    gridLines: {
                        offsetGridLines: true,
                        beginAtZero: true
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 45
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: trendData.y_label,
                        fontSize: 15
                    },
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