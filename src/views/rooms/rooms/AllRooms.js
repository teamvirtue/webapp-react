import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NetEnergy from '../controlComponents/NetEnergy';
import WaterUsage from '../controlComponents/WaterUsage';
import ApplianceEnergy from '../controlComponents/ApplianceEnergy';

import { apiGetSocketData } from '../../../actions/asyncActions';

class AllRooms extends Component {
	
    componentDidMount() {
        this.props.apiGetSocketData('Kitchen', 'all');
    };

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
						<NetEnergy forRoom='All Rooms' />

						<WaterUsage />
						
						<ApplianceEnergy />
					</div>
				}
            </List>
        );
    }
}

const mapDispatchToProps = dispatch => ({
	apiGetSocketData: (room, time) => {
		dispatch(apiGetSocketData(room, time));
	}
});

export default connect(null, mapDispatchToProps)(AllRooms);