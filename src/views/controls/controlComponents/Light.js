import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import {
// import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Switch from 'material-ui/Switch';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const styles = theme => ({

});

class Light extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedLightOnOff: false,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	render() {
		const { classes, theme } = this.props;
		
		return (
			<div>
				<Typography variant="title" gutterBottom>
					Lights for {this.props.room}
				</Typography>
				
				<ListItem>
					<ListItemIcon>
						<Icon>power_settings_new</Icon>
					</ListItemIcon>

					<ListItemText primary='Power' />

					<ListItemSecondaryAction>
						<Switch
							checked={ this.state.checkedLightOnOff }
							onChange={ this.handleChange('checkedLightOnOff') }
						/>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Icon>lightbulb_outline</Icon>
					</ListItemIcon>

					<ListItemText disableTypography primary='Brightness' secondary={
						<Slider
							min={ 0 }
							max={ 20 }
							defaultValue={ 5 }
							trackStyle={{ backgroundColor: theme.palette.primary.main }}
							handleStyle={{
								borderColor: theme.palette.primary.main,
								backgroundColor: theme.palette.primary.main,
							}}
							railStyle={{ backgroundColor: 'lightgray' }}
						/>
					}
					/>

				</ListItem>
				<ListItem
					button
					aria-haspopup='true'
					aria-controls='lorem-ipsum'
					aria-label='Lorem ipsum'
					// onClick={this.handleClickListItem}
				>
					<ListItemIcon>
						<Icon>color_lens</Icon>
					</ListItemIcon>

					<ListItemText primary='Colors' secondary='Choose colors of your lights' />
				</ListItem>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Light));