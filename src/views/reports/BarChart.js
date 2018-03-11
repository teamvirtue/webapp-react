import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

// import Icon from 'material-ui/Icon';

let data = [35, 45, 80, 81, 65, 59, 40, 81, 90, 13,];

const Chart = require('chart.js');

class BarChart extends Component{
    constructor(props){
        super(props);
        // Chart.defaults.global.defaultFontColor = 'red';
        this.state = {
            chartData:{
                // pointLabelFontFamily: "FontAwesome",
                labels: ['Washer dryer', 'Dishwasher', 'Oven', 'Fridge', 'Music system', 'TV', 'Laptop', 'Lights', 'Clock', 'Car'],
                datasets:[{
                    label: 'Appliance Usage',
                    data: data,
                    fillColor: 'rgba(220, 220, 220, 0.5)',
                    strokeColor: 'rgba(220, 220, 220, 0.8)',
                    highlightFill: 'rgba(220, 220, 220, 0.75)',
                    highlightStroke: 'rgba(220, 220, 220, 1)',
                }],
            }
        };
    }

    static defaultProps = {
        displayTitle: false,
        displayLegend: false,
    };

    render(){
        return (
            <HorizontalBar
                data={this.state.chartData}
                options={{
                    layout: {
                        padding: { // TODO: put this in SCSS
                            left: 50,
                            right: 45,
                            top: 0,
                            bottom: 25,
                        }
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition,
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                                offsetGridLines : true,
                                drawBorder: false,
                            },
                            ticks: {
                                fontFamily: 'Roboto',
                                // fontFamily: "FontAwesome",
                                fontColor: 'gray'
                            },
                        }],
                        yAxes: [{
                            // barThickness: 17,
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0)',
                                display: false,
                            },
                            display: false,
                            /*ticks: {
                                beginAtZero: false,
                            }*/
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0,
                        },
                    },
                    animation: {
                        duration: 500,
                        onComplete: function() {
                            const chartInstance = this.chart;
                            const ctx = chartInstance.ctx;
                            // const dataset = this.data.datasets[0];
                            const meta = chartInstance.controller.getDatasetMeta(0);

                            Chart.helpers.each(meta.data.forEach((bar, index) => {
                                const label = this.data.labels[index];
                                const labelPositionX = 55; // padding + 10
                                // const labelWidth = ctx.measureText(label).width + labelPositionX;

                                ctx.textBaseline = 'middle';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = 'black';
                                // ctx.fontFamily = 'Roboto';
                                ctx.fillText(label, labelPositionX, bar._model.y);
                            }));
                        }
                        /*onComplete: function () {
                            const chartInstance = this.chart,
                                  ctx = chartInstance.ctx,
                                  // dataset = this.data.datasets[0],
                                  meta = chartInstance.controller.getDatasetMeta(0);
                            ctx.textAlign = 'center';
                            ctx.fillStyle = 'black';
                            ctx.textBaseline = 'middle';

                            this.data.datasets.forEach(function (dataset, labels) { // dataset, index
                                meta.data.forEach(function(bar, index) {
                                    const data = dataset.data[index],
                                          label = labels[0];
                                    console.log(label);
                                    // ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                    ctx.fillText(data, 20, bar._model.y);
                                });
                            });
                        }*/
                    },
                    responsive: true,
                }}
            />
        )
    }
}

export default BarChart;