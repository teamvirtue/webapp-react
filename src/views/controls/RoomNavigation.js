import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

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
        backgroundColor: grey[100],
		height: 140,
		// width: 120,
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
    { id: 1, value: 'General', icon: 'check_circle', component: <All />, },
    { id: 2, value: 'Living Room', icon: 'weekend', component: <LivingRoom />, },
    { id: 3, value: 'Dinner Room', icon: 'local_dining', component: <DinnerRoom />, },
    { id: 4, value: 'Bedroom', icon: 'hotel', component: <DinnerRoom />, },
    { id: 5, value: 'Bathroom', icon: 'hot_tub', component: <DinnerRoom />, },
    { id: 6, value: 'Hallway', icon: 'transfer_within_a_station', component: <DinnerRoom />, },
	{ id: 7, value: 'Kitchen', icon: 'room_service', component: <DinnerRoom />, },
    { id: 8, value: 'Outdoor', icon: 'local_florist', component: <DinnerRoom />, },
	{ id: 9, value: 'Technical Room', icon: 'power', component: <DinnerRoom />, },
];

function Transition(props) {
	return <Grow {...props} />;
}

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
				<div className='row'>
					<div className={ classes.subNavContainer }>
						{ rooms.map(data => {
							return (
								<div key={ data.id } className={[ classes.subNavItem, 'col-xs-4'].join(' ') }>
									<Paper
                                        className={classes.subNavItemPaper}
                                        elevation={1}
										square={true}
                                        onClick={ () => {
                                            this.handleClick(data.id);
                                            this.handleDialogOpen();
                                        } }
                                    >
										<Icon color='primary' style={{ fontSize: 30 }}>{ data.icon }</Icon>
										<Typography component='p'>
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
					TransitionComponent={Transition}
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
						<Button onClick={ this.handleDialogClose } color='secondary'>
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