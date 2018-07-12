import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { defaults } from 'react-chartjs-2';

// Local import
// import { MainNavigationContainer } from './containers/MainNavigationContainer';
import MainNavigation from './views/MainNavigation';
import './index.css';
import './assets/bootstrap-grid.min.css';

const theme = createMuiTheme({
    palette: {
		primary: {
			main: '#f15b27',
		},
		secondary: {
			main: '#f15b27',
            light: '#fff',
		},
		error: {
			main: '#e83a3a', //inverted (blue): 0EA4D8
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
		fontSize: 20,
	},
    overrides: {
        MuiBottomNavigationAction: {
            // Name of the styleSheet
            root: {
                // Name of the rule
                flex: '1',
                '&$selected': {
                    paddingTop: 8,
                },
            },
            /*label: {
                '&$selected': {
                    color: 'red',
                    fontSize: 12, //theme.typography.pxToRem(12)
                },
            },*/
        },
    },
});

//chart.js settings
defaults.global.elements.line.borderColor = theme.palette.primary.main;
defaults.global.elements.point.backgroundColor = theme.palette.primary.main;
defaults.global.elements.point.borderColor = theme.palette.primary.main;
defaults.global.elements.point.hitRadius = 15;


class App extends Component {
	
	componentDidMount() {
		this.intervalId = setInterval(() => this.loadData(), 15 * 60 * 1000);// Call API every 15 minutes
		this.loadData(); // also load one immediately
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	loadData() {
		/* 
		 * OPEN WEATHER MAP
		 *
		 * ID Eindhoven: 2756252
		 * ID Dubai: 292223
		 */
		
		// Current Weather
		fetch('https://api.openweathermap.org/data/2.5/weather?id=2756252&APPID=1473962c711c59e516b01eb4065ce872&units=metric')
			.then(res => res.json())
			.then(
				(result) => {
					let currentTemperature = Math.ceil(result.main.temp);
					let weatherDescription = result.weather[0].description;
					weatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
					
					this.props.dispatch(currentTemperature, weatherDescription);
				},
				(error) => {
					console.log('Error fetching current temperature [OpenWeatherMap API]');
				}
			)
	}


    render() {
        return (
            <div className='App'>
				<div className='container-fluid'>
					<div className='row'>
						<MuiThemeProvider theme={ theme }>
                            <MuiPickersUtilsProvider utils={ MomentUtils }>
							    <MainNavigation />
                            </MuiPickersUtilsProvider>
						</MuiThemeProvider>
					</div>
				</div>
            </div>
        );
    }
}

export default App;
