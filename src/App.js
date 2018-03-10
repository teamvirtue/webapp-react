import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import deepOrange from 'material-ui/colors/deepOrange';

import MainNavigation from './views/MainNavigation';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        //secondary: light,
    },
    /*status: {
        danger: 'orange',
    },*/
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
