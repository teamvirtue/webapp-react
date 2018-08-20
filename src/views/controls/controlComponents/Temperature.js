import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTemperature: true,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	render() {
		return (
			<div>
				<ListSubheader>Temperature</ListSubheader>

				<ListItem button onClick={ this.handleChange('checkedTemperature') } > {/*TODO: fix click*/}
					<ListItemIcon>
						<Icon>ac_unit</Icon>
					</ListItemIcon>

					<ListItemText primary='Air conditioning' />

					<ListItemSecondaryAction>
						<Switch
							checked={ this.state.checkedTemperature }
							onChange={ this.handleChange('checkedTemperature') }
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem
					button
					/*aria-haspopup='true'
					aria-controls='set-temperature'
					aria-label='Set temperature'*/
				>
					<ListItemIcon>
						<Icon>touch_app</Icon>
					</ListItemIcon>

					<ListItemText primary='Set temperature' secondary='14 degrees' /> {/*TODO: insert pop-up menu*/}
				</ListItem>
			</div>
		);
	}
}

export default Temperature;