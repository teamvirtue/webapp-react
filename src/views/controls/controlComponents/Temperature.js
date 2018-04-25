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
		const classes = this.props;
		
		return (
			<div>
				<Typography className={ classes.controlsTitle } type='subheading'>
					Temperature
				</Typography>

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
					divider
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