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
import Slider from 'rc-slider';

import { updateRoomsAircoOnOff, updateRoomsAircoTemperature } from '../../../actions';

const styles = theme => ({
	card: {
		marginBottom: 25,
	},
});

const Handle = Slider.Handle;
const handle = (props: HandleProps) => {
    const { value, dragging, offset, ...restProps } = props;
    const positionStyle = {
      position: 'absolute',
      left: `${offset-5}%`,
	  top: 15,
	  color: 'rgba(0, 0, 0, 0.54)',
    };

    return (
      <div>
        <span style={positionStyle}>{value}°C</span>
        <Handle value={value} offset={offset} {...restProps} />
      </div>
    );
}

class Temperature extends Component {
	
	handleAircoOnOff = name => event => {
		this.props.updateAircoOnOff(event.target.checked);
    };
	
	handleAircoTemperature = name => newTemperature => {
		this.props.updateAircoTemperature(newTemperature);
    };

	render() {
		const { classes, theme, houseData } = this.props;
		
		return (
			<div>
				{ houseData.room['Kitchen'].energyUsage }
				<Typography variant="subheading" gutterBottom>Air conditioning</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters={true}>
							<ListItemIcon>
								<Icon>power_settings_new</Icon>
							</ListItemIcon>
							<ListItemText primary='Enable' />
							<ListItemSecondaryAction>
								<Switch
									checked={ houseData.room['All Rooms'].airco.onOff }
									onChange={ this.handleAircoOnOff() }
									color="primary"
								/>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem disableGutters={true}>
							<ListItemIcon>
								<Icon>toys</Icon>
							</ListItemIcon>

							<div className='listitem-secondaryflex'>
								<ListItemText primary='Temperature' />
								<Slider
									min={ 10 }
									max={ 25 }
									defaultValue={ houseData.room['All Rooms'].airco.temperature }
									onChange={ this.handleAircoTemperature() }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handle={ handle }
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
    updateAircoOnOff: (onOff) => {
        dispatch(updateRoomsAircoOnOff(onOff));
    },
    updateAircoTemperature: (temperature) => {
        dispatch(updateRoomsAircoTemperature(temperature));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(Temperature)));