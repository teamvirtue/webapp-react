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
import Button from '@material-ui/core/Button';

const styles = theme => ({
	card: {
	},
	button: {
		marginRight: 5,
	},
});

class Light extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedLightOnOff: false,
			lightColorButton: 'cold',
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	handleLightColorButton = lightColorButton => (color) => {
		this.setState({ lightColorButton });
	}
	
	render() {
		const { classes, theme } = this.props;
		const lightColorButton = this.state.lightColorButton;
		
		return (
			<div>
				<Typography variant="subheading" gutterBottom>Lights</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>power_settings_new</Icon>
							</ListItemIcon>
							<ListItemText disableTypography primary='Enable' secondary={
								<Switch
									checked={ this.state.checkedLightOnOff }
									onChange={ this.handleChange('checkedLightOnOff') }
									color="primary"
								/>
							}
							/>
						</ListItem>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>wb_incandescent</Icon>
							</ListItemIcon>

							<ListItemText disableTypography primary='Intensity' secondary={
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
							}
							/>
						</ListItem>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>colorize</Icon>
							</ListItemIcon>
							<ListItemText>
								<Button variant={ (lightColorButton === 'cold' ? "contained" : "outlined" ) } size="small" style={{color: "grey"}} className={classes.button} onClick={ this.handleLightColorButton('cold') }>
									Cold
								</Button>
								<Button variant={ (lightColorButton === 'neutral' ? "contained" : "outlined" ) } size="small" style={{color: "grey"}} className={classes.button} onClick={ this.handleLightColorButton('neutral') }>
									Neutral
								</Button>
								<Button variant={ (lightColorButton === 'warm' ? "contained" : "outlined" ) } size="small" style={{color: "grey"}} className={classes.button} onClick={ this.handleLightColorButton('warm') }>
									Warm
								</Button>
							</ListItemText>
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Light));