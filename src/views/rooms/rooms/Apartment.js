import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';
//import WaterUsage from '../controlComponents/WaterUsage';
import ApplianceEnergy from '../controlComponents/ApplianceEnergy';

import { apiGetSocketData } from '../../../actions/asyncActions';

class Apartment extends Component {
	
    componentDidMount() {
        this.props.apiGetSocketData('All Rooms', 'all');
		this.props.apiGetSocketData('All Rooms', 'realtime');
    };

    render() {
        return (
            <List className='row'>
				{/* <div className='notificationWarning notificationMargin'>This is a mock-up. Appliance controls are disabled during tours.</div> */}
				<div className='col-6'>
					<Temperature />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'All Rooms', 'energyname': 'All Rooms'}]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='All Rooms' />
				</div>

				{/*<WaterUsage />*/}
				
				<div className='col-12'><ApplianceEnergy /></div>
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