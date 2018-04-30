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
    checked: {
        color: theme.palette.primary.main,
    },
	listItemGutters: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});

let rooms = [
    { id: 1, value: 'All', icon: 'check_circle', component: <All key={ 1 } />, },
    { id: 2, value: 'Living Room', icon: 'event_seat', component: <LivingRoom key={ 2 } />, },
    { id: 3, value: 'Dinner Room', icon: 'free_breakfast', component: <DinnerRoom key={ 3 } />, },
    { id: 4, value: 'Bedroom', icon: 'hotel', component: '', },
    { id: 5, value: 'Bathroom', icon: 'hot_tub', component: '', },
    { id: 6, value: 'Hallway', icon: 'transfer_within_a_station', component: '', },
	{ id: 7, value: 'Kitchen', icon: 'local_dining', component: '', },
    { id: 8, value: 'Outdoor', icon: 'local_florist', component: '', },
];

class RoomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
			openRoomPopup: false,
        };
    }

    handleClick = (id, event) => {
        this.setState({
            value: id,
        });
    };
	
	handleRoomPopupOpen = () => {
		this.setState({ openRoomPopup: true });
	};

	handleRoomPopupClose = () => {
		this.setState({ openRoomPopup: false });
	};

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
			<div>
				<div className="row">
					<div className={ classes.subNavContainer }>
						{ rooms.map(data => {
							return (
								<div className={[classes.subNavItem, "col-xs-4"].join(' ')}>
									<Paper className={classes.subNavItemPaper} elevation={2} onClick={ () => { this.handleClick(data.id);this.handleRoomPopupOpen(); } }>
										<Icon style={{ fontSize: 30 }}>{ data.icon }</Icon>
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
					open={this.state.openRoomPopup}
					onClose={this.handleRoomPopupClose}
				>
					<DialogContent>
						{ rooms.map(data => {
							return (
								value === data.id && data.component
							);
						}) }
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRoomPopupClose} color="secondary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
        );
    }
}

RoomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomNavigation);