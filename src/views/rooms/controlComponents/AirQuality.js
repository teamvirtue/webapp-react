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
		marginBottom: 25,
		textAlign: 'center',
	},
	title: {
		marginBottom: 20,
		textAlign: 'center',
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	subtitle: {
		fontWeight: 'bold',
		paddingTop: 7,
		paddingBottom: 20,
	},
	typography: {
		fontSize: '56px',
		lineHeight: '56px',
		display: 'inline-block',
		padding: '10px 10px 20px 0',
	},
});

class AirQuality extends Component {

	render() {
		const { classes, theme, houseData } = this.props;
		
		if (houseData.indoorHumidity >= 35 && 
			houseData.indoorHumidity <= 50 &&
			houseData.indoorCO2 >= 0 && 
			houseData.indoorCO2 < 600
		){
			return (
				<div>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subheading" className={classes.title}>Air Quality</Typography>
								<Icon className={ classes.typography }>done</Icon>
								<div className={classes.subtitle}>Good</div>
						</CardContent>
					</Card>
				</div>
			);
		}else if(houseData.indoorHumidity < 35 || houseData.indoorHumidity > 50){
			return (
				<div>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subheading" className={classes.title}>Air Quality</Typography>
								<Icon className={ classes.typography }>close</Icon>
								<div className={classes.subtitle}>Bad humidity</div>
						</CardContent>
					</Card>
				</div>
			);
		}else if(houseData.indoorHumidity > 600){
			return (
				<div>
					<Card className={classes.card}>
						<CardContent>
							<Typography variant="subheading" className={classes.title}>Air Quality</Typography>
								<Icon className={ classes.typography }>close</Icon>
								<div className={classes.subtitle}>Bad CO2</div>
						</CardContent>
					</Card>
				</div>
			);
		}else{
			return (<div></div>);
		}
	}
}


const mapStateToProps = (state) => {
    return {
		houseData: state.houseData,
    }
};

export default connect(mapStateToProps, null)(withTheme()(withStyles(styles)(AirQuality)));