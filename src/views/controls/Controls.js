import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import 'rc-slider/assets/index.css';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Icon from 'material-ui/Icon';

import './Controls.css';
import ImageCircle from '../ImageCircle';
import myLinqImage from '../../assets/controls.svg';

class Control extends Component {
    // componentDidMount() {    }

    state = {
        checkedOnOff: false,
        checkedNightMode: true,
    };

    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    render() {
        return (
            <div>
                <Typography className='pageTitle' type='button'>
                    Controls
                </Typography>

                <ImageCircle imageSource={ myLinqImage }/>

                <div className='panelView'>
                    {/*<div className='controlsCircle' />*/}

                    <div className='controlsContainer'>
                        <List>
                            <Typography className='controlsTitle' type='subheading'>
                                Lights
                            </Typography>

                            <ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='lorem-ipsum'
                                aria-label='Lorem ipsum'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>lightbulb_outline</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Dim' secondary='[slider]' />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>power_settings_new</Icon>
                                </ListItemIcon>

                                <ListItemText primary='On/off' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={this.state.checkedOnOff}
                                        onChange={this.handleChange('checkedOnOff')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
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
                            <ListItem
                                button
                                divider
                                aria-haspopup='true'
                                aria-controls='lorem-ipsum'
                                aria-label='Lorem ipsum'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>color_lens</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Colors' secondary='Choose colors of your lights' />
                            </ListItem>

                            <Typography className='controlsTitle' type='subheading'>
                                Appliances
                            </Typography>

                            <ListItem>
                                <ListItemIcon>
                                    <Icon>info</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Lorem ipsum' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={this.state.checkedOnOff}
                                        onChange={this.handleChange('checkedOnOff')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='lorem-ipsum'
                                aria-label='Lorem ipsum'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>info</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Lorem ipsum' secondary='Lorem ipsum' />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Control);