import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import LineChart from '../../../globalcomponents/LineChart';

const styles = theme => ({
	card: {
		marginBottom: 25,
	},
	title: {
		marginBottom: 20,
		textAlign: 'center',
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
});

class NetEnergy extends Component {
	
	render() {
		const { classes, houseData, forRoom } = this.props;
		
		return (
			<div>
				<Card className={classes.card}>
					<CardContent>
						<Typography variant="subheading" className={classes.title}>Net Energy (kWh)</Typography>
						<ListItem disableGutters={true}>
							<LineChart type='energy' data={ houseData.room[forRoom].energyUsageAll } />
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

export default connect(mapStateToProps, null)(withTheme()(withStyles(styles)(NetEnergy)));