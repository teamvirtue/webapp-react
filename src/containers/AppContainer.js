import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';
import { updateLocalNewsHeadlines } from '../actions';

const mapDispatchToProps = dispatch => {
    dispatch: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    }
    dispatch: (articles) => {
        dispatch(updateLocalNewsHeadlines(articles));
    }
};

export const AppContainer = connect(
    null,
    // () => {},
    mapDispatchToProps,
)(App);