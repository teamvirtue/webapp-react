import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import LinqStatus from '../globalcomponents/LinqStatus';

// local import
// import Home from './home/Home';
import { HomeContainer } from '../containers/HomeContainer';
import { AppSettingsContainer } from '../containers/AppSettingsContainer';
// import Settings from './settings/AppSettings';
import Controls from './controls/Controls';
import Reports from './reports/Reports';
import { NotificationsDialogContainer } from '../containers/NotificationsDialogContainer';

import '../index.css';
import logo from '../assets/linq_logo_white.png';
import dubaiSkyline from '../assets/dubai-skyline.svg';

const styles = theme => ({
    root: {
        // backgroundColor: 'blue',
    },
	logo: {
		margin: '23px 27px',
		'&:hover': {
			cursor: 'pointer',
		}
	},
    desktopNav: {
        position: 'fixed',
        display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
        height: '100%',
		width: '200px',
		marginLeft: '-15px',
        backgroundColor: theme.palette.primary.main,
    },
    desktopNavList: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
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
		marginLeft: '-15px',
        zIndex: 50,
        width: '100%',
        boxShadow: '0px -3px 3px 0px rgba(0,0,0,0.10)',
		backgroundColor: 'white',
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
            value: 'home',
            selectedValue: 0,
			addContentNavMargin: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
        // console.log(value);
    };

    handleClick = (name, event) => {
        this.setState({
            //id: !this.state.selectedValue,
            value: name,
        });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <div className='d-none d-lg-block'>
                    <div className={ classes.desktopNav }>
						<img className={ classes.logo } src={logo} width="80" button onClick={ () => this.handleClick('home') } />
						<div className={ classes.desktopNavList }>
							<List component='nav'>
								<ListItem className={classes.desktopNavListItem + " " + (value === 'home' ? classes.checked : '')} button onClick={ () => this.handleClick('home') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>home</Icon>
									</ListItemIcon>
									<ListItemText primary='Home' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={classes.desktopNavListItem + " " + (value === 'controls' ? classes.checked : '')} button onClick={ () => this.handleClick('controls') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>tune</Icon>
									</ListItemIcon>
									<ListItemText primary='Controls' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={classes.desktopNavListItem + " " + (value === 'reports' ? classes.checked : '')} button onClick={ () => this.handleClick('reports') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>assessment</Icon>
									</ListItemIcon>
									<ListItemText primary='Reports' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={classes.desktopNavListItem + " " + (value === 'settings' ? classes.checked : '')} button onClick={ () => this.handleClick('settings') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>settings</Icon>
									</ListItemIcon>
									<ListItemText primary='Settings' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
							</List>
						</div>
                    </div>
                </div>
				
				<NotificationsDialogContainer />
				
				<div className={ 'wrapper ' + value }> { /*  + ' ' + (value === 'home' && 'blabla') */ }
					<div className={ 'row' }>
						<div className={ 'col-lg-5 headerBg' }>
							<div className='d-lg-none dubaiBg' style={ { backgroundImage: "url("+dubaiSkyline+")" } }></div>
							<LinqStatus />
						</div>
						
						<div className={ 'col-lg-7' }>
							{/*{ value === 0 && <CardContainer /> }*/}
							{ value === 'home' && <HomeContainer /> }
							{ value === 'controls' && <Controls /> }
							{ value === 'reports' && <Reports /> }
							{ value === 'settings' && <AppSettingsContainer /> }
							{/*{ value === 3 && <Settings /> }*/}
							{/*<div className={ this.state.addContentNavMargin ? classes.contentNavMargin : '' }>
								{ value === 'home' && <Home/> }
								{ value === 'controls' && <Controls /> }
								{ value === 'reports' && <Reports /> }
								{ value === 'settings' && <Settings /> }
							</div>*/}
						</div>
					</div>
				</div>

                <div className='d-lg-none'>
                    <BottomNavigation value={ value } onChange={ this.handleChange } className={ classes.mobileNav } showLabels>
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Home' value='home' icon={ <Icon>home</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Controls' value='controls' icon={ <Icon>tune</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Reports' value='reports' icon={ <Icon>assessment</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Settings' value='settings' icon={ <Icon>settings</Icon> } />
                    </BottomNavigation>
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