import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class LivingRoom extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Living Room' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Living Room', 'energyname': 'Sockets'}]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Living Room' />
				</div>
				
				{ /* Music System, TV, Clock */ }
			</List>
        );
    }
}

export default LivingRoom;