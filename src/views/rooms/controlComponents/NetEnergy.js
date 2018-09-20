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
import LineChart from '../../../globalcomponents/LineChart';

const styles = theme => ({
	card: {
		marginBottom: 10,
	},
});

class NetEnergy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTemperature: true,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	render() {
		const { classes, theme } = this.props;
		
		return (
			<div>
				<Typography variant="subheading" gutterBottom>Net Energy (kWh)</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters="true">
							<LineChart type='energy' />
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(NetEnergy));