import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const styles = theme => ({
	card: {
	},
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
				<Typography variant="subheading" gutterBottom>Lights</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>power_settings_new</Icon>
							</ListItemIcon>
							<ListItemText primary='Enable' />
							<ListItemSecondaryAction>
								<Switch
									checked={ this.state.checkedLightOnOff }
									onChange={ this.handleChange('checkedLightOnOff') }
									color="primary"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>wb_incandescent</Icon>
							</ListItemIcon>
							<ListItemText primary='Intensity' secondary={
								<Slider
									min={ 0 }
									max={ 20 }
									defaultValue={ 10 }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handleStyle={{
										borderColor: theme.palette.primary.main,
										backgroundColor: theme.palette.primary.main,
									}}
									railStyle={{ backgroundColor: 'lightgray' }}
								/>
							}/>
						</ListItem>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>colorize</Icon>
							</ListItemIcon>
							<ListItemText primary='Warmth' secondary={
								<Slider
									min={ 0 }
									max={ 2 }
									defaultValue={ 0 }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handleStyle={{
										borderColor: theme.palette.primary.main,
										backgroundColor: theme.palette.primary.main,
									}}
									railStyle={{ backgroundColor: 'lightgray' }}
								/>
							}/>
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Light));