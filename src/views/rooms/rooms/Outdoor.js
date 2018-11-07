import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class Outdoor extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Outdoor' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Outdoor', 'energyname': 'Car charger'}]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Outdoor' />
				</div>
			</List>
        );
    }
}

export default Outdoor;