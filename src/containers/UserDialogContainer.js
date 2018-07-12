import { connect } from 'react-redux';
import UserDialog from '../views/settings/UserDialog';
import { updateAccountName } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        accounts: state.accounts,
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