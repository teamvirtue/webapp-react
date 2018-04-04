import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import Temperature from '../controlComponents/Temperature';

class LivingRoom extends Component {

    render() {
		const { classes, theme } = this.props;
		
        return (
            <div>
				<List>
					<Temperature />
				</List>
			</div>
        );
    }
}

export default LivingRoom;