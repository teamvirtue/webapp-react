import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
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
	
	componentDidMount() {
		this.intervalId = setInterval(() => this.loadPublicData(), 15 * 60 * 1000);// Call Public API's every 15 minutes
		this.loadPublicData();// also load one immediately
		this.props.getApiToken();
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
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
		weatherURL = '';//temporarily disable for dev
		fetch(weatherURL)
			.then(res => res.json())
			.then(
				(result) => {
					let currentTemperature = Math.ceil(result.main.temp);
					let weatherDescription = result.weather[0].description;
					weatherDescription = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
					
					this.props.updateWeatherData(currentTemperature, weatherDescription);
				},
				(error) => {
					console.log('Error fetching current temperature [OpenWeatherMap API]');
				}
			);
			
			
		/* 
		 * NEWS API
		 *
		 */
		fetch('https://newsapi.org/v2/sources?apiKey=60c273fa41dc479cb51405ca65e3f0f5')
			.then(res => res.json())
			.then(
				(result) => {
					let localNewsHeadlines = result.sources;
					// console.log(localNewsHeadlines);
					//this.props.updateLocalNewsHeadlines(localNewsHeadlines);
				},
				(error) => {
					console.log('Error fetching headline news [News API]');
				}
			)
	}


    render() {
        return (
            <div className='App'>
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
