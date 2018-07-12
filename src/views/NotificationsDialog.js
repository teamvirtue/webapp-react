import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import orange from '@material-ui/core/colors/orange';

import { CSSTransitionGroup } from 'react-transition-group';
import '../animations.css';
import { CardContainer } from '../containers/CardContainer';

const styles = theme => ({
	notificationsContainer: {
		position: 'absolute',
		top: 15,
		right: 15,
		zIndex: 1,
	},
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

        return (
            <div>
				<div className={ classes.notificationsContainer } onClick={ this.handleNotificationsPopupOpen }>
					<Badge badgeContent={4} color="secondary">
						<Icon color="secondary">notifications</Icon>
					</Badge>
				</div>

				<Dialog
					open={ this.state.openNotificationsPopup }
					onClose={ this.handleNotificationsPopupClose }
					scroll='body'
				>
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
										// onDismissCard={this.dismissCard}
									>
										{ card.message }
									</CardContainer> : null
							}
						) }
					</CSSTransitionGroup>
				</Dialog>
            </div>
        );
    }
}

export default withTheme() (withStyles(styles)(NotificationsDialog));