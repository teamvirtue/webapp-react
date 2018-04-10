import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import Temperature from '../controlComponents/Temperature';
import NightMode from '../controlComponents/NightMode';

class LivingRoom extends Component {

    render() {
		const classes = this.props;
		
        return (
            <div>
				<List>
					<Temperature />
					<NightMode />
				</List>
			</div>
        );
    }
}

export default LivingRoom;