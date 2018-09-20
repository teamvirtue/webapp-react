import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NetEnergy from '../controlComponents/NetEnergy';

import LineChart from '../../../globalcomponents/LineChart';
import BarChart from '../../../globalcomponents/BarChart';

class LivingRoom extends Component {

    render() {
		const selectedTab = this.props.tab;
		
        return (
            <List>
				{ selectedTab === 'appliances' && 
					<div>
						<Temperature />
					</div>
				}
				
				{ selectedTab === 'statistics' && 
					<div>
						<NetEnergy />

						<h1>Water Usage (L)</h1>
						<LineChart type='water' />
						
						<h1>Appliance Energy (kWh)</h1>
						<BarChart />
					</div>
				}
            </List>
        );
    }
}

export default LivingRoom;