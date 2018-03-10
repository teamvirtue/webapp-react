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
import Slider from 'rc-slider';
import Icon from 'material-ui/Icon';

import './Controls.css';
import ImageCircle from '../ImageCircle';
import myLinqImage from '../../assets/controls.svg';

class Control extends Component {
    // componentDidMount() {    }

    state = {
        checkedLightOnOff: false,
        checkedNightMode: true,
        checkedTemperature: true,
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

                    <div className='controlsContainer'>
                        <List>
                            <Typography className='controlsTitle' type='subheading'>
                                Lights
                            </Typography>

                            <ListItem>
                                <ListItemIcon>
                                    <Icon>power_settings_new</Icon>
                                </ListItemIcon>

                                <ListItemText primary='On/off' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={this.state.checkedLightOnOff}
                                        onChange={this.handleChange('checkedLightOnOff')}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>lightbulb_outline</Icon>
                                </ListItemIcon>

                                <ListItemText disableTypography primary='Brightness' secondary={
                                    <Slider
                                        min={ 0 }
                                        max={ 20 }
                                        defaultValue={ 5 }
                                        trackStyle={{ backgroundColor: '#f15b27' }}
                                        handleStyle={{
                                            borderColor: '#f15b27',
                                            backgroundColor: '#f15b27',
                                        }}
                                        railStyle={{ backgroundColor: 'lightgray' }}
                                    />
                                }
                                />

                            </ListItem>
                            <ListItem
                                button
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
                            <ListItem divider>
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
                            {/*<ListItem
                                button
                                aria-haspopup='true'
                                aria-controls='lorem-ipsum'
                                aria-label='Lorem ipsum'
                                // onClick={this.handleClickListItem}
                            >
                                <ListItemIcon>
                                    <Icon>lightbulb_outline</Icon>
                                </ListItemIcon>

                                <ListItemText disableTypography primary='Volume' secondary='Lorem ipsum'/>
                            </ListItem>*/}

                            <Typography className='controlsTitle' type='subheading'>
                                Temperature
                            </Typography>

                            <ListItem button onClick={ this.handleChange('checkedTemperature') } > {/*TODO: fix click*/}
                                <ListItemIcon>
                                    <Icon>ac_unit</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Air conditioning' />

                                <ListItemSecondaryAction>
                                    <Switch
                                        checked={ this.state.checkedTemperature }
                                        onChange={ this.handleChange('checkedTemperature') }
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem
                                button
                                divider
                                /*aria-haspopup='true'
                                aria-controls='set-temperature'
                                aria-label='Set temperature'*/
                            >
                                <ListItemIcon>
                                    <Icon>touch_app</Icon>
                                </ListItemIcon>

                                <ListItemText primary='Set temperature' secondary='Lorem ipsum' />
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
                                        checked={this.state.checkedTemperature}
                                        onChange={this.handleChange('checkedTemperature')}
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