import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { defaults } from 'react-chartjs-2';

import MainNavigation from './views/MainNavigation';
import './App.css';

const theme = createMuiTheme({
    palette: {
		primary: {
			main: "#f15b27",
		},
		secondary: {
			main: "#f15b27",
		},
		error: {
			main: "#e83a3a",
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
		fontSize: 14,
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
            <div className="App">
                <MuiThemeProvider theme={ theme }>
                    <MainNavigation />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
