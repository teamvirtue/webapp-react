import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';

let dataWeek = [10, 18, 20, 16, 105, 56,];
let dataMonths = [100, 181, 200, 106, 105, 95, 56, 604, 150, 234, 11,];
let dataYears = [1000, 1810, 2000, 1060,];

let initialData = [10, 18, 20, 16, 105, 56, 78]; // TODO: find way to insert initial array more efficient

const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = ['2014', '2015', '2016', '2017', '2018'];

const styles = {
    root: {
        //backgroundColor: 'firebrick'
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
            value: 'week',
            type: props.type,
            token: [],
            url: props.url,
        };
        // const { theme } = props;
    }

    getToken() {

      Axios.post("http://localhost:8000/api/auth/token/", "username=delta&password=deltadelta")
        .then((response) => {
          var data = response.data;
          this.setState({ token: data.token });
        });
    }
    update(value,url, instance){
      console.log("this is IN");
      const datasetsCopy = this.state.datasets.slice(0);

      instance.get(url, {
        timeout: 5000
      }).then((response) => {
        var dataArray = [];
        for (var i = 0; i < response.data.length; i++) {
          dataArray.push(response.data[i].avg_water_consumed);
        }
        switch (value) {
            case 'week':
                dataWeek = dataArray;
                console.log(dataWeek);
                break;
            case 'month':
                dataMonths = dataArray;
                console.log(dataMonths);
                break;
            case 'year':
                dataYears = dataArray;
                console.log(dataYears);

                break;
            default:
                 dataWeek = dataArray;
                console.log('default');
        }
        datasetsCopy[0].data = dataArray;
        this.setState({
            //...initialState,
            datasets: datasetsCopy
        });
      }).catch(this.getToken());
    }
    getDataArray() {
      return this.state.array;
    }
    getAxios() {
      return this.request_axios;
    }
    getRequest(value,url) {
      console.log(value);
      const instance = Axios.create({
        baseURL: 'http://localhost:8000',
        headers: { 'Authorization': 'JWT ' + this.state.token },
      });
      this.interval = setInterval(() => this.update(value,url,instance), 5000);
    }


    handleChange = (event, value) => {
        this.setState({ value });
        let selectedLabel;
        const oldDataSet = this.state.datasets[0];
        let newData = [];

        switch(value) {
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
                labels: WEEK,
                datasets: [
                    {
                        label: 'Water Graph',
                        fill: true,
                        data: initialData,
                        backgroundColor: '#AFE4F5',
                        borderColor: '#0EA4D8', // TODO: get color from theme
                    }
                ]
            });
            this.getToken();
        } else {
            this.setState({
                labels: WEEK,
                datasets: [
                    {
                        label: 'Difference Energy Graph',
                        fill: false,
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
                        data: initialData,
                        borderColor: '#f15b27',
                    }
                ]
            });
            this.getToken();
        }
        // this.setState(initialState);
    };

    componentDidMount() { // TODO: replace with API call
        this.timer = setTimeout(
            (value,url) => this.getRequest(this.state.value,this.state.url),
            5000
        );
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

        switch (value) {
            case 'week':
                dataWeek = dataCopy;
                break;
            case 'month':
                dataMonths = dataCopy;
                break;
            case 'year':
                dataYears = dataCopy;
                break;
            default:
                dataWeek = dataCopy;
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
                    <FormControlLabel className={ classes.radioButton } value='week' control={
                        <Radio classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Week'/>
                    <FormControlLabel className={ classes.radioButton } value='month' control={
                        <Radio classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Month'/>
                    <FormControlLabel className={ classes.radioButton } value='year' control={
                        <Radio classes={{
                            root: this.state.type === 'water' && classes.water,
                            checked: this.state.type === 'water' && classes.checked,
                        }}/>
                    } label='Year'/>
                </RadioGroup>

                <Line
                    data={ this.state } // TODO: chart is cut off sometimes (https://github.com/chartjs/Chart.js/issues/2872), fixed it with setting the padding for now (mobile)
                    /*width={75}*/
                    /*height={ 175 }*/
                    options={{
                        tooltips: {
                            enabled: false,
                            // mode: 'nearest'
                        },
                        layout: {
                            padding: {
                                left: 30,
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
                                    display: false,
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
                                borderRadius: 100, //4,
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
