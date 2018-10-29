import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Apartment from './rooms/Apartment';
import LivingRoom from './rooms/LivingRoom';
import DinnerRoom from './rooms/DinnerRoom';
import Bedroom from './rooms/Bedroom';
import Bathroom from './rooms/Bathroom';
import Hallway from './rooms/Hallway';
import Kitchen from './rooms/Kitchen';
import Outdoor from './rooms/Outdoor';
import TechnicalRoom from './rooms/TechnicalRoom';

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
	dialogPaperRoot: {
		backgroundColor: '#f9f9f9',
	},
	dialogSmall: {
		minWidth: 500,
	},
	dialogFull: {
		minWidth: 0,
	},
	dialogHeader: {
		backgroundColor: 'white',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 10,
	},
	dialogNav: {
		backgroundColor: 'white',
		borderBottom: '1px solid #eaeaea',
		textAlign: 'center',
		marginBottom: 15,
	},
	dialogHeaderHeading: {
		display: 'inline-block',
	},
	dialogHeaderIcon: {
		fontSize: 32, 
		verticalAlign: 'middle',
		marginRight: 10,
		marginTop: -3,
	},
	dialogCloseButton: {
		position: 'absolute',
		marginTop: 10,
	},
});
		
let rooms = [
	{ id: 1, value: 'Apartment', icon: 'home', component: Apartment, diffColor: true },
	{ id: 2, value: 'Living Room', icon: 'weekend', component: LivingRoom, },
	{ id: 3, value: 'Dinner Room', icon: 'local_dining', component: DinnerRoom, },
	{ id: 4, value: 'Bedroom', icon: 'hotel', component: Bedroom, },
	{ id: 5, value: 'Bathroom', icon: 'hot_tub', component: Bathroom, },
	{ id: 6, value: 'Hallway', icon: 'transfer_within_a_station', component: Hallway, },
	{ id: 7, value: 'Kitchen', icon: 'room_service', component: Kitchen, },
	{ id: 8, value: 'Outdoor', icon: 'local_florist', component: Outdoor, },
	{ id: 9, value: 'Technical Room', icon: 'power', component: TechnicalRoom, },
];

function Transition(props) {
	return <Fade {...props} />;
}

class RoomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 1,
			openDialog: false,
			selectedTab: 'appliances',
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
		this.setState({ selectedTab: 'appliances' });
	};
	
	handleSelectedTab = (event, value) => {
		this.setState({ selectedTab: value });
	}

    render() {
		const { fullScreen } = this.props;
        const { classes } = this.props;
        const currentId = this.state.currentId;
		const selectedTab = this.state.selectedTab;

        return (
			<div>
				<div className='row mobileReducePadding'>
					{ rooms.map(data => {
						return (
							<div key={ data.id } className={ classes.subNavItem + ' col-4 mobileReducePadding' }>
								<Paper
									className={classes.subNavItemPaper}
									elevation={1}
									square={true}
									onClick={ () => {
										this.handleClick(data.id);
										this.handleDialogOpen();
									} }
								>
									<div className={ classes.subNavItemContent }>
										<Icon color={ (data.diffColor === true ? 'secondary' : 'primary' ) } style={{ fontSize: 30 }}>{ data.icon }</Icon>
										<Typography component='p'>
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
						paper: classes.dialogPaperRoot,
						paperWidthSm: classes.dialogSmall,
						paperFullScreen: classes.dialogFull,
					}}
				>
					<IconButton
						onClick={ this.handleDialogClose }
						aria-label="Close"
						className={classes.dialogCloseButton}
					>
						<Icon>arrow_back</Icon>
					</IconButton>
					{ rooms.map(data => {
						if(currentId === data.id){
							return (
								<div key={ data.id } className={ classes.flex + " h3-bold" }>
									<div className={ classes.dialogHeader }>
										<Icon color='primary' className={ classes.dialogHeaderIcon }>{ data.icon }</Icon>
										<Typography className={ classes.dialogHeaderHeading } variant="title" gutterBottom>
											{ data.value }
										</Typography>
									</div>
									<div className={ classes.dialogNav }>
										<Tabs
										  value={selectedTab}
										  indicatorColor="primary"
										  textColor="primary"
										  onChange={this.handleSelectedTab}
										  fullWidth
										>
											<Tab value="appliances" label="Appliances" />
											<Tab value="statistics" label="Statistics" />
										</Tabs>
									</div>
									<DialogContent>
										<data.component tab={selectedTab} />
									</DialogContent>
								</div>
							);
						}
						return false;
					}) }
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