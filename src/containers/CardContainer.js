import { connect } from 'react-redux';
import NotificationCard from '../globalcomponents/NotificationCard';
import { dismissCard } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        notifications: state.notifications,
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
)(NotificationCard);