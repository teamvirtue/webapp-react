import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

// const Chart = require('chart.js');

let dataRealtime = [];
let dataDay = [];
let dataWeek = [];
let dataMonth = [];
let dataYear = [];

var labels = [];

const energyGraph = {
	labels: labels,
	datasets:[{
		label: 'Energy Usage',
		data: [],
		backgroundColor: 'rgba(241, 93, 39, 0.5)',
		borderColor: '#f15b27',
		datalabels: {
			align: 'end',
			anchor: 'end'
		}
	}]
};


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
			data: energyGraph,
        };
    }

    /*handleChange = (event, value) => {
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
    };*/

    componentWillMount() {
		if(labels.length < 1){
			{ this.props.data.map(data => {
				labels.push(data[0]);
			})}
		}
    };
	
	componentWillReceiveProps() {
		//okay, so new data retrieved. Now update the array data correctly.
		var datasetsCopy = this.state.data.datasets.slice(0);
		
		var dataCopy = [];
		{ this.props.data.map(data => {
			dataCopy.push(data[1]);
		})}
		
		datasetsCopy[0].data = dataCopy;
		var finalData = Object.assign( {}, this.state.data, { datasets: datasetsCopy } );
		this.setState({
			data: finalData
		});
	};


    render(){
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                { /* <RadioGroup
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
                </RadioGroup> */ }
                <HorizontalBar
                    data={ this.state.data }
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