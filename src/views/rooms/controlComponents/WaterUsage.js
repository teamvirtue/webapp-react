import React, { Component } from 'react';
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

class WaterUsage extends Component {

	render() {
		const { classes } = this.props;
		
		return (
			<div>
				<Card className={classes.card}>
					<CardContent>
						<Typography variant="subheading" className={classes.title}>Water Usage (L)</Typography>
						<ListItem disableGutters={true}>
							{/* <LineChart type='water' /> */}
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(WaterUsage));