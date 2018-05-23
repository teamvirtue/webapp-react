import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';

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