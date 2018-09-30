import { connect } from 'react-redux';
import Scene from '../threejs/Scene';

const mapStateToProps = (state) => {
    return {
        sustainabilityStatus: state.sustainabilityStatus,
    }
};

export const SceneContainer = connect(
    mapStateToProps,
)(Scene);