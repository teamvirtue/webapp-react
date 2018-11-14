import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData, updateWeatherForecastData } from '../actions';
import { getApiToken, apiGetAtmoTemperature, apiGetSocketData } from '../actions/asyncActions';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateWeatherData: (celcius, description, sunrise, sunset) => {
        dispatch(updateWeatherData(celcius, description, sunrise, sunset));
    },
    updateWeatherForecastData: (forecast3hDatetime, forecast3hCelsius, forecast3hDescription, forecast6hDatetime, forecast6hCelsius, forecast6hDescription) => {
        dispatch(updateWeatherForecastData(forecast3hDatetime, forecast3hCelsius, forecast3hDescription, forecast6hDatetime, forecast6hCelsius, forecast6hDescription));
    },
	getApiToken: () => {
		dispatch(getApiToken());
	},
	apiGetAtmoTemperature: () => {
		dispatch(apiGetAtmoTemperature());
	},
	apiGetSocketData: (room, socket, time) => {
		dispatch(apiGetSocketData(room, socket, time));
	},
});

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);