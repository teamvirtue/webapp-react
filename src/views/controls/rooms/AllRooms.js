import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

// Local import
import Temperature from '../controlComponents/Temperature';
import NightMode from '../controlComponents/NightMode';

class LivingRoom extends Component {

    render() {
		// const classes = this.props;
		
        return (
            <List>
                <Temperature />
                <NightMode />
            </List>
        );
    }
}

export default LivingRoom;