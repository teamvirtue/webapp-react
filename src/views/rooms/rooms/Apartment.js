import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NetEnergy from '../controlComponents/NetEnergy';
import WaterUsage from '../controlComponents/WaterUsage';
import ApplianceEnergy from '../controlComponents/ApplianceEnergy';

import { apiGetSocketData } from '../../../actions/asyncActions';

class Apartment extends Component {
	
    componentDidMount() {
        this.props.apiGetSocketData('All Rooms', 'all');
    };

    render() {
        return (
            <List>
				<div className='notificationWarning notificationMargin'>This is a mock-up. Appliance controls are disabled during tours.</div>
				<Temperature />

				<NetEnergy forRoom='All Rooms' />

				<WaterUsage />
				
				<ApplianceEnergy />
            </List>
        );
    }
}

const mapDispatchToProps = dispatch => ({
	apiGetSocketData: (room, time) => {
		dispatch(apiGetSocketData(room, time));
	}
});

export default connect(null, mapDispatchToProps)(Apartment);