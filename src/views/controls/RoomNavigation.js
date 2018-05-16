import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';

import All from './rooms/All';
import LivingRoom from './rooms/LivingRoom';
import DinnerRoom from './rooms/DinnerRoom';

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
	dialogSmall: {
		minWidth: 350,
	},
	dialogFull: {
		minWidth: 0,
	},
});

let rooms = [
    { id: 1, value: 'General', icon: 'check_circle', component: <All key={ 1 } />, },
    { id: 2, value: 'Living Room', icon: 'weekend', component: <LivingRoom key={ 2 } />, },
    { id: 3, value: 'Dinner Room', icon: 'local_dining', component: <DinnerRoom key={ 3 } />, },
    { id: 4, value: 'Bedroom', icon: 'hotel', component: '', },
    { id: 5, value: 'Bathroom', icon: 'hot_tub', component: '', },
    { id: 6, value: 'Hallway', icon: 'transfer_within_a_station', component: '', },
	{ id: 7, value: 'Kitchen', icon: 'room_service', component: '', },
    { id: 8, value: 'Outdoor', icon: 'local_florist', component: '', },
	{ id: 9, value: 'Technical Room', icon: 'power', component: '', },
];

class RoomNavigation extends Component {
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
		const { fullScreen } = this.props;
        const { classes } = this.props;
        const { currentId } = this.state;

        return (
			<div>
				<div className="row">
					<div className={ classes.subNavContainer }>
						{ rooms.map(data => {
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
					</div>
				</div>
				
				
				<Dialog
					fullScreen={ fullScreen }
					open={this.state.openDialog}
					transition={Grow}
					onClose={this.handleDialogClose}
					classes={{
						paperWidthSm: classes.dialogSmall,
						paperFullScreen: classes.dialogFull,
					}}
				>
					<DialogContent>
						{ rooms.map(data => {
							if(currentId === data.id){
								return (
									<div key={ data.id }>
										{ data.component }
									</div>
								);
							}
							return false;
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

RoomNavigation.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withMobileDialog()(RoomNavigation));