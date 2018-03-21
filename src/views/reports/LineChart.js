import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

let data = [1000, 181, -1200, 106, 105, 95, 56, 604, 150, 234, 76, 86,];
// let dataGeneration = [1000, 200, 153, 400, 475, 1200, 142, 500, 150, 95, 215, 86,];

const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let chart = {
    labels: MONTHS,
    datasets:[{
        label:'Difference',
        data: data,
        fill: false,
        borderColor: ['rgb(241, 91, 39)'], // TODO; use global colour theme
        borderWidth: 3,
    }],
};

/*let chartGeneration = {
    labels: MONTHS,
    datasets:[{
        label: 'Generation',
        data: dataGeneration,
        fill: false,
        borderColor: ['rgb(241, 91, 39)'],
        borderWidth: 3,
    }],
};*/

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: chart,

            usage: false,
            generation: true,
        }
        // Chart.defaults.global.defaultFontColor = 'red';
        /*this.state = {
            data:{
                labels: MONTHS,
                datasets:[{
                    label:'Usage',
                    data: dataUsage,
                    backgroundColor:[
                        'rgba(241, 91, 39, 0.35)',
                        /!*'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)'*!/
                    ],
                    borderColor: ['rgb(241, 91, 39)'],
                    borderWidth: 3,
                    // radius: 0, // radius is 0 for only this dataset
                }, {
                    label:'Generation',
                    data: dataGeneration,
                    //fill: false,
                    backgroundColor:['rgba(241, 91, 39, 0.20)'],
                    borderColor: ['rgb(241, 91, 39)'], //LightGray
                    //borderColor: [ props.checked ? 'red' : 'blue'], //LightGray
                    borderWidth: 3,
                    // radius: 0, // radius is 0 for only this dataset
                }],
            }
        }*/
    }

    static defaultProps = {
        displayTitle: false,
        //displayLegend: false,
        // legendPosition:'right',
        location: 'City'
    };


    handleChangeBox = name => (event, checked) => {
        this.setState({ [name]: checked });
        console.log(name, checked);

        this.state.datasets.splice(0, 1);
    };

    render(){
        return ( /*TODO: fix chart tooltips*/
            <div> {/*classes.root*/}
                <Line
                    data={ this.state.chartData } /*this.state.data*/
                    /*width={75}
                    height={100}*/
                    options={{
                        layout: {
                            padding: {
                                left: 15,
                                right: 35,
                                top: 0,
                                bottom: 0
                            }
                        },
                        legend:{
                            display: false,
                            //position: this.props.legendPosition,
                        },
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    // color: 'rgba(0, 0, 0, 0)',
                                    display: false,
                                    drawBorder: false,
                                    lineWidth: 3,
                                    color: '#e3e3e3',
                                },
                                ticks: {
                                    minRotation: 90,
                                    fontFamily: "'Roboto'",
                                    fontColor: 'gray'
                                },
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: true,
                                    color: 'white',
                                    drawBorder: false,
                                    lineWidth: 0,
                                    zeroLineColor: '#e3e3e3',
                                    zeroLineWidth: 2,
                                },
                                ticks: {
                                    fontFamily: "'Roboto'",
                                    fontColor: 'gray',
                                },
                            }],
                        },
                        elements: {
                            point: {
                                radius: 1
                            },
                        },
                        animation: {
                            duration: 500,
                        },
                        tooltips: {
                            mode: 'nearest'
                        },
                        responsive: true,
                        responsiveAnimationDuration: 0, // animation duration after a resize
                        //maintainAspectRatio: false,
                    }}
                />

               {/* <FormGroup className='FormGroup' row>
                    <FormControlLabel
                        control= {
                            <Checkbox
                                checked={ this.state.usage }
                                onChange={ this.handleChangeBox('usage') }
                                value='usage'
                            />
                        }
                        label='Usage'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={ this.state.generation }
                                onChange={ this.handleChangeBox('generation') }
                                value='generation'
                            />
                        }
                        label='Generation'
                    />
                </FormGroup>*/}
            </div>
        )
    }
}

export default LineChart;