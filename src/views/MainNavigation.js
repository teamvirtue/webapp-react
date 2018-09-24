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

// local import
import { HomeContainer } from '../containers/HomeContainer';
import { AppSettingsContainer } from '../containers/AppSettingsContainer';
import { SustainabilityStatusCircleContainer } from '../containers/SustainabilityStatusCircleContainer';
// import Settings from './settings/AppSettings';
import Rooms from './rooms/Rooms';
import { NotificationsDialogContainer } from '../containers/NotificationsDialogContainer';

import '../index.css';
import logo from '../assets/linq_logo_white.png';
//import dubaiSkyline from '../assets/dubai-skyline.svg';

const styles = theme => ({
    root: {
        position: 'relative',
    },
	logo: {
		position: 'absolute',
		left: 0,
		margin: '23px 20px',
		zIndex: 1,
		'&:hover': {
			cursor: 'pointer',
		}
	},
	homeHeaderTitle: {
		position: 'absolute',
		color: 'white',
		marginTop: 20,
		zIndex: 1,
		width: '100%',
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
			greeting: 'day',
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
		if(value!==this.state.value){
			this.props.updateSustainabilityStatus('mylinq');
		}
    };

    handleClick = (name, event) => {
        this.setState({ value: name });
		if(name!==this.state.value){
			this.props.updateSustainabilityStatus('mylinq');
		}
    };
	
	getGreeting(){
		const hour = new Date().getHours();

		if (hour >= 0 && hour < 6) {
			this.setState({ greeting: 'night' })
		} else if (hour >= 6 && hour < 12) {
			this.setState({ greeting: 'morning' })
		} else if (hour >= 12 && hour < 17) {
			this.setState({ greeting: 'afternoon' })
		} else if (hour >= 17 && hour < 24) {
			this.setState({ greeting: 'evening' })
		}
	};

	componentDidMount() {
		this.getGreeting();
		setInterval(() => {
			this.getGreeting()
		}, 600000);//every 10 minutes
	};

    render() {
        const { classes, settings } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <div className='d-none d-lg-block'>
                    <div className={ classes.desktopNav }>
						<div className={ classes.desktopNavList }>
							<List component='nav'>
								<ListItem className={classes.desktopNavListItem + ' ' + (value === 'home' ? classes.checked : '')} button onClick={ () => this.handleClick('home') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>home</Icon>
									</ListItemIcon>
									<ListItemText primary='Home' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={classes.desktopNavListItem + ' ' + (value === 'rooms' ? classes.checked : '')} button onClick={ () => this.handleClick('rooms') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>dashboard</Icon>
									</ListItemIcon>
									<ListItemText primary='Rooms' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={classes.desktopNavListItem + ' ' + (value === 'settings' ? classes.checked : '')} button onClick={ () => this.handleClick('settings') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>settings</Icon>
									</ListItemIcon>
									<ListItemText primary='Settings' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
							</List>
						</div>
                    </div>
                </div>
				
				<img className={ classes.logo } src={logo} width="80" button onClick={ () => this.handleClick('home') } />
				
				{ value === 'home' && <h2 className={ classes.homeHeaderTitle }>Good { this.state.greeting }, { settings.accounts.byId[settings.accounts.currentUser].name }!</h2> }
				
				<NotificationsDialogContainer />
				
				<div className={ 'wrapper ' + value }> { /*  + ' ' + (value === 'home' && 'blabla') */ }
					<div className={ 'row' } style={{ position: 'relative' }}>
						<div className={ 'col-lg-5 headerBg' }>
							{ /*<div className='d-lg-none dubaiBg' style={ { backgroundImage: 'url('+dubaiSkyline+')' } }></div>*/ }
							<SustainabilityStatusCircleContainer />
						</div>
						
						<div className={ 'col-lg-7 content' }>
							{/*{ value === 0 && <CardContainer /> }*/}
							{ value === 'home' && <HomeContainer /> }
							{ value === 'rooms' && <Rooms /> }
							{ value === 'settings' && <AppSettingsContainer /> }
							{/*{ value === 3 && <Settings /> }*/}
							{/*<div className={ this.state.addContentNavMargin ? classes.contentNavMargin : '' }>
								{ value === 'home' && <Home/> }
								{ value === 'rooms' && <Rooms /> }
								{ value === 'settings' && <Settings /> }
							</div>*/}
						</div>
					</div>
				</div>

                <div className='d-lg-none'>
                    <BottomNavigation value={ value } onChange={ this.handleChange } className={ classes.mobileNav } showLabels>
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Home' value='home' icon={ <Icon>home</Icon> } />
                        <BottomNavigationAction className={ classes.mobileNavItem } label='Rooms' value='rooms' icon={ <Icon>dashboard</Icon> } />
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