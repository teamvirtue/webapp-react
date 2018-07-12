import { connect } from 'react-redux';
import AdviceCard from '../views/home/AdviceCard';
import { dismissCard } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        advices: state.advices,
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch: (temperature, temperatureDescription) => {
        dispatch(dismissCard(temperature, temperatureDescription));
    }
});

export const CardContainer = connect(
    mapStateToProps, //() => {}
    mapDispatchToProps,
)(AdviceCard);