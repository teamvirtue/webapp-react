import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Line } from 'react-chartjs-2';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

let dataWeek = [10, 18, -20, 16, 105, 56, 78];
let dataMonths = [100, 181, -200, 106, 105, 95, 56, 604, 150, 234, 11, 245];
let dataYears = [1000, 1810, -2000, 1060, 4000];

let data = [10, 18, -20, 16, 105, 56, 78]; // TODO: find way to insert initial array more efficient

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2014', '2015', '2016', '2017', '2018'];

const styles = theme => ({
    root: {
        //backgroundColor: 'firebrick'
    },
    radioGroup: {
        justifyContent: 'center',
        marginBottom: 50,
    }
});

class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 'week',
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        let selectedLabel;
        const oldDataSet = this.state.datasets[0];
        let newData = [];

        switch (value) {
            case 'week':
                selectedLabel = WEEK;
                newData.push(...dataWeek);
                /*for (let x = 0; x < selectedLabel.length; x++) {
                    newData.push(dataWeek[x]);
                }*/
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
                selectedLabel = WEEK;
                newData.push(...dataWeek);
        }

        /*for (let x = 0; x < selectedLabel.length; x++) {
            newData.push(Math.floor(Math.random() * 1000));
        }*/

        let newDataSet = { ...oldDataSet };

        newDataSet.data = newData;

        this.setState({
            labels: selectedLabel,
            datasets: [newDataSet]
        });
    };

    componentWillMount() {
        this.setState({
            labels: WEEK,
            datasets: [
                {
                    label: 'Difference Graph',
                    fill: false,
                   /* lineTension: 0.1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,*/
                    data: data,
                }
            ]
        });
        // this.setState(initialState);
    };
    componentDidMount(){
        this.timer = setInterval(
            (value) => this.retrieve(this.state.value),
            3000
        );

        /*let _this = this;

        this.timer = setInterval(function(){
            const datasetsCopy = _this.state.datasets.slice(0);
            let dataCopy = datasetsCopy[0].data.slice(0);
            let dataPoint = Math.floor(Math.random() * 100);

            /!* dataCopy[dataCopy.length] = dataPoint;
             //dataCopy[dataCopy.length] += 10;
             datasetsCopy[0].data = dataCopy;*!/

            if (dataCopy.length < 7) {
                dataCopy[dataCopy.length] = dataPoint;
            } else {
                dataCopy = [dataPoint];
            }

            datasetsCopy[0].data = dataCopy;

            let newState = {
                ...initialState,
                //labels: selectedLabel,
                datasets: datasetsCopy
            };

            _this.setState(newState);

            /!*_this.setState({
                data: Object.assign({}, this.state, {
                    datasets: datasetsCopy
                })
            });*!/
        }, 3000);*/
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    retrieve(value) {
        const datasetsCopy = this.state.datasets.slice(0);
        let dataCopy = datasetsCopy[0].data.slice(0);
        let dataPoint = Math.floor(Math.random() * 100);

        if (dataCopy.length < this.state.labels.length) {
            dataCopy[dataCopy.length] = dataPoint;
        } else {
            dataCopy = [dataPoint];
        }

        switch (value) { // TODO: remember previously drawn graph (& labels?)
            case 'week':
                console.log('week');
                break;
            case 'month':
                console.log('month');
                break;
            case 'year':
                console.log('year');
                break;
            default:
                console.log('default');
        }

        datasetsCopy[0].data = dataCopy;

        this.setState({
            //...initialState,
            datasets: datasetsCopy
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
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='week' control={ <Radio /> } label='Week' /> {/*TODO: remove inline style*/}
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='month' control={ <Radio /> } label='Month' />
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='year' control={ <Radio /> } label='Year' />
                </RadioGroup>

                <Line
                    data={ this.state } // TODO: chart is cut off sometimes (https://github.com/chartjs/Chart.js/issues/2872), fixed it with setting the padding for now (mobile)
                    /*width={75}*/
                    /*height={ 175 }*/
                    options={{
                        layout: {
                            padding: {
                                left: 15,
                                right: 35,
                                top: 15, //10
                                bottom: 15 //10
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
                                    //tickMarkLength: 0
                                },
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value
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
            </div>
        )
    }
}

export default (withStyles(styles)(LineChart));