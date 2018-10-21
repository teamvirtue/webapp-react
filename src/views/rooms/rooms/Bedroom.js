import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
// import Temperature from '../controlComponents/Temperature';
import Light from '../controlComponents/Light';

class Bedroom extends Component {

    render() {
		const selectedTab = this.props.tab;
		
        return (
			<List>
				{ selectedTab === 'appliances' && 
					<div>
						<div className='notification'>This is a mock-up. Appliance controls are disabled during tours.</div>
						<Light forRoom='Bedroom' />
					</div>
				}
				
				{ selectedTab === 'statistics' && 
					<div></div>
				}
			</List>
        );
    }
}

export default Bedroom;