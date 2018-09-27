import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { updateRoomsLightOnOff, updateRoomsLightIntensity, updateRoomsLightWarmth } from '../../../actions';

const styles = theme => ({ 
	card: {
		marginBottom: 25,
	},
});

class Light extends Component {
	
	handleLightOnOff = name => event => {
		this.props.updateLightOnOff(this.props.forRoom, event.target.checked);
    };
	
	handleLightIntensity = name => newIntensity => {
		this.props.updateLightIntensity(this.props.forRoom, newIntensity);
    };
	
	handleLightWarmth = name => newWarmth => {
		this.props.updateLightWarmth(this.props.forRoom, newWarmth);
    };
	
	render() {
		const { classes, theme, houseData, forRoom } = this.props;
		
		return (
			<div>
				<Typography variant="subheading" gutterBottom>Lights</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters={true}>
							<ListItemIcon>
								<Icon>power_settings_new</Icon>
							</ListItemIcon>
							<ListItemText primary='Enable' />
							<ListItemSecondaryAction>
								<Switch
									checked={ houseData.room[forRoom].lights.onOff }
									onChange={ this.handleLightOnOff() }
									color="primary"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem disableGutters={true}>
							<ListItemIcon>
								<Icon>wb_incandescent</Icon>
							</ListItemIcon>
							<div className='listitem-secondaryflex'>
								<ListItemText primary='Intensity' />
								<Slider
									min={ 0 }
									max={ 20 }
									defaultValue={ houseData.room[forRoom].lights.intensity }
									onChange={ this.handleLightIntensity() }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handleStyle={{
										borderColor: theme.palette.primary.main,
										backgroundColor: theme.palette.primary.main,
									}}
									railStyle={{ backgroundColor: 'lightgray' }}
								/>
							</div>
						</ListItem>
						<ListItem disableGutters={true}>
							<ListItemIcon>
								<Icon>colorize</Icon>
							</ListItemIcon>
							<div className='listitem-secondaryflex'>
								<ListItemText primary='Warmth' />
								<Slider
									min={ 0 }
									max={ 2 }
									defaultValue={ houseData.room[forRoom].lights.warmth }
									onChange={ this.handleLightWarmth() }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handleStyle={{
										borderColor: theme.palette.primary.main,
										backgroundColor: theme.palette.primary.main,
									}}
									railStyle={{ backgroundColor: 'lightgray' }}
								/>
							</div>
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
    return {
		houseData: state.houseData,
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateLightOnOff: (forRoom, onOff) => {
        dispatch(updateRoomsLightOnOff(forRoom, onOff));
    },
    updateLightIntensity: (forRoom, intensity) => {
        dispatch(updateRoomsLightIntensity(forRoom, intensity));
    },
    updateLightWarmth: (forRoom, warmth) => {
        dispatch(updateRoomsLightWarmth(forRoom, warmth));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(Light)));