import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio  from '@material-ui/core/Radio';
import RadioGroup  from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import Axios from 'axios';

// const Chart = require('chart.js');

let dataWeek = [81, 80, 79, 65, 59, 45, 40, 33,];
let dataMonths = [150, 145, 123, 135, 111, 107, 97, 90,];
let dataYears = [330, 340, 325, 321, 318, 311, 301, 290,];

let initialData = [81, 80, 79, 65, 59, 45, 40, 20, 15,]; // TODO: find way to insert initial array more efficient

const labels = ['Washer dryer', 'Dishwasher', 'Fridge', 'Lights', 'Oven', 'Car', 'Media system', 'Laptop'];
// const labels = ['Washer dryer', 'Dishwasher', 'Oven', 'Fridge', 'Music system', 'TV', 'Laptop', 'Lights', 'Clock', 'Car'];

const styles = {
    root: {
        // backgroundColor: 'firebrick'
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
            token: [],
            url: props.url,
        };
    }

    getToken() {

      Axios.post("http://localhost:8000/api/auth/token/", "username=delta&password=deltadelta")
        .then((response) => {
          var data = response.data;
          this.setState({ token: data.token });
        });
    }
    update(value,url, instance){
      const datasetsCopy = this.state.datasets.slice(0);
      instance.get(url, {
        timeout: 5000
      }).then((response) => {
        var dataArray = [];
        for (var i = 0; i < response.data.length; i++) {
          dataArray.push(response.data[i].maximum_kwh);
          dataArray.push(response.data[i].minimum_kwh);
          dataArray.push(response.data[i].last_brightness);
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
        this.getToken();
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
        this.timer = setTimeout(
            (value,url) => this.getRequest(this.state.value,this.state.url),
            5000
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
                    <FormControlLabel className={ classes.radioButton } value='week' control={ <Radio/> } label='Week'/>
                    <FormControlLabel className={ classes.radioButton } value='month' control={<Radio/> } label='Month'/>
                    <FormControlLabel className={ classes.radioButton } value='year' control={ <Radio/> } label='Year'/>
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
