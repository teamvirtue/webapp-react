import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';
import { getApiToken, apiGetAtmoTemperature } from '../actions/asyncActions';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateWeatherData: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    },
	getApiToken: () => {
		dispatch(getApiToken());
	},
	apiGetAtmoTemperature: () => {
		dispatch(apiGetAtmoTemperature());
	},
});

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);