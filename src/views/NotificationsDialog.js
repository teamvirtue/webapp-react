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
    /*notificationsIcon: {
        position: 'fixed',
        top: 15,
        left: 125,
        zIndex: 2,
    },*/
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
    /*notification: {
        outline: '2px dashed #f15b27',
        backgroundColor: '#f15b27',
        padding:10,
        width: '100%',
        margin: '0 auto 10px auto',
        color: 'white',
    },*/
});

class NotificationsDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
			openNotificationsPopup: false,
        };
    }

	handleNotificationsPopupOpen = () => {
		this.setState({ openNotificationsPopup: true });
	};

	handleNotificationsPopupClose = () => {
		this.setState({ openNotificationsPopup: false });
	};

    render() {
		const { classes, advices } = this.props;

		var advicesCount = 0;
		Object.keys(advices.byId).forEach(function(key) {
			if (advices.byId[key].visible) {
				advicesCount += 1;
			}
		});

        return (
            <div className={ classes.root }>
				{ advicesCount > 0 && 
					<div>
						<div className='notificationsIcon' onClick={ this.handleNotificationsPopupOpen }>
							<IconButton>
								<Badge badgeContent={ advicesCount } color="secondary">
									<Icon style={{ color:'white' }}>notifications</Icon>
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
							
							{ /* <div className = {classes.notification}>This is the 1st demo release of the VIRTUe LINQ app</div> */ }
								
							<CSSTransitionGroup
								transitionName='cardAnimation'
								transitionAppear={ true }
								transitionAppearTimeout={ 500 }
								transitionEnterTimeout={ 350 }
								transitionLeaveTimeout={ 350 }
							>
								
								{ Object.keys(advices.byId).map((id) => {
										let card = advices.byId[id];
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
								{ (Object.keys(advices.byId).length === 0) && <div>asdfasdfasdf</div> }
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