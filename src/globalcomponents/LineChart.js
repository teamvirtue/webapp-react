import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

var dataRealtime = [];
var dataDay = [];
var dataWeek = [];
var dataMonth = [];
var dataYear = [];

const LABELS_REALTIME = ['','','','','','','',''];
const LABELS_DAY = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const LABELS_WEEK = [	moment().subtract(6, 'days').format('dddd'),
						moment().subtract(5, 'days').format('dddd'),
						moment().subtract(4, 'days').format('dddd'),
						moment().subtract(3, 'days').format('dddd'),
						moment().subtract(2, 'days').format('dddd'),
						moment().subtract(1, 'days').format('dddd'),
						moment().format('dddd'),
					];
const LABELS_MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LABELS_YEARS = ['2014', '2015', '2016', '2017', '2018'];

const energyGraph = {
	labels: LABELS_DAY,
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
	labels: LABELS_DAY,
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
            timespan: 'day',
            type: props.type,
			data: energyGraph,
        };
    }

	//switch timespan
    handleChange = (event, value) => {
        this.setState({ timespan: value });
		let selectedLabel = LABELS_REALTIME;
		let selectedData = [];

        switch(value) {
            case 'realtime':
                selectedLabel = LABELS_REALTIME;
				selectedData = dataRealtime;
                break;
            case 'day':
                selectedLabel = LABELS_DAY;
				selectedData = dataDay;
                break;
            case 'week':
                selectedLabel = LABELS_WEEK;
				selectedData = dataWeek;
                break;
            case 'month':
                selectedLabel = LABELS_MONTHS;
				selectedData = dataMonth;
                break;
            case 'year':
                selectedLabel = LABELS_YEARS;
				selectedData = dataYear;
                break;
				
			default:
				selectedLabel = LABELS_REALTIME;
				break;
        }
		
		var datasetsCopy = this.state.data.datasets.slice(0);
		var dataCopy = datasetsCopy[0].data.slice(0);
		dataCopy = selectedData;
		datasetsCopy[0].data = dataCopy;

		var newData = Object.assign( {}, this.state.data, { labels: selectedLabel, datasets: datasetsCopy } );
		this.setState({
			data: newData
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
		this.updateData();
    };

    componentWillReceiveProps(newProps) {
		//if( newProps.data !== this.props.data ){//Only update after change of data (so not after update from other props)
			this.updateData();
		//}
    };
	
	updateData() {
		//okay, so new data retrieved. Now update the array data correctly.
		var newData = this.props.data;
		newData.reverse();//reverse array so old data becomes first.
		var now = moment();
		
		
		/*** CALCULATE NEW DATA ***/
		
		
		
		//REALTIME DATA
				dataRealtime = [];
				var minusPowerConsumed;
				var previousPowerConsumed = 0;
				/*newData.map( function(item, i) {
					if(moment(item.created).isSame(now, 'day')){
						if(!minusPowerConsumed){
							//start power_consumed is previous value
							minusPowerConsumed = newData[i - 1].power_consumed;
						}
						var powerConsumed = item.power_consumed - minusPowerConsumed - previousPowerConsumed;
						dataRealtime.push(powerConsumed);
						previousPowerConsumed = powerConsumed;
					}
				});*/
				dataRealtime = newData;
		
		
		
		//DAY DATA
				dataDay = [];
				var minusPowerConsumed;
				var previousPowerConsumed = 0;
				
				var latestCalculatedHour = 0;
				var powerConsumedHourBeginning = 0;
				var thisHourCalculated = 0;
				
				/*newData.map( function(item, i) {
					if(moment(item.created).isSame(moment(), 'day')){//okay, data is from today
						if(!minusPowerConsumed){
							//start power_consumed is last value from yesterday
							minusPowerConsumed = newData[i - 1].power_consumed;
						}
						
						//add data point when  A)an entire hour is looped through  B)it is the last data point
						if(latestCalculatedHour !== moment(item.created).hour() || (!newData[i + 1])){
							//okay, new hour can be calculated. Add data point.
							dataRealtime.push(thisHourCalculated);
							
							//reset variables
							latestCalculatedHour = moment(item.created).hour();
							powerConsumedHourBeginning = 0;
							thisHourCalculated = 0;
						}
						
						//update variables
						if(powerConsumedHourBeginning === 0){
							powerConsumedHourBeginning = item.power_consumed;
						}
						thisHourCalculated = thisHourCalculated + item.power_consumed;
					}
				});*/
				dataDay = newData;
		
		
		
		//WEEK DATA
				dataWeek = [];
				var minusPowerConsumed;
				var previousPowerConsumed = 0;
				
				var latestCalculatedDay = 0;
				var powerConsumedDayBeginning = 0;
				var thisDayCalculated = 0;
				
				/*newData.map( function(item, i) {
					if(moment(item.created).isSameOrAfter(moment().subtract(6, 'days'))){//okay, data is from last 7 days
						if(!minusPowerConsumed){
							//start power_consumed is last value from yesterday
							minusPowerConsumed = newData[i - 1].power_consumed;
						}
						
						//add data point when  A)an entire day is looped through  B)it is the last data point
						if(latestCalculatedDay !== moment(item.created).day() || (!newData[i + 1])){
							//okay, new day can be calculated. Add data point.
							dataRealtime.push(thisDayCalculated);
							
							//reset variables
							latestCalculatedDay = moment(item.created).day();
							powerConsumedDayBeginning = 0;
							thisDayCalculated = 0;
						}
						
						//update variables
						if(powerConsumedDayBeginning === 0){
							powerConsumedDayBeginning = item.power_consumed;
						}
						thisDayCalculated = thisDayCalculated + item.power_consumed;
					}
				});*/
				dataWeek = newData;
		
		
		
		//MONTH DATA
				dataMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
		
		//YEAR DATA
				dataYear = [0, 0, 0, 0, 0];
		
		
		
		/*** END CALCULATE NEW DATA ***/

		var datasetsCopy = this.state.data.datasets.slice(0);
		var dataCopy;
		
		if(this.state.timespan === 'realtime'){
			dataCopy = dataRealtime;
		}else if (this.state.timespan === 'day'){
			dataCopy = dataDay;
		}else if (this.state.timespan === 'week'){
			dataCopy = dataWeek;
		}else if (this.state.timespan === 'month'){
			dataCopy = dataMonth;
		}else if (this.state.timespan === 'year'){
			dataCopy = dataYear;
		}
		
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
                <RadioGroup
                    aria-label='time'
                    name='time'
                    className={ classes.radioGroup }
                    value={ this.state.timespan }
                    onChange={ this.handleChange }
                    row
                >
                    <FormControlLabel className={ classes.radioButton } value='realtime' control={
                        <Radio color="primary" classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Realtime'/>
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
                                    fontFamily: "inherit",
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
									fontFamily: "inherit",
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