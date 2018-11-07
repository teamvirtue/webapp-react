import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class Bedroom extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Bedroom' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Bedroom', 'energyname': 'Sockets'}]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Bedroom' />
				</div>
			</List>
        );
    }
}

export default Bedroom;