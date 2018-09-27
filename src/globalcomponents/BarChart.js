import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

// const Chart = require('chart.js');

let dataWeek = [81, 80, 79, 65, 59, 45, 40, 33,];
let dataMonths = [150, 145, 123, 135, 111, 107, 97, 90,];
let dataYears = [330, 340, 325, 321, 318, 311, 301, 290,];

let initialData = [81, 80, 79, 65, 59, 45, 40, 20, 15,]; // TODO: find way to insert initial array more efficient

const labels = ['Washer dryer', 'Dishwasher', 'Fridge', 'Lights', 'Oven', 'Car', 'Media system', 'Laptop'];
// const labels = ['Washer dryer', 'Dishwasher', 'Oven', 'Fridge', 'Music system', 'TV', 'Laptop', 'Lights', 'Clock', 'Car'];

const styles = {
    root: {
		width: '100%',
		textAlign: 'center',
    },
    radioGroup: {
        justifyContent: 'center',
        marginBottom: 50,
    },
    radioButton: {
        display: 'inline',
        margin: 0,
    },
    water: {
        color: '#0EA4D8',
    }
};

class BarChart extends Component{
    constructor(props){
        super(props);
        // Chart.defaults.global.defaultFontColor = 'red';
        this.state = {
            value: 'week',
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        const oldDataSet = this.state.datasets[0];
        let newData = [];

        switch (value) {
            case 'week':
                newData.push(...dataWeek);
                break;
            case 'month':
                newData.push(...dataMonths);
                break;
            case 'year':
                newData.push(...dataYears);
                break;
            default:
                newData.push(...dataWeek);
        }

        let newDataSet = { ...oldDataSet };

        newDataSet.data = newData;

        this.setState({
            datasets: [newDataSet]
        });
    };

    componentWillMount() {
        this.setState({
            labels: labels,
            datasets:[{
                label: 'Appliance Usage',
                data: initialData,
                backgroundColor: 'rgba(241, 93, 39, 0.5)',
                borderColor: '#f15b27',
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                }
            }]
        });
    };

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

    componentDidMount() { // TODO: replace with API call
        this.timer = setInterval(
            (value) => this.retrieve(this.state.value),
            30000
            //3000
        );
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    retrieve(value) {
        let oldDataSet = this.state.datasets[0];
        let newData = [];

        for(let x = 0; x < this.state.labels.length; x++){
            newData.push(Math.floor(Math.random() * 100));
        }

        let newDataSet = {
            ...oldDataSet
        };

        newDataSet.data = newData;

        this.setState({
            datasets: [newDataSet]
        });
    }

    render(){
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <RadioGroup
                    aria-label='time'
                    name='time'
                    className={ classes.radioGroup }
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    row
                >
                    <FormControlLabel className={ classes.radioButton } value='week' control={ <Radio color="primary" /> } label='Week'/>
                    <FormControlLabel className={ classes.radioButton } value='month' control={ <Radio color="primary" /> } label='Month'/>
                    <FormControlLabel className={ classes.radioButton } value='year' control={ <Radio color="primary" /> } label='Year'/>
                </RadioGroup>
                <HorizontalBar
                    data={ this.state }
                    options={{
                        tooltips: {
                            enabled: false
                        },
                        layout: {
                            padding: {
                                left: 30,
                                right: 35,
                                top: 0,
                                bottom: 0,
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
            </div>
        )
    }
}

export default withStyles(styles)(BarChart);