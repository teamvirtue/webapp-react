import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import { Line } from 'react-chartjs-2';


let dataDay = [0, 0, 0, 0, 0, 0, 0];
let dataWeek = [0, 0, 0, 0, 0, 0, 0];
let dataMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let dataYears = [0, 0, 0, 0, 0];

const DAY = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2014', '2015', '2016', '2017', '2018'];

const energyGraph = {
	labels: DAY,
	datasets: [{
		label: 'Energy Usage',
		fill: true,
		backgroundColor: '#fce1d7',
		lineTension: 0.15, //0.1
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		borderWidth: 3,
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: dataDay,
		borderColor: '#f15b27',
	}]
};

const waterGraph = {
	labels: DAY,
	datasets: [{
		label: 'Water Usage',
		fill: true,
		backgroundColor: '#AFE4F5',
		data: dataDay,
		borderColor: '#0EA4D8', // TODO: get color from theme
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
        '&$checked': {
            color: '#0EA4D8',
        },
    },
    checked: {},
};




class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'day',
            type: props.type,
			data: energyGraph,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        let selectedLabel;
        const oldDataSet = this.state.datasets[0];
        let newData = [];

        switch(value) {
            case 'day':
                selectedLabel = DAY;
                newData.push(...dataDay);
                break;
            case 'week':
                selectedLabel = WEEK;
                newData.push(...dataWeek);
                break;
            case 'month':
                selectedLabel = MONTHS;
                newData.push(...dataMonths);
                break;
            case 'year':
                selectedLabel = YEARS;
                newData.push(...dataYears);
                break;
            default:
                selectedLabel = DAY;
                newData.push(...dataDay);
        }

        let newDataSet = { ...oldDataSet };

        newDataSet.data = newData;

        this.setState({
            labels: selectedLabel,
            datasets: [newDataSet]
        });
    };

    componentWillMount() {
        if (this.state.type === 'water') {
            this.setState({
				data: waterGraph
            });
        } else {
            this.setState({
				data: energyGraph
            });
        }
    };

    componentWillReceiveProps() {
		var datasetsCopy = this.state.data.datasets.slice(0);
		var dataCopy = datasetsCopy[0].data.slice(0);
		dataCopy = this.props.data;
		datasetsCopy[0].data = dataCopy;

		var newData = Object.assign( {}, this.state.data, { datasets: datasetsCopy } );
		this.setState({
			data: newData
		});
    };
	
	
	

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
                    <FormControlLabel className={ classes.radioButton } value='day' control={
                        <Radio color="primary" classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Day'/>
                    <FormControlLabel className={ classes.radioButton } value='week' control={
                        <Radio color="primary" classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Week'/>
                    <FormControlLabel className={ classes.radioButton } value='month' control={
                        <Radio color="primary" classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Month'/>
                    <FormControlLabel className={ classes.radioButton } value='year' control={
                        <Radio color="primary" classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Year'/>
                </RadioGroup>

                <Line
                    data={ this.state.data } // TODO: chart is cut off sometimes (https://github.com/chartjs/Chart.js/issues/2872), fixed it with setting the padding for now (mobile)
                    /*width={75}*/
                    /*height={ 175 }*/
                    options={{
                        tooltips: {
                            enabled: true,
                            // mode: 'nearest'
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 10
                            }
                        },
                        legend:{
                            display: false,
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
                                    fontColor: 'gray',
                                },
                            }],
                            yAxes: [{
                                // display: false,
                                gridLines: {
                                    display: true,
                                    color: 'white',
                                    drawBorder: false,
                                    lineWidth: 0,
                                    zeroLineColor: '#e3e3e3', //'#e3e3e3',
                                    zeroLineWidth: 2,
                                    //tickMarkLength: 0
                                },
                                ticks: {
                                    display: true,
									beginAtZero:true,
                                    /*suggestedMin: 0,    // minimum will be 0, unless there is a lower value
                                    fontFamily: "'Roboto'",
                                    fontColor: 'gray',*/
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
                        responsive: true,
                        responsiveAnimationDuration: 0, // animation duration after a resize
                        //maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                backgroundColor: function(context) {
                                    return context.dataset.borderColor;
                                },
                                borderRadius: 10, //4,
                                color: 'white',
                                font: {
                                    weight: 'bold'
                                },
                                formatter: Math.round
                            },
                        },
                    }}
                />
            </div>
        )
    }
}

export default withStyles(styles)(LineChart);