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

const styles = {
	avatar: {
		backgroundColor: orange[100],
		color: orange[600],
	},
};

/*let accountNames = [
    { id:'2', value: 'Manar Bishara', imgName: accountPicture2 },
    { id:'3', value: 'Sara Abadi', imgName: accountPicture3 },
];*/

class UserDialog extends Component {
    constructor(props) {
        super(props);

        const user = this.props.accounts.currentUser;

        this.state = {
			openNamePopup: false,
            currentAccountName: this.props.accounts.byId[user].name,
			// currentAccountName: this.props.accounts.currentUser,
			// currentAccountName: this.props.user,
        };
    }
	
    handleSubmit = (event, id) => {
        console.log(this.newAccountName.value);
		event.preventDefault();
        this.setState({ currentAccountName: this.newAccountName.value });
        this.props.dispatch(this.newAccountName.value, id);
    };

	handleNamePopupOpen = () => {
		this.setState({ openNamePopup: true });
	};

	handleNamePopupClose = () => {
		this.setState({ openNamePopup: false });
	};

    render() {
		const { classes, accounts } = this.props;
		// const { classes, user, family } = this.props;
        let family = accounts.allIds.slice();
        let index = family.indexOf(String(accounts.currentUser));

        if (index > -1) {
            family.splice(index, 1);
        }
		console.log(family, accounts);

        return (
            <div> {/*TODO: reduce unnamed divs*/}
				<ListItem
					button
					onClick={ this.handleNamePopupOpen }
				>
					<ListItemIcon>
						<Icon>perm_identity</Icon>
					</ListItemIcon>

					<ListItemText primary='Your Account' secondary={ this.state.currentAccountName } />
				</ListItem>
				<Dialog
					open={ this.state.openNamePopup }
					onClose={ this.handleNamePopupClose }
				>
					<form onSubmit={ (event) => this.handleSubmit(event, accounts.currentUser) }>
						<DialogContent>
							<Typography variant='title' gutterBottom>
								Your account
							</Typography>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Avatar 
										  alt={ this.state.currentAccountName }
										  // src={ accountPicture1 }
										  className={ classes.avatar }
										/>
									</ListItemAvatar>
									<ListItemText>
										<TextField
											defaultValue={ this.state.currentAccountName }
											margin='dense'
											id='newAccountName'
											label='Your name'
											type='text'
											inputRef={ (element) => { this.newAccountName = element }}
											fullWidth
										/>
									</ListItemText>
								</ListItem>
							</List>
							
							<Typography variant='title' gutterBottom>
								Other family members
							</Typography>
							<List>
                                { family.map(id => {
                                    let member = accounts.byId[id];

                                    return (
                                        <ListItem button key={ id }>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={ member.name }
                                                    src={ member.imgName }
                                                    className={ classes.avatar }
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={ member.name } />
                                        </ListItem>
                                    );
                                })}
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Icon>add</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary='Add account' onClick={()=>{ alert('Not supported yet'); }} />
                                </ListItem>
								{/*{ accountNames.map(data => (
									<ListItem button key={ data.value }>
										<ListItemAvatar>
											<Avatar 
											  alt={ data.value }
											  src={ data.imgName }
											  className={ classes.avatar }
											/>
										</ListItemAvatar>
										<ListItemText primary={ data.value } />
									</ListItem>
								)) }
								<ListItem button>
									<ListItemAvatar>
										<Avatar>
											<Icon>add</Icon>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary='Add account' onClick={()=>{ alert('Not supported yet'); }} />
								</ListItem>*/}
							</List>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleNamePopupClose} color='secondary'>
								Cancel
							</Button>
							<Button type='submit' onClick={this.handleNamePopupClose} color='primary'>
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