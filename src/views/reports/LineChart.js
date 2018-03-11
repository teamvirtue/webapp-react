import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

let dataUsage =[ 617, 181, 153, 106, 105, 95, 56, 604, 150, 234, 76, 86,];
let dataGeneration =[ 250, 200, 153, 400, 475, 350, 142, 500, 150, 95, 215, 86,];

class LineChart extends Component{
    constructor(props){
        super(props);
        // Chart.defaults.global.defaultFontColor = 'red';
        this.state = {
            chartData:{
                labels: ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets:[{
                    label:'Usage',
                    data: dataUsage,
                    backgroundColor:[
                        'rgba(241, 91, 39, 0.35)',
                        /*'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)'*/
                    ],
                    borderColor: ['rgb(241, 91, 39)'],
                    borderWidth: 3,
                    // radius: 0, // radius is 0 for only this dataset
                }, {
                    label:'Generation',
                    data: dataGeneration,
                    fill: false,
                    borderColor: ['LightGray'],
                    borderWidth: 3,
                    // radius: 0, // radius is 0 for only this dataset
                }
                ],
            }
        }
    }

    static defaultProps = {
        displayTitle: false,
        displayLegend: false,
        // legendPosition:'right',
        location: 'City'
    };

    render(){
        return (
            <Line
                data={this.state.chartData}
                /*width={75}
                height={100}*/
                options={{
                    /*title:{
                        display: this.props.displayTitle,
                        text: 'Largest Cities In ' + this.props.location,
                        fontSize: 25,
                    },*/
                    layout: {
                        padding: {
                            left: 15,
                            right: 35,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend:{
                        display: this.props.displayLegend,
                        position: this.props.legendPosition,
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                // color: 'rgba(0, 0, 0, 0)',
                                display: false,
                                drawBorder: true,
                                lineWidth: 3,
                                color: 'rgb(75,75,75)',
                            },
                            ticks: {
                                minRotation: 90,
                                fontFamily: "'Roboto'",
                                fontColor: 'gray'
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0)',
                                display: false,
                            },
                            ticks: {
                                fontFamily: "'Roboto'",
                                fontColor: 'gray',
                            },
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0
                        },
                    },
                    animation: {
                        duration: 500,
                    },
                   /* tooltips: {
                        mode: 'nearest'
                    },*/
                    responsive: true,
                    //maintainAspectRatio: false,
                }}
            />
        )
    }
}

export default LineChart;