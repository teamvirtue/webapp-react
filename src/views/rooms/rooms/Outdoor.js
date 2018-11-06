import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
// import Temperature from '../controlComponents/Temperature';
import Light from '../controlComponents/Light';

class Outdoor extends Component {

    render() {
        return (
			<List>
				<div>
					<div className='notificationWarning notificationMargin'>This is a mock-up. Appliance controls are disabled during tours.</div>
					<Light forRoom='Outdoor' />
					{ /* Car */ }
				</div>
			</List>
        );
    }
}

export default Outdoor;