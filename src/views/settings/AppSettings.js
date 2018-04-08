import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Slider from 'rc-slider';
import Switch from 'material-ui/Switch';
import Menu, { MenuItem } from 'material-ui/Menu';
import { TimePicker, DatePicker } from 'material-ui-pickers';
// import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';

import './AppSettings.css';
import ImageCircle from '../ImageCircle';
import settingsImage from '../../assets/settings.svg';

const options = [];

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

const styles = {
    root: {
        backgroundColor: 'firebrick',
    },
};

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
            selectedDate: new Date(),
            selectedTime: new Date(),
            selectedDateTime: new Date(),

            checkedNightMode: false,
            checkedVibrate: true,
            checkedDesktopNotifications: false,

            anchorEl: null,
            selectedIndex: 2,
        };
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleTimeChange = time => {
        this.setState({ selectedTime: time });
    };

    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    render() {
        // const { classes } = this.props;
		const { classes, theme } = this.props;
        const { selectedDate, selectedTime } = this.state;
        const { anchorEl } = this.state;

        return (
            <div> {/*className={classes.root}*/}
                <Typography variant="headline" gutterBottom className='pageTitle'>
                    Settings
                </Typography>

                <ImageCircle imageSource={ settingsImage }/>

                <div className='panelView'>
                    {/*<div className='settingsContainer'>
                        <SelectItem />
                    </div>*/}

                    <div className='settingsContainer'> {/*TODO: remove settings/reportsContainer?*/}
                        <h1 style={{ textAlign: 'center' }}>Jane Doe</h1> {/*// TODO: make editable*/}

                        <Typography className='settingsTitle' type='subheading'>
                            Profile
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>cake</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Birthdate' />

                                <DatePicker className='datePicker'
                                            //keyboard
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
                                        checked={ this.state.checkedNightMode }
                                        onChange={ this.handleChange('checkedNightMode') }
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText inset primary='Start' />

                                <TimePicker
                                    value={ selectedTime }
                                    onChange={ this.handleTimeChange }
                                />
                            </ListItem>
                            <ListItem> {/*TODO: make separate components*/}
                                <ListItemText inset primary='End' />

                                <TimePicker
                                    value={ selectedTime }
                                    onChange={ this.handleTimeChange }
                                />
                            </ListItem>

                            <ListMenu label='food-preferences' title='Food preferences' options={ optionsFood } icon='restaurant'/>
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

                            <ListMenu label='night mode' title='Turn on automatically' options={ optionsNightmode } />
                            {/*<ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='nightmode-menu'
                                aria-label='Night mode'
                                onClick={ this.handleClickListItem }
                            >

                                <ListItemText
                                    inset
                                    primary='Turn on automatically'
                                    secondary={ optionsNightmode[this.state.selectedIndex] }
                                />
                            </ListItem>
                            <Menu
                                id='nightmode-menu'
                                anchorEl={ anchorEl }
                                open={ Boolean(anchorEl) }
                                onClose={ this.handleClose }
                            >
                                { optionsNightmode.map((option, index) => (
                                    <MenuItem
                                        key={ option }
                                        selected={ index === this.state.selectedIndex }
                                        onClick={ event => this.handleMenuItemClick(event, index) }
                                    >
                                        { option }
                                    </MenuItem>
                                )) }
                            </Menu>*/}
                        </List>

                        <Divider />

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
                                aria-controls='ringtone-menu'
                                aria-label='Phone ringtone'
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

                                <ListItemText primary='Sign out' secondary='Signed in as Jane Doe. Apartment building 10AV LINQ Dubai' />
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

export default withTheme() (withStyles(styles)(Settings));