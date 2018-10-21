import { connect } from 'react-redux';
import Home from '../views/home/Home';
import { updateSustainabilityStatus } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
		sustainabilityStatus: state.sustainabilityStatus,
		temperature: state.temperature,
		houseData: state.houseData,
    }
};

const mapDispatchToProps = dispatch => ({
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    }
});

export const HomeContainer = connect(
    mapStateToProps,
	mapDispatchToProps,
)(Home);