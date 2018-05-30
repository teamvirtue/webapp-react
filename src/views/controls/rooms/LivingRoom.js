import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

// Local import
// import Temperature from '../controlComponents/Temperature';
import Light from '../controlComponents/Light';

class LivingRoom extends Component {

    render() {
		const classes = this.props;
		
        return (
            <div>
				<List>
					<Light />
					
					<Typography className={ classes.controlsTitle } type='subheading'>
						Appliances
					</Typography>
				</List>
			</div>
        );
    }
}

export default LivingRoom;