import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from 'rc-slider';
import Switch from '@material-ui/core/Switch';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { TimePicker, DatePicker } from 'material-ui-pickers';
import Icon from '@material-ui/core/Icon';

// Local import
import { UserDialogContainer } from '../../containers/UserDialogContainer';
// import UserDialog from './setting/UserDialog';
// import './AppSettings.css';
import LinqStatus from '../LinqStatus';
import settingsImage from '../../assets/settings.png';

// const options = [];

const optionsFood = [ // TODO: add allergy option as well?
    'Not applicable',
    'Flexitarian',
    'Pescatarian',
    'Vegetarian',
    'Vegan',
];

const optionsNightmode = [
    'Disabled',
    'Automatically enable from sunset to sunrise',
    'Custom time range',
];

const styles = theme => ({
    root: {
        // backgroundColor: theme.palette.primary.main,
    },
    pageTitle: {
        paddingTop: 48,
        paddingBottom: 16,
        textAlign: 'center',
    },
});

class Picker extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(this.props.time),
        };
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { selectedDate } = this.state;

        return (
            <div className='picker'>
                <TimePicker
                    keyboard
                    //label='Masked timepicker'
                    mask={ [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'] }
                    placeholder={ this.props.placeholder }
                    value={ selectedDate }
                    onChange={ this.handleDateChange }
                />
            </div>
        );
    }
}

class ListMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedIndex: 1,
        };
    }

    // button = undefined;

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        // const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div> {/*className={ classes.root }*/}
                <ListItem
                    button
                    aria-haspopup='true'
                    aria-controls='menu'
                    aria-label={ this.props.label }
                    onClick={ this.handleClickListItem }
                >
                    <ListItemIcon>
                        <Icon>{ this.props.icon }</Icon>
                    </ListItemIcon>

                    <ListItemText
                        primary={ this.props.title }
                        secondary={ this.props.options[this.state.selectedIndex] }
                    />
                </ListItem>
                <Menu
                    id='menu'
                    anchorEl={ anchorEl }
                    open={ Boolean(anchorEl) }
                    onClose={ this.handleClose }
                >
                    { this.props.options.map((option, index) => (
                        <MenuItem
                            key={ option }
                            selected={ index === this.state.selectedIndex }
                            onClick={ event => this.handleMenuItemClick(event, index) }
                        >
                            { option }
                        </MenuItem>
                    )) }
                </Menu>
            </div>
        );
    }
}

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date('October 12, 1986 11:13:00'),
            selectedTime: new Date(),
            //selectedDateTime: new Date(),

            checkedSleepCycleMode: true,
            checkedNightMode: true,
            checkedVibrate: false,
            checkedDesktopNotifications: false,

            anchorEl: null,
            selectedIndex: 2,
        };
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
		const { classes, theme, accounts } = this.props;
        const { selectedDate, checkedSleepCycleMode } = this.state;
        // const currentUserId = accounts.byId[accounts.currentUser].id;
        const currentUser = accounts.byId[accounts.currentUser].name;
        // const currentUser = accounts.currentUser;

        return (
            <div className={classes.root}>
                <div>
                    {/*<div className='settingsContainer'>
                        <SelectItem />
                    </div>*/}

                    <div className='settingsContainer'> {/*TODO: remove settings/reportsContainer CSS?*/}
						<div className='d-none d-lg-block'>
							<h1 className={ classes.pageTitle }>{ currentUser }</h1>
						</div>

						<div className='d-lg-none'>
							<h1 style={{ textAlign: 'center' }}>{ currentUser }</h1>
						</div>

                        <Typography className='settingsTitle' type='subheading'>
                            Profile
                        </Typography>

                        <List>
							<UserDialogContainer
                                // user={{ id: currentUserId, name: currentUser }}
                                // family={ accounts.byId }
                                // onSubmit={ (event) => this.handleNameChangeSubmit(event) }
                            />
                            
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>cake</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Birthdate' />

                                <DatePicker className='datePicker'
									keyboard
									format='MMMM Do, YYYY'
									value={ selectedDate }
									onChange={ this.handleDateChange }
									animateYearScrolling={ false }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>timelapse</Icon>
                                </ListItemIcon>

                                <ListItemText
                                    primary='Sleep cycle'
                                    secondary='Allows system to automatically adjust light settings' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={ checkedSleepCycleMode }
                                        onChange={ this.handleChange('checkedSleepCycleMode') }
                                        value='checkedSleepCycleMode'
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>

                            { checkedSleepCycleMode &&
                                <ListItem>
                                    <ListItemText inset primary='Start' />

                                    <Picker time='October 15, 2018 09:00:00' placeholder='09:00 AM'/>
                                    {/*<TimePicker
                                        value={ selectedTime }
                                        onChange={ this.handleTimeChange }
                                    />*/}
                                </ListItem>
                            }
                            { checkedSleepCycleMode &&
                                <ListItem>
                                    <ListItemText inset primary='End' />

                                    <Picker time='October 15, 2018 17:00:00' placeholder='17:00 PM'/>
                                </ListItem>
                            }

                            <ListMenu label='Food preferences' title='Food preferences' options={ optionsFood } icon='restaurant'/>
                        </List>

                        <Divider />

                        <Typography className='settingsTitle' type='subheading'>
                            App Settings
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>brightness_2</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Night mode' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={this.state.checkedNightMode}
                                        onChange={this.handleChange('checkedNightMode')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListMenu label='Night mode' title='Turn on automatically' options={ optionsNightmode } />
                        </List>
						
                        <Divider />

                        {/*<Typography className='settingsTitle' type='subheading'>
                            Clock
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>av_timer</Icon>
                                </ListItemIcon>

                                <ListItemText disableTypography	primary='Clock Budget' secondary={
                                    <Slider
                                        min={ 0 }
                                        defaultValue={ 25 }
                                        trackStyle={{ backgroundColor: theme.palette.primary.main }}
										dotStyle={{ backgroundColor: 'lightgray', borderColor: 'lightgray' }}
										activeDotStyle={{ backgroundColor: theme.palette.primary.main, borderColor: theme.palette.primary.main }}
                                        handleStyle={{
                                            borderColor: theme.palette.primary.main,
                                            backgroundColor: theme.palette.primary.main,
                                        }}
										marks = {{
											0: '€1',
											25: '€5',
											50: '€10',
											75: '€15',
											100: '€20',
										}}
                                        railStyle={{ backgroundColor: 'lightgray' }}
                                    />
                                }
                                />

                            </ListItem>
						</List>

                        <Divider />*/}

                        <Typography className='settingsTitle' type='subheading'>
                            Notifications
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>volume_up</Icon>
                                </ListItemIcon>

                                <ListItemText disableTypography	primary='Volume' secondary={
                                    <Slider
                                        min={ 0 }
                                        max={ 20 }
                                        defaultValue={ 5 }
                                        trackStyle={{ backgroundColor: theme.palette.primary.main }}
                                        handleStyle={{
                                            borderColor: theme.palette.primary.main,
                                            backgroundColor: theme.palette.primary.main,
                                        }}
                                        railStyle={{ backgroundColor: 'lightgray' }}
                                    />
                                }
                                />

                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>vibration</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Vibrate' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={ this.state.checkedVibrate }
                                        onChange={ this.handleChange('checkedVibrate') }
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>desktop_windows</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Desktop notifications' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={ this.state.checkedDesktopNotifications }
                                        onChange={ this.handleChange('checkedDesktopNotifications') }
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='menu'
                                aria-label='Notification types'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>notifications</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Notifications types' secondary='Choose what you want to be notified of' />
                            </ListItem>
                        </List>

                        <Divider />

                        <Typography className='settingsTitle' type='subheading'>
                            Account
                        </Typography>

                        <List>
                            <ListItem
                                button
                                // divider
                                aria-haspopup='true'
                                aria-controls='ringtone-menu'
                                aria-label='Phone ringtone'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Sign out' secondary='Signed in as Jane Doe. Apartment building 70 LINQ Eindhoven' />
                            </ListItem>
                        </List>

                        <Divider />

                        <Typography className='settingsTitle' type='subheading'>
                            About
                        </Typography>

                        {/*TODO: add licences and dependencies*/}

                        <List>
                            <ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='ringtone-menu'
                                aria-label='Phone ringtone'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemText primary='App version' secondary='v0.1.0' />
                            </ListItem>

                            <ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='ringtone-menu'
                                aria-label='Phone ringtone'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemText primary='Open-source licences' secondary='Licence details for open-source software' />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

ListMenu.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};

/*Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};*/

export default withTheme()(withStyles(styles)(Settings));