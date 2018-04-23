import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import orange from 'material-ui/colors/orange';

const styles = theme => ({
	avatar: {
		backgroundColor: orange[100],
		color: orange[600],
	},
});

const accountNames = ['Manar Bishara', 'Sara Abadi'];


class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
			openNamePopup: false,
			currentAccountName: "Gregory Abadi",
        };
		this.handleNameChangeSubmit = this.handleNameChangeSubmit.bind(this);
    }
	
    handleNameChangeSubmit = event => {
		event.preventDefault();
        this.setState({ currentAccountName: this.refs.cqurrentAccountName.value });
    };
	
	handleNamePopupOpen = () => {
		this.setState({ openNamePopup: true });
	};

	handleNamePopupClose = () => {
		this.setState({ openNamePopup: false });
	};

    render() {
		const { classes, theme } = this.props;

        return (
            <div>
				<ListItem
					button
					onClick={this.handleNamePopupOpen}
				>
					<ListItemIcon>
						<Icon>perm_identity</Icon>
					</ListItemIcon>

					<ListItemText primary='Your Account' secondary={this.state.currentAccountName} />
				</ListItem>
				<Dialog
					open={this.state.openNamePopup}
					onClose={this.handleNamePopupClose}
				>
					<form onSubmit={this.handleNameChangeSubmit}>
						<DialogContent>
							<Typography variant="title" gutterBottom>
								Your account
							</Typography>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<Icon>person</Icon>
										</Avatar>
									</ListItemAvatar>
									<ListItemText>
										<TextField
											defaultValue={this.state.currentAccountName}
											margin="dense"
											id="name"
											label="Your name"
											type="text"
											ref="cqurrentAccountName"
											fullWidth
										/>
									</ListItemText>
								</ListItem>
							</List>
							
							<Typography variant="title" gutterBottom>
								Other family members
							</Typography>
							<List>
								{accountNames.map(name => (
									<ListItem button onClick={() => this.handleListItemClick(name)} key={name}>
										<ListItemAvatar>
											<Avatar className={classes.avatar}>
												<Icon>person</Icon>
											</Avatar>
										</ListItemAvatar>
										<ListItemText primary={name} />
									</ListItem>
								))}
								<ListItem button>
									<ListItemAvatar>
										<Avatar>
											<Icon>add</Icon>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="Add account" />
								</ListItem>
							</List>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleNamePopupClose} color="secondary">
								Cancel
							</Button>
							<Button type="submit" onClick={this.handleNamePopupClose} color="primary">
								Save
							</Button>
						</DialogActions>
					</form>
				</Dialog>
            </div>
        );
    }
}

export default withTheme() (withStyles(styles)(UserDialog));