import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText, ListItemIcon } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  // withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import orange from 'material-ui/colors/orange';

import accountPicture1 from '../../../assets/accounts/1.jpg';
import accountPicture2 from '../../../assets/accounts/2.jpg';
import accountPicture3 from '../../../assets/accounts/3.jpg';

const styles = {
	avatar: {
		backgroundColor: orange[100],
		color: orange[600],
	},
};

let accountNames = [
    { id:'2', value: 'Manar Bishara', imgName: accountPicture2 },
    { id:'3', value: 'Sara Abadi', imgName: accountPicture3 },
];

class UserDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
			openNamePopup: false,
			currentAccountName: "Gregory Abadi",
        };
    }
	
    handleNameChangeSubmit = event => {
		event.preventDefault();
        this.setState({ currentAccountName: this.newAccountName.value });
    };
	
	handleNamePopupOpen = () => {
		this.setState({ openNamePopup: true });
	};

	handleNamePopupClose = () => {
		this.setState({ openNamePopup: false });
	};

    render() {
		const { classes } = this.props;

        return (
            <div> {/*TODO: reduce unnamed divs*/}
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
										<Avatar 
										  alt={this.state.currentAccountName}
										  src={accountPicture1}
										  className={classes.avatar}
										/>
									</ListItemAvatar>
									<ListItemText>
										<TextField
											defaultValue={this.state.currentAccountName}
											margin="dense"
											id="newAccountName"
											label="Your name"
											type="text"
											inputRef={(element) => { this.newAccountName = element }}
											fullWidth
										/>
									</ListItemText>
								</ListItem>
							</List>
							
							<Typography variant="title" gutterBottom>
								Other family members
							</Typography>
							<List>
								{accountNames.map(data => (
									<ListItem button key={data.value}>
										<ListItemAvatar>
											<Avatar 
											  alt={data.value}
											  src={data.imgName}
											  className={classes.avatar}
											/>
										</ListItemAvatar>
										<ListItemText primary={data.value} />
									</ListItem>
								))}
								<ListItem button>
									<ListItemAvatar>
										<Avatar>
											<Icon>add</Icon>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="Add account" onClick={()=>{ alert('Not supported yet'); }} />
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