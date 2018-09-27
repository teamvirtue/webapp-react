import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NetEnergy from '../controlComponents/NetEnergy';
import WaterUsage from '../controlComponents/WaterUsage';
import ApplianceEnergy from '../controlComponents/ApplianceEnergy';

class AllRooms extends Component {

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

						<WaterUsage />
						
						<ApplianceEnergy />
					</div>
				}
            </List>
        );
    }
}

export default AllRooms;