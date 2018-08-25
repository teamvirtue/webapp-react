import { connect } from 'react-redux';
import MainNavigation from '../views/MainNavigation';

import { updateSustainabilityStatus } from '../actions';

const mapDispatchToProps = dispatch => ({
    updateSustainabilityStatus: (selected) => {
        dispatch(updateSustainabilityStatus(selected));
    }
});

export const MainNavigationContainer = connect(
	null,
	mapDispatchToProps,
)(MainNavigation);