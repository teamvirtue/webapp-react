import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { defaults } from 'react-chartjs-2';

// local import
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
    render() {
        return (
            <div className='App'>
				<div className='container-fluid'>
					<div className='row'>
						<MuiThemeProvider theme={ theme }>
							<MainNavigation />
						</MuiThemeProvider>
					</div>
				</div>
            </div>
        );
    }
}

export default App;
