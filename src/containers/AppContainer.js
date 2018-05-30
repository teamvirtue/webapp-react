import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';

const mapDispatchToProps = dispatch => ({
    dispatch: (temperature, temperatureDescription) => {
        dispatch(updateWeatherData(temperature, temperatureDescription));
    }
});

export const AppContainer = connect(
    () => {},
    mapDispatchToProps,
)(App);