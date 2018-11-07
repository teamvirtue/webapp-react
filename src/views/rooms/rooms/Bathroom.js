import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Light from '../controlComponents/Light';
import RealtimeEnergyMeter from '../controlComponents/RealtimeEnergyMeter';
import NetEnergy from '../controlComponents/NetEnergy';

class Bathroom extends Component {

    render() {
        return (
			<List className='row'>
				<div className='col-6'>
					<Light forRoom='Bathroom' />
				</div>
				
				<div className='col-6'>
					<RealtimeEnergyMeter forRoom={[{'roomname': 'Bathroom'}]} forSocket={[ 
																		{'name': 'Shower', id: 'F21'},
																		{'name': 'Sockets', id: 'F23'}
																	  ]} />
				</div>

				<div className='col-12'>
					<NetEnergy forRoom='Bathroom' />
				</div>
			</List>
        );
    }
}

export default Bathroom;