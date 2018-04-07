import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

let data = [1000, 181, -1200, 106, 105, 95, 56, 604, 150, 234, 76, 86,];

const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const initialState = {
    labels: MONTHS,
    datasets: [
        {
            label: 'Difference Graph',
            fill: false,
            lineTension: 0.1,
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
            data: data,
        }
    ]
};

/*const styles = theme => ({
    root: {
        backgroundColor: 'firebrick'
    },
});*/

/*class RadioButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'week',
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        // const { value } = this.state;

        return (
            <RadioGroup
                aria-label='time'
                name='time'
                className='RadioGroup'
                value={ this.state.value }
                onChange={ this.handleChange }
                row
            >
                <FormControlLabel style={{ display: 'inline', margin: 0 }} value='week' control={ <Radio /> } label='Week' />
                <FormControlLabel style={{ display: 'inline', margin: 0 }} value='month' control={ <Radio /> } label='Month' />
                <FormControlLabel style={{ display: 'inline', margin: 0 }} value='year' control={ <Radio /> } label='Year' />
            </RadioGroup>
        );
    }
}*/


class LineChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: initialState,
            value: 'week'
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });

        let oldDataSet = this.state.datasets[0]; //myBarChart.data.datasets[0].data[12] = 500;
        let newData = [];

        for (let x = 0; x < this.state.labels.length; x++) {
            newData.push(Math.floor(Math.random() * 1000));
        }

        let newDataSet = { ...oldDataSet };

        newDataSet.data = newData;

        let newState = {
            ...initialState,
            datasets: [newDataSet]
        };

        this.setState(newState);
    };

    displayName: 'LineChart';
    componentWillMount() {
        this.setState(initialState);
    };
    /*componentDidMount(){
        let _this = this;

        setInterval(function() {
            let oldDataSet = _this.state.datasets[0]; //myBarChart.data.datasets[0].data[12] = 500;
            let newData = [];

            for (let x = 0; x < _this.state.labels.length; x++) {
                newData.push(Math.floor(Math.random() * 1000));
            }

            let newDataSet = { ...oldDataSet };

            newDataSet.data = newData;

            let newState = {
                ...initialState,
                datasets: [newDataSet]
            };

            _this.setState(newState);
        }, 5000);
    };*/

    render(){
        // const { classes } = this.props;

        return (
            <div>  {/*className={ classes.root }*/}
                <RadioGroup
                    aria-label='time'
                    name='time'
                    className='RadioGroup'
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    row
                >
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='week' control={ <Radio /> } label='Week' />
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='month' control={ <Radio /> } label='Month' />
                    <FormControlLabel style={{ display: 'inline', margin: 0 }} value='year' control={ <Radio /> } label='Year' />
                </RadioGroup>

                <Line
                    data={ this.state } /*this.state.chartData, this.state.data*/
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

export default LineChart;