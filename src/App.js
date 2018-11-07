import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import materialIcons from 'material-design-icons/iconfont/material-icons.css';
import "typeface-open-sans";
import { defaults } from 'react-chartjs-2';

// Local import
import { MainNavigationContainer } from './containers/MainNavigationContainer';
import './assets/bootstrap-grid.min.css';
import './index.css';

const theme = createMuiTheme({
    palette: {
		primary: {
			main: '#f15b27',
		},
		secondary: {
			main: '#181818',
            light: '#ffffff',
		},
		error: {
			main: '#e83a3a', //inverted (blue): 0EA4D8
		},
	},
	typography: {
		fontFamily: 'Open Sans, Arial, Helvetica, sans-serif',
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
            label: {
                fontSize: 12,
                '&$selected': {
                    fontSize: 12, //theme.typography.pxToRem(12)
                },
            },
        },
		MuiTypography: {
			subheading: {
				//fontWeight: 500,
			},
		},
		MuiPaper: {
			elevation1: {
				boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 1px 0px rgba(0, 0, 0, 0.07), 0px 2px 1px -1px rgba(0, 0, 0, 0.06)',
			}
		},
		MuiCard: {
			root: {
				marginBottom: 30,
			},
		},
    },
});

//chart.js settings
defaults.global.elements.line.borderColor = theme.palette.primary.main;
defaults.global.elements.point.backgroundColor = theme.palette.primary.main;
defaults.global.elements.point.borderColor = theme.palette.primary.main;
defaults.global.elements.point.hitRadius = 15;


class App extends Component {
	
	async componentDidMount() {
		// Call Public API's every 5 minutes
		this.loadPublicData();
		this.intervalId = setInterval(() => this.loadPublicData(), 5 * 60 * 1000);

		// Get API token
		this.props.getApiToken();
		
		// Load API data interval every 5 minutes
		/* TODO: use promises to do this directly - and only do this - after successful retrieval of token (the call in asyncActions.js can then be removed too) */
		setInterval(() => this.loadApiData(), 5 * 60 * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	
	loadApiData() {
		this.props.apiGetAtmoTemperature();
	}

	loadPublicData() {
		/* 
		 * OPEN WEATHER MAP
		 *
		 * ID Eindhoven: 2756252
		 * ID Dubai: 292223
		 */
		
		// Current Weather
		let weatherURL = 'https://api.openweathermap.org/data/2.5/weather?id=292223&APPID=1473962c711c59e516b01eb4065ce872&units=metric';
		fetch(weatherURL)
			.then(res => res.json())
			.then(
				(result) => {
					let celcius = Math.ceil(result.main.temp);
					let description = result.weather[0].description;
					description = description.charAt(0).toUpperCase() + description.slice(1);
					let sunrise = result.sys.sunrise;
					let sunset = result.sys.sunset;
					
					this.props.updateWeatherData(celcius, description, sunrise, sunset);
				},
				(error) => {
					console.log('Error fetching current temperature [OpenWeatherMap API]');
				}
			);
		
		// Forecast Weather
		let weatherForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=292223&APPID=1473962c711c59e516b01eb4065ce872&units=metric';
		fetch(weatherForecastURL)
			.then(res => res.json())
			.then(
				(result) => {
					let forecast3hDatetime = result.list[0].dt;
					let forecast3hCelsius = Math.ceil(result.list[0].main.temp);
					let forecast3hDescription = result.list[0].weather[0].description;
					let forecast6hDatetime = result.list[1].dt;
					let forecast6hCelsius = Math.ceil(result.list[1].main.temp);
					let forecast6hDescription = result.list[1].weather[0].description;
					
					forecast3hDescription = forecast3hDescription.charAt(0).toUpperCase() + forecast3hDescription.slice(1);
					forecast6hDescription = forecast6hDescription.charAt(0).toUpperCase() + forecast6hDescription.slice(1);
					
					this.props.updateWeatherForecastData(forecast3hDatetime, forecast3hCelsius, forecast3hDescription, forecast6hDatetime, forecast6hCelsius, forecast6hDescription);
				},
				(error) => {
					console.log('Error fetching forecast temperature [OpenWeatherMap API]');
				}
			);
	}


    render() {
		const { sustainabilityStatus } = this.props;
		
        return (
            <div id='app' className={ (sustainabilityStatus.fullscreen ? 'fullscreen' : '') }>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-12'>
							<MuiThemeProvider theme={ theme }>
								<MuiPickersUtilsProvider utils={ MomentUtils }>
									<MainNavigationContainer />
								</MuiPickersUtilsProvider>
							</MuiThemeProvider>
						</div>
					</div>
				</div>
            </div>
        );
    }
}

export default App;
