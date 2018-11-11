import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { CSSTransitionGroup } from 'react-transition-group';
import '../animations.css';
import { CardContainer } from '../containers/CardContainer';

/*
import SocketCard from './../globalcomponents/SocketCard';
let sockets = [
    {   id: '1',
        title: 'Appliance Connected',
        message: 'A new applicance is connected to a socket in the kitchen. Please specify what appliance this is.',
        // buttonIcon: 'schedule',
        // buttonText: 'schedule',
    },
];
*/

const styles = theme => ({
	root: {
		// backgroundColor: 'red',
	},
    badge: {
		fontSize: '1.4vh',
		width: '2.0vh',
		height: '2.0vh',
		top: '-0.8vh',
		right: '-0.8vh',
	},
    badgeIcon: {
		fontSize: '3vh', 
		color:'white',
	},
	dialogContainer: {
		backgroundColor: 'transparent',
		boxShadow: 'none',
		overflow: 'hidden',
		color: 'white',
		textAlign: 'center',
	},
	dialogTitle: {
		textAlign: 'center',
		color: 'white',
	},
});


class NotificationsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
			openNotificationsPopup: false,
			notificationsCount: 0,
        };
    }
	
	getNotificationsCount = (notifications) => {
		var newNotificationsCount = 0;
		Object.keys(notifications).forEach((key) => {
			if (notifications[key].visible) {
				newNotificationsCount += 1;
			}
		});
		this.setState({ notificationsCount: newNotificationsCount });
	}

	handleNotificationsPopupOpen = () => {
		this.setState({ openNotificationsPopup: true });
	};

	handleNotificationsPopupClose = () => {
		this.setState({ openNotificationsPopup: false });
	};
	
	componentWillMount(){
		this.getNotificationsCount(this.props.notifications.byId);
	}
	
	componentWillReceiveProps(nextProps) {
		this.getNotificationsCount(nextProps.notifications.byId);
		
		if(this.state.notificationsCount <= 0) {//close popup if all cards are dismissed
			this.handleNotificationsPopupClose();
		}
	}

    render() {
		const { classes, notifications } = this.props;

        return (
            <div className={ classes.root }>
				{ this.state.notificationsCount > 0 && 
					<div>
						<div className='notificationsIcon' onClick={ this.handleNotificationsPopupOpen }>
							<IconButton>
								<Badge classes={{ badge: classes.badge }} badgeContent={ this.state.notificationsCount } color="secondary">
									<Icon className={ classes.badgeIcon }>notifications</Icon>
								</Badge>
							</IconButton>
						</div>

						<Dialog
							open={ this.state.openNotificationsPopup }
							onClose={ this.handleNotificationsPopupClose }
							scroll='body'
							classes={{
								paper: classes.dialogContainer + ' reduceDialogMarginMobile'
							}}
						>
							<Typography variant="headline" className={classes.dialogTitle} gutterBottom>
								Notifications
							</Typography>
															
							<CSSTransitionGroup
								transitionName='cardAnimation'
								transitionAppear={ true }
								transitionAppearTimeout={ 500 }
								transitionEnterTimeout={ 350 }
								transitionLeaveTimeout={ 350 }
							>
								
								{ Object.keys(notifications.byId).map((id) => {
										let card = notifications.byId[id];
										// let lastMessage = messageArray[messageArray.length - 1];

										return card.visible ?
											<CardContainer
												key={ id }
												id={ id }
												title={ card.title }
												buttonIcon={ card.buttonIcon }
												buttonText={ card.buttonText }
												bordered={ card.bordered }
												// onDismissCard={this.dismissCard}
											>
												{ card.message }
											</CardContainer> : null
									}
								) }
								{ /* (Object.keys(notifications.byId).length === 0) && <div>asdfasdfasdf</div> */ }
							</CSSTransitionGroup>
							
							{/*<div className={ classes.cardContainer }>
								{ sockets.map(data => {
									return (
										<SocketCard
											key={ data.id }
											title={ data.title }
										>
											{ data.message }
										</SocketCard>
									);
								})}
							</div>*/}
						</Dialog>
					</div>
				}
            </div>
        );
    }
}

export default withTheme() (withStyles(styles)(NotificationsDialog));