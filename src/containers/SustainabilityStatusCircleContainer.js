import { connect } from 'react-redux';
import SustainabilityStatusCircle from '../globalcomponents/SustainabilityStatusCircle';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
		sustainabilityStatus: state.sustainabilityStatus,
    }
};

export const SustainabilityStatusCircleContainer = connect(
    mapStateToProps,
)(SustainabilityStatusCircle);