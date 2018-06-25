import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';
import { updateLocalNewsHeadlines } from '../actions';

const mapDispatchToProps = dispatch => ({
    updateWeatherData: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    },
    updateLocalNewsHeadlines: (sources) => {
        dispatch(updateLocalNewsHeadlines(sources));
    }
});

export const AppContainer = connect(
    null,
    // () => {},
    mapDispatchToProps,
)(App);