import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';
import { updateLocalNewsHeadlines } from '../actions';
import { apiConnect } from '../actions/asyncActions';

const mapDispatchToProps = dispatch => ({
    updateWeatherData: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    },
    updateLocalNewsHeadlines: (sources) => {
        dispatch(updateLocalNewsHeadlines(sources));
    },
	apiConnect: () => {
		dispatch(apiConnect());
	}
});

export const AppContainer = connect(
    null,
    // () => {},
    mapDispatchToProps,
)(App);