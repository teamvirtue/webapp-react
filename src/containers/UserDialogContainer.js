import { connect } from 'react-redux';
import UserDialog from '../views/settings/UserDialog';
import { updateAccountName } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        settings: state.settings,
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch: (name, id) => {
        dispatch(updateAccountName(name, id));
    }
});

export const UserDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserDialog);