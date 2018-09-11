import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NightMode from '../controlComponents/NightMode';
import LineChart from '../../../globalcomponents/LineChart';
import BarChart from '../../../globalcomponents/BarChart';

class LivingRoom extends Component {

    render() {
		// const classes = this.props;
		
        return (
            <List>
                <Temperature />
				
                <NightMode />
				
				<h1>Net Energy (kWh)</h1>
				<LineChart type='energy' />

				<h1>Water Usage (L)</h1>
				<LineChart type='water' />
				
				<h1>Appliance Energy (kWh)</h1>
				<BarChart />
            </List>
        );
    }
}

export default LivingRoom;