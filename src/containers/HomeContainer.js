import { connect } from 'react-redux';
import Home from '../views/home/Home';
import { updateSustainabilityStatus, updateEatTogether } from '../actions';

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
    },
    updateEatTogether: (status) => {
        dispatch(updateEatTogether(status));
    }
});

export const HomeContainer = connect(
    mapStateToProps,
	mapDispatchToProps,
)(Home);