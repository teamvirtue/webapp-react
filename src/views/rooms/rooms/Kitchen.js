import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';
import AirQuality from '../controlComponents/AirQuality';

class Kitchen extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Kitchen' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Kitchen'}]} forSocket={[ 
																		{'name': 'Fridge', id: 'F10'},
																		{'name': 'Induction Cooker', id: 'F11'},
																	  ]} />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Kitchen'}]} forSocket={[ 
																		{'name': 'Dishwasher', id: 'F15'},
																		{'name': 'Oven', id: 'F19'},
																	  ]} />
				</div>
				
				<div className='col-6'>
					<AirQuality />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Kitchen' />
				</div>
				
				{ /* Washer-Dryer, Dishwasher, Oven, Refrigerator */ }
			</List>
        );
    }
}

export default Kitchen;