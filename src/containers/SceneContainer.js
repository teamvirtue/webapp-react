import { connect } from 'react-redux';
import Scene from '../threejs/Scene';
import { updateSustainabilityStatus, reorderAdvice } from '../actions';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    },
    reorderAdvice: (advices) => {
        dispatch(reorderAdvice(advices));
    }
});

export const SceneContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Scene);