import { connect } from 'react-redux';
import MainNavigation from '../views/MainNavigation';

import { updateSustainabilityStatus } from '../actions';

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        accounts: state.accounts,
    }
};

const mapDispatchToProps = dispatch => ({
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    }
});

export const MainNavigationContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(MainNavigation);