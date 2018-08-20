import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
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
		const { theme } = this.props;
		
		return (
			<div>
				<Typography variant="body2" gutterBottom>
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