import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';
import { updateLocalNewsHeadlines } from '../actions';
import { getApiToken } from '../actions/asyncActions';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateWeatherData: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    },
    updateLocalNewsHeadlines: (sources) => {
        dispatch(updateLocalNewsHeadlines(sources));
    },
	getApiToken: () => {
		dispatch(getApiToken());
	}
});

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);