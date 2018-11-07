import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class Hallway extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Hallway' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Hallway'}]} forSocket={[ 
																		{'name': 'Washing Machine', id: 'F16'},
																	  ]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Hallway' />
				</div>
			</List>
        );
    }
}

export default Hallway;