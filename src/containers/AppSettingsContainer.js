import { connect } from 'react-redux';
import AppSettings from '../views/settings/AppSettings';
// import { updateAccountName } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        accounts: state.accounts
    }
};

export const AppSettingsContainer = connect(
    mapStateToProps,
)(AppSettings);