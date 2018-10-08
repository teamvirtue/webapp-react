import { connect } from 'react-redux';
import Scene from '../threejs/Scene';
import { updateSustainabilityStatus } from '../actions';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = dispatch => ({
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    }
});

export const SceneContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Scene);