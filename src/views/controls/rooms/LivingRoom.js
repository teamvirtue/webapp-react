import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Switch from 'material-ui/Switch';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

import Temperature from '../controlComponents/Temperature';

const styles = theme => ({

});

class LivingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedLightOnOff: false,
            checkedNightMode: true,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    render() {
		const { classes, theme } = this.props;
		
        return (
            <div>
				<List>
					<Typography className={ classes.controlsTitle } type='subheading'>
						Lights
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

						<ListItemText primary='Brightness' secondary={
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
					{/*<ListItem
						button
						aria-haspopup='true'
						aria-controls='lorem-ipsum'
						aria-label='Lorem ipsum'
						// onClick={this.handleClickListItem}
					>
						<ListItemIcon>
							<Icon>lightbulb_outline</Icon>
						</ListItemIcon>

						<ListItemText disableTypography primary='Volume' secondary='Lorem ipsum'/>
					</ListItem>*/}
					
					<Typography className={ classes.controlsTitle } type='subheading'>
						Appliances
					</Typography>

					<ListItem>
						<ListItemIcon>
							<Icon>info</Icon>
						</ListItemIcon>

						<ListItemText primary='Lorem ipsum' />

						<ListItemSecondaryAction>
							<Switch
								checked={this.state.checkedTemperature}
								onChange={this.handleChange('checkedTemperature')}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem
						button
						aria-haspopup='true'
						aria-controls='lorem-ipsum'
						aria-label='Lorem ipsum'
						// onClick={this.handleClickListItem}
					>
						<ListItemIcon>
							<Icon>info</Icon>
						</ListItemIcon>

						<ListItemText primary='Lorem ipsum' secondary='Lorem ipsum' />
					</ListItem>
				</List>
			</div>
        );
    }
}

export default withTheme()(withStyles(styles)(LivingRoom));