import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
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
		padding: "10px 0 15px 0",
		marginBottom: 10,
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
				<Card className={classes.card}>
					<div className="row">
						<div className="col-md-6">
							<ListSubheader>Lights</ListSubheader>
						</div>
						
						<div className="col-md-6 textalign-right">
							<Switch
								checked={ this.state.checkedLightOnOff }
								onChange={ this.handleChange('checkedLightOnOff') }
								color="primary"
							/>
						</div>
					</div>
					<ListItem>
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
					<ListItem>
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
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Light));