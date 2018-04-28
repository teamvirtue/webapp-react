import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

// const Chart = require('chart.js');

let data = [35, 45, 80, 81, 65, 59, 40, 81, 90, 13,];

class BarChart extends Component{
    constructor(props){
        super(props);
        // Chart.defaults.global.defaultFontColor = 'red';
        this.state = {
            chartData:{
                labels: ['Washer dryer', 'Dishwasher', 'Oven', 'Fridge', 'Music system', 'TV', 'Laptop', 'Lights', 'Clock', 'Car'],
                datasets:[{
                    label: 'Appliance Usage',
                    data: data,
                    backgroundColor: 'rgba(241, 93, 39, 0.5)',
                    borderColor: 'rgba(241, 93, 39, 1)',
                    /*fillColor: 'rgba(220, 220, 220, 0.5)',
                    strokeColor: 'rgba(220, 220, 220, 0.8)',
                    highlightFill: 'rgba(220, 220, 220, 0.75)',
                    highlightStroke: 'rgba(220, 220, 220, 1)',*/
                    datalabels: {
                        align: 'end',
                        anchor: 'end'
                    }
                }],
            }
        };
    }

    /*componentWillMount() {
        Chart.pluginService.register({
            afterDraw: (chart) => {
                const meta = chart.controller.getDatasetMeta(0);

                Chart.helpers.each(meta.data.forEach((bar, index) => {
                    const label = chart.data.labels[index];
                    const labelPositionX = 100;

                    chart.chart.ctx.textBaseline = 'middle';
                    chart.chart.ctx.textAlign = 'left';
                    chart.chart.ctx.fillStyle = 'black';
                    chart.chart.ctx.fillText(label, labelPositionX, bar._model.y);
                }));
            }
        });
    }*/

    render(){
        return (
            <HorizontalBar
                data={ this.state.chartData }
                /*plugins={{
                    datalabels: {
                        backgroundColor: 'red',
                        borderRadius: 4,
                        color: 'white',
                        font: {
                            weight: 'bold'
                        },
                        formatter: Math.round
                    }
                }}*/
                options={{
                    // showAllTooltips: true,
                    tooltips: {
                        enabled: false
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 35,
                            top: 15,
                            bottom: 15,
                            /*left: 50,
                            right: 45,
                            top: 0,
                            bottom: 25,*/
                        }
                    },
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            /*gridLines: {
                                display: false,
                                offsetGridLines : true,
                                drawBorder: false,
                            },
                            ticks: {
                                fontFamily: "'Roboto'",
                                fontColor: 'gray',
                            },*/
                        }],
                        yAxes: [{
                            // barThickness: 17,
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0)',
                                display: false,
                            },
                            ticks: {
                                //beginAtZero: false,
                                suggestedMin: 0,    // minimum will be 0, unless there is a lower value
                                fontFamily: "'Roboto'",
                                fontColor: 'gray',
                            },
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0,
                        },
                    },
                    /*animation: {
                        duration: 500,
                        onComplete: function() {
                            const chartInstance = this.chart;
                            const ctx = chartInstance.ctx;
                            const meta = chartInstance.controller.getDatasetMeta(0);

                            Chart.helpers.each(meta.data.forEach((bar, index) => {
                                const label = this.data.labels[index];
                                const labelPositionX = 55; // padding + 10

                                ctx.textBaseline = 'middle';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = 'black';
                                ctx.fillText(label, labelPositionX, bar._model.y);
                            }));
                        }
                    },*/
                    plugins: {
                        datalabels: {
                            backgroundColor: function(context) {
                                return context.dataset.borderColor;
                            },
                            borderRadius: 100,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: Math.round
                        },
                    },
                    responsive: true,
                }}
            />
        )
    }
}

export default BarChart;