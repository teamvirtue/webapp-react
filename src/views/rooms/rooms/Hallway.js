import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
// import Temperature from '../controlComponents/Temperature';
import Light from '../controlComponents/Light';

class Hallway extends Component {

    render() {
		const selectedTab = this.props.tab;
		
        return (
			<List>
				{ selectedTab === 'appliances' && 
					<div>
						<Light forRoom='Hallway' />
					</div>
				}
				
				{ selectedTab === 'statistics' && 
					<div></div>
				}
			</List>
        );
    }
}

export default Hallway;