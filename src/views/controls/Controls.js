import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import Typography from 'material-ui/Typography';
import 'rc-slider/assets/index.css';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Switch from 'material-ui/Switch';
import Slider from 'rc-slider';
import Icon from 'material-ui/Icon';
import grey from 'material-ui/colors/grey';

//import './Controls.css';
import ImageCircle from '../ImageCircle';
import myLinqImage from '../../assets/controls.svg';

const styles = theme => ({
    root: {
        marginBottom: 100,
        //textAlign: 'left',
    },
    pageTitle: {
        //textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 16,
    },
    controlsTitle: {
        paddingTop: 16,
        paddingLeft: 16,
    },
	roomsBarContainer: {
		boxShadow: 'none',
	},
	roomsBarTab: {
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: grey[200],
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 5,
		minWidth: 120,
	},
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};


class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedLightOnOff: false,
            checkedNightMode: true,
            checkedTemperature: true,
			activeTab: 0,
        };
    }

    setActiveTab = (event, activeTab) => {
        this.setState({ activeTab });
    };
	
	setActiveTabIndex = index => {
		this.setState({ activeTab: index });
	};
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={ classes.root }>
                <Typography className={ classes.pageTitle } type='button'>
                    Controls
                </Typography>

                <ImageCircle imageSource={ myLinqImage }/>

                <div className='panelView'>
                    <div className='row'>	
						<div className='col-xs-12'>

							<AppBar position="static" color="inherit" classes={{
									root: classes.roomsBarContainer,
								}}
							>
								<Tabs
									value={this.state.activeTab}
									onChange={this.setActiveTab}
									indicatorColor="primary"
									textColor="primary"
									scrollable
									scrollButtons="auto"
									centered
								>
									<Tab icon={<Icon>home</Icon>} label="Living room" classes={{
											root: classes.roomsBarTab,
										}} 
									/>
									<Tab icon={<Icon>home</Icon>} label="Kitchen" classes={{
											root: classes.roomsBarTab,
										}} 
									/>
									<Tab icon={<Icon>home</Icon>} label="Bedroom" classes={{
											root: classes.roomsBarTab,
										}} 
									/>
									<Tab icon={<Icon>home</Icon>} label="Bathroom" classes={{
											root: classes.roomsBarTab,
										}} 
									/>
									<Tab icon={<Icon>home</Icon>} label="Hallway" classes={{
											root: classes.roomsBarTab,
										}} 
									/>
								</Tabs>
							</AppBar>
							<SwipeableViews enableMouseEvents
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={this.state.activeTab}
								onChangeIndex={this.setActiveTabIndex}
							>
								<TabContainer dir={theme.direction}>
								
									<List>
										<Typography className={ classes.controlsTitle } type='subheading'>
											Lights
										</Typography>
										
										<ListItem>
											<ListItemIcon>
												<Icon>power_settings_new</Icon>
											</ListItemIcon>

											<ListItemText primary='Power' />

											<ListItemSecondaryAction>
												<Switch
													checked={ this.state.checkedLightOnOff }
													onChange={ this.handleChange('checkedLightOnOff') }
												/>
											</ListItemSecondaryAction>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<Icon>lightbulb_outline</Icon>
											</ListItemIcon>

											<ListItemText primary='Brightness' secondary={
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

										<Typography className={ classes.controlsTitle } type='subheading'>
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

											<ListItemText primary='Set temperature' secondary='14 degrees' /> {/*TODO: insert pop-up menu*/}
										</ListItem>

										<Typography className={ classes.controlsTitle } type='subheading'>
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
								
								</TabContainer>
								<TabContainer dir={theme.direction}>Item Two</TabContainer>
								<TabContainer dir={theme.direction}>Item Three</TabContainer>
								<TabContainer dir={theme.direction}>Item Four</TabContainer>
								<TabContainer dir={theme.direction}>Item Five</TabContainer>
							</SwipeableViews>
						
						</div>
                    </div>
                </div>
            </div>
        );
    }
}

Controls.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Controls));