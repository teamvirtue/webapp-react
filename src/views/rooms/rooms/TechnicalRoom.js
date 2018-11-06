import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
// import Temperature from '../controlComponents/Temperature';
import Light from '../controlComponents/Light';

class TechnicalRoom extends Component {

    render() {
        return (
			<List>
				<div>
					<div className='notificationWarning notificationMargin'>This is a mock-up. Appliance controls are disabled during tours.</div>
					<Light forRoom='Technical Room' />
					{ /* HVAC, Battery, Grid, Solar Panels */ }
				</div>
			</List>
        );
    }
}

export default TechnicalRoom;