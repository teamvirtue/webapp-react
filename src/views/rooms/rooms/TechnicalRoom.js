import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class TechnicalRoom extends Component {

    render() {
        return (
			<List className='row'>
				{/*<div className='col-6'>
					<Light forRoom='Technical Room' />
				</div>*/}
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Technical Room'}]} forSocket={[ 
																		{'name': 'HVAC', id: 'F13'},
																		{'name': 'Pumps and Fan', id: 'F18'},
																	  ]} />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Technical Room'}]} forSocket={[ 
																		{'name': 'Socket', id: 'F17'},
																		{'name': 'Boiler', id: 'F24'},
																	  ]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Technical Room' />
				</div>
				
				{ /* Battery, Grid, Solar Panels */ }
			</List>
        );
    }
}

export default TechnicalRoom;