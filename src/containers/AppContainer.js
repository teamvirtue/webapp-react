import { connect } from 'react-redux';
import App from '../App';
import { updateWeatherData } from '../actions';

const mapDispatchToProps = dispatch => ({
    dispatch: (temperature) => {
        dispatch(updateWeatherData(temperature));
    }
});

export const AppContainer = connect(
    () => {},
    mapDispatchToProps,
)(App);