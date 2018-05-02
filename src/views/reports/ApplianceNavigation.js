import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  // withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';

import WasherDryer from './appliances/WasherDryer';

const styles = theme => ({
    subNavContainer: {
		whiteSpace: 'nowrap',
    },
    subNavItem: {
		marginTop: 10,
		marginBottom: 10,
		display: 'table',
    },
    subNavItemPaper: {
        backgroundColor: grey[200],
		height: 120,
		cursor: 'pointer',
		display: 'table-cell',
		verticalAlign: 'middle',
	},
});

let appliances = [
    { id: 1, value: 'Washer-dryer', icon: 'local_laundry_service', component: <WasherDryer />},
    { id: 2, value: 'Dishwasher', icon: 'local_drink', component: '' },
    { id: 3, value: 'Oven', icon: 'room_service', component: '' },
	{ id: 4, value: 'Refrigerator', icon: 'kitchen', component: '' },
    { id: 5, value: 'Music System', icon: 'queue_music', component: '' },
    { id: 6, value: 'TV', icon: 'tv', component: '' },
    { id: 7, value: 'Personal devices', icon: 'important_devices', component: '' },
    { id: 8, value: 'Lights', icon: 'lightbulb_outline', component: '' },
    { id: 9, value: 'Clock', icon: 'access_time', component: '' },
    { id: 10, value: 'Car', icon: 'directions_car', component: '' },
];

class ApplianceNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 1,
			openDialog: false,
        };
    }

    handleClick = (id, event) => {
        this.setState({
            currentId: id,
        });
    };
	
	handleDialogOpen = () => {
		this.setState({ openDialog: true });
	};

	handleDialogClose = () => {
		this.setState({ openDialog: false });
	};

    render() {
        const { classes } = this.props;
        const { currentId } = this.state;

        return (
			<div>
				<div className={classes.subNavContainer}>
					<List component='nav' className={ classes.subNavList }>
						{ appliances.map(data => {
							return (
								<div key={ data.id } className={[classes.subNavItem, "col-xs-4"].join(' ')}>
									<Paper className={classes.subNavItemPaper} elevation={1} onClick={ () => { this.handleClick(data.id);this.handleDialogOpen(); } }>
										<Icon color="primary" style={{ fontSize: 30 }}>{ data.icon }</Icon>
										<Typography component="p">
											{ data.value }
										</Typography>
									</Paper>
								</div>
							);
						}) }
					</List>
				</div>
				
				
				<Dialog
					open={this.state.openDialog}
					transition={Grow}
					onClose={this.handleDialogClose}
				>
					<DialogContent>
						{ appliances.map(data => {
							if(currentId === data.id){
								return (
									<div key={ data.id }>
										{ data.component }
									</div>
								);
							}
						}) }
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDialogClose} color="secondary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
            </div>
        );
    }
}

ApplianceNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplianceNavigation);