import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import MainNavigation from './views/MainNavigation';
import './App.css';

const theme = createMuiTheme({
    palette: {
		primary: {
			main: "#5ff442",//#f15b27
		},
		secondary: {
			main: "#5ff442",
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
