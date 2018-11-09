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

const styles = theme => ({ 
	card: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		marginBottom: 25,
		textAlign: 'center',
	},
	cardHalfAltBg: {
		background: 'linear-gradient(90deg, ' + theme.palette.primary.main + ' 50%, #da5426 50%)',
	},
	title: {
		marginBottom: 20,
		textAlign: 'center',
		textTransform: 'uppercase',
		letterSpacing: 1,
		color: 'white',
	},
	subtitle: {
		fontWeight: 'bold',
		
	},
	typography: {
		fontSize: '56px',
		display: 'inline-block',
		color: 'white',
		padding: '10px 10px 10px 0',
	},
});

class RealtimeEnergyMeter extends Component {

	render() {
		const { classes, theme, houseData, forRoom, forSocket } = this.props;
		
		if(forRoom && !forSocket){
			return (
				<div>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subheading" className={classes.title}>Realtime energy usage</Typography>
							<Typography className={classes.typography} component="h2" variant="display1">
								{ houseData.room[forRoom[0].roomname].energyUsageRealtime }
							</Typography>
							kWh
							<div className={classes.subtitle}>{ forRoom[0].energyname }</div>
						</CardContent>
					</Card>
				</div>
			);
		}else if(forRoom && forSocket && Array.isArray(forSocket)){
			if(forSocket.length === 1){
				return (
					<div>
						<Card className={classes.card}>
							<CardContent>
								<Typography variant="subheading" className={classes.title}>Realtime energy usage</Typography>
								<Typography className={classes.typography} component="h2" variant="display1">
									{ houseData.room[forRoom[0].roomname].energyUsageSocket[forSocket[0].id].energyUsageRealtime }
								</Typography>
								kWh
								<div className={classes.subtitle}>{ forSocket[0].name }</div>
							</CardContent>
						</Card>
					</div>
				);
			}else if(forSocket.length === 2){
				return (
					<div>
						<Card className={classes.card + ' ' + classes.cardHalfAltBg}>
							<CardContent className='row'>
								<div className='col-12'><Typography variant="subheading" className={classes.title}>Realtime energy usage</Typography></div>
								<div className='col-6'>
									<Typography className={classes.typography} component="h2" variant="display1">
										{ houseData.room[forRoom[0].roomname].energyUsageSocket[forSocket[0].id].energyUsageRealtime }
									</Typography>
									kWh
									<div className={classes.subtitle}>{ forSocket[0].name }</div>
								</div>
								<div className='col-6'>
									<Typography className={classes.typography} component="h2" variant="display1">
										{ houseData.room[forRoom[0].roomname].energyUsageSocket[forSocket[1].id].energyUsageRealtime }
									</Typography>
									kWh
									<div className={classes.subtitle}>{ forSocket[1].name }</div>
								</div>
							</CardContent>
						</Card>
					</div>
				);
			}
		}
	}
}


const mapStateToProps = (state) => {
    return {
		houseData: state.houseData,
    }
};

export default connect(mapStateToProps, null)(withTheme()(withStyles(styles)(RealtimeEnergyMeter)));