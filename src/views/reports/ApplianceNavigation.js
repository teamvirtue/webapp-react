import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import WasherDryer from './appliances/WasherDryer';

const styles = theme => ({
	flex: {
		flex: 1
	},
    subNavItem: {
		marginTop: 10,
		marginBottom: 10,
		display: 'table',
		whiteSpace: 'nowrap',
    },
    subNavItemPaper: {
        backgroundColor: 'white',
		cursor: 'pointer',
		display: 'table-cell',
		paddingBottom: '100%',
	},
	subNavItemContent: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	dialogRoot: {
		margin: 10,
	},
	dialogSmall: {
		minWidth: 450,
	},
	dialogFull: {
		minWidth: 0,
	},
	dialogHeading: {
		backgroundColor: '#f9f9f9',
		borderBottom: '1px solid #eaeaea',
		textAlign: 'center',
		padding: '10px 0',
		marginBottom: 15,
	},
});

let appliances = [
    { id: 1, value: 'Washer-dryer', icon: 'local_laundry_service', component: <WasherDryer />},
    { id: 2, value: 'Dishwasher', icon: 'local_drink', component: <WasherDryer /> },
    { id: 3, value: 'Oven', icon: 'room_service', component: <WasherDryer /> },
	{ id: 4, value: 'Refrigerator', icon: 'kitchen', component: <WasherDryer /> },
    { id: 5, value: 'Music System', icon: 'queue_music', component: <WasherDryer /> },
    { id: 6, value: 'TV', icon: 'tv', component: <WasherDryer /> },
    { id: 7, value: 'Personal devices', icon: 'important_devices', component: <WasherDryer /> },
    { id: 8, value: 'Lights', icon: 'lightbulb_outline', component: <WasherDryer /> },
    { id: 9, value: 'Clock', icon: 'access_time', component: <WasherDryer /> },
    { id: 10, value: 'Car', icon: 'directions_car', component: <WasherDryer /> },
];

function Transition(props) {
	return <Grow {...props} />;
}

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
		const { fullScreen } = this.props;
        const { classes } = this.props;
        const { currentId } = this.state;

        return (
			<div>
				<div className="row mobileReducePadding">
					{ appliances.map(data => {
						return (
							<div key={ data.id } className={ classes.subNavItem + ' col-4 mobileReducePadding' }>
								<Paper className={classes.subNavItemPaper} elevation={1} square={true} onClick={ () => { this.handleClick(data.id);this.handleDialogOpen(); } }>
									<div className={ classes.subNavItemContent }>
										<Icon color="primary" style={{ fontSize: 30 }}>{ data.icon }</Icon>
										<Typography component="p">
											{ data.value }
										</Typography>
									</div>
								</Paper>
							</div>
						);
					}) }
				</div>
				
				
				<Dialog
					fullScreen={ fullScreen }
					open={this.state.openDialog}
					TransitionComponent={Transition}
					onClose={this.handleDialogClose}
					classes={{
						root: classes.dialogRoot,
						paperWidthSm: classes.dialogSmall,
						paperFullScreen: classes.dialogFull,
					}}
				>
					{ appliances.map(data => {
						if(currentId === data.id){
							return (
								<div key={ data.id } className={ classes.flex }>
									<div className={ classes.dialogHeading }>
										<Icon color='primary' style={{ fontSize: 36 }}>{ data.icon }</Icon>
										<Typography variant="title" gutterBottom>
											{ data.value }
										</Typography>
									</div>
									<DialogContent>
										{ data.component }
									</DialogContent>
								</div>
							);
						}
						return false;
					}) }

					<DialogActions>
						<Button
							onClick={ this.handleDialogClose }
							variant='outlined'
							color='primary'
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
            </div>
        );
    }
}

ApplianceNavigation.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ApplianceNavigation));