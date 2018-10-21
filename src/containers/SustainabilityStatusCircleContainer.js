import { connect } from 'react-redux';
import SustainabilityStatusCircle from '../globalcomponents/SustainabilityStatusCircle';
import { updateFullscreenStatus, updateSustainabilityStatus } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
		sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateFullscreenStatus: (fullscreen) => {
        dispatch(updateFullscreenStatus(fullscreen));
    },
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    }
});

export const SustainabilityStatusCircleContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SustainabilityStatusCircle);