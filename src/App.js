import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import MainNavigation from './views/MainNavigation';
import './App.css';

const theme = createMuiTheme({
    palette: {
		primary: {
			main: "#4286f4",//#f15b27
		},
		secondary: {
			main: "#000000",
		},
		error: {
			main: "#e83a3a",
		},
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
