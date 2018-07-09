import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import ImageCircle from '../ImageCircle';

// local import
// import Home from './home/Home';
import { HomeContainer } from '../containers/HomeContainer';
import { AppSettingsContainer } from '../containers/AppSettingsContainer';
import Controls from './controls/Controls';
import Reports from './reports/Reports';
// import Settings from './settings/AppSettings';

import '../index.css';

const styles = theme => ({
    root: {
        // backgroundColor: 'blue',
    },
    desktopNav: {
        position: 'fixed',
        display: 'flex',
        height: '100%',
		width: '200px',
        backgroundColor: theme.palette.primary.main,
    },
    desktopNavList: {
        alignSelf: 'center',
    },
    desktopNavListItem: {
		width: '200px',
        paddingTop: '20px',
		paddingBottom: '20px',
    },
	desktopNavListItemContent: {
		color: 'white',
	},
    mobileNav: {
        position: 'fixed',
        bottom: 0,
        zIndex: 50,
        width: '100%',
        boxShadow: '0px -3px 3px 0px rgba(0,0,0,0.10)',
		backgroundColor: grey[100],
    },
    mobileNavItem: {
        minWidth: '60px',
    },
    checked: {
		backgroundColor: 'rgba(255,255,255,0.3) !important',
    },
});


class MainNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            selectedValue: 0,
			addContentNavMargin: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        // console.log(value);
    };

    handleClick = (id, event) => {
        this.setState({
            //id: !this.state.selectedValue,
            value: id,
        });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <div className='hidden-md hidden-sm hidden-xs'>
                    <div className={ classes.desktopNav }>
                        <List component='nav' className={ classes.desktopNavList }>
                            <ListItem className={classes.desktopNavListItem + " " + (value === 0 ? classes.checked : '')} button onClick={ () => this.handleClick(0) }>
                                <ListItemIcon>
                                    <Icon className={ classes.desktopNavListItemContent }>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Home' classes={{ primary: classes.desktopNavListItemContent }} />
                            </ListItem>
                            <ListItem className={classes.desktopNavListItem + " " + (value === 1 ? classes.checked : '')} button onClick={ () => this.handleClick(1) }>
                                <ListItemIcon>
                                    <Icon className={ classes.desktopNavListItemContent }>tune</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Controls' classes={{ primary: classes.desktopNavListItemContent }} />
                            </ListItem>
                            <ListItem className={classes.desktopNavListItem + " " + (value === 2 ? classes.checked : '')} button onClick={ () => this.handleClick(2) }>
                                <ListItemIcon>
                                    <Icon className={ classes.desktopNavListItemContent }>assessment</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Reports' classes={{ primary: classes.desktopNavListItemContent }} />
                            </ListItem>
                            <ListItem className={classes.desktopNavListItem + " " + (value === 3 ? classes.checked : '')} button onClick={ () => this.handleClick(3) }>
                                <ListItemIcon>
                                    <Icon className={ classes.desktopNavListItemContent }>settings</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Settings' classes={{ primary: classes.desktopNavListItemContent }} />
                            </ListItem>
                        </List>
                    </div>
                </div>

                <div className='hidden-lg'>
                    <BottomNavigation value={ value } onChange={ this.handleChange } className={ classes.mobileNav } showLabels>
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Home' icon={ <Icon>home</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Controls' icon={ <Icon>tune</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Reports' icon={ <Icon>assessment</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Settings' icon={ <Icon>settings</Icon> } />
                    </BottomNavigation>
                </div>
				
				<div className={ 'wrapper' }>
					<div className={ 'col-md-5 headerBg' }>
						<ImageCircle />
					</div>
					
					<div className={ 'col-md-7 content' }>
						{/*{ value === 0 && <CardContainer /> }*/}
						{ value === 0 && <HomeContainer /> }
						{ value === 1 && <Controls /> }
						{ value === 2 && <Reports /> }
						{ value === 3 && <AppSettingsContainer /> }
						{/*{ value === 3 && <Settings /> }*/}
						{/*<div className={ this.state.addContentNavMargin ? classes.contentNavMargin : '' }>
							{ value === 0 && <Home/> }
							{ value === 1 && <Controls /> }
							{ value === 2 && <Reports /> }
							{ value === 3 && <Settings /> }
						</div>*/}
					</div>
				</div>
            </div>
        );
    }
}

MainNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    //checked: PropTypes.bool.isRequired
};

export default withStyles(styles)(MainNavigation);