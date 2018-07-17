import { connect } from 'react-redux';
import NotificationsDialog from '../views/NotificationsDialog';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        advices: state.advices,
    }
};

export const NotificationsDialogContainer = connect(
    mapStateToProps,
)(NotificationsDialog);