import { connect } from 'react-redux';
import AdviceCard from '../globalcomponents/AdviceCard';
import { dismissCard } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        advices: state.advices,
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch: (id, visibility) => {
        dispatch(dismissCard(id, visibility));
    }
});

export const CardContainer = connect(
    mapStateToProps, //() => {}
    mapDispatchToProps,
)(AdviceCard);