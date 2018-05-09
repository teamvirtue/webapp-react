import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import {
// import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Switch from 'material-ui/Switch';

class NightMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedNightMode: true,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	render() {
		return (
			<div>
				<Typography variant="title" gutterBottom>
					Night Mode
				</Typography>

				<ListItem divider>
					<ListItemIcon>
						<Icon>brightness_2</Icon>
					</ListItemIcon>

					<ListItemText primary='Night mode' />

					<ListItemSecondaryAction>
						<Switch
							checked={this.state.checkedNightMode}
							onChange={this.handleChange('checkedNightMode')}
						/>
					</ListItemSecondaryAction>
				</ListItem>
			</div>
		);
	}
}

export default NightMode;