import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation  from '@material-ui/core/BottomNavigation';
import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

// local import
import { HomeContainer } from '../containers/HomeContainer';
import Rooms from './rooms/Rooms';
import { AppSettingsContainer } from '../containers/AppSettingsContainer';
import { SustainabilityStatusCircleContainer } from '../containers/SustainabilityStatusCircleContainer';
import { NotificationsDialogContainer } from '../containers/NotificationsDialogContainer';
import '../index.css';
import logo from '../assets/linq_logo_white.png';
import linqBg from '../assets/linq_top_down_view.jpg';

const styles = theme => ({
    root: {
        position: 'relative',
    },
	bg: {
		backgroundImage: 'url("'+linqBg+'")',
		backgroundSize: 'cover',
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
        zIndex: 5,
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
    sustainabilityCard: {
        position: 'absolute',
        top: 12,
        right: 0,
        left: 'auto',
        bottom: 'auto',
        minWidth: 275,
    },
	dubaiSkyline: {
		position: 'absolute',
		pointerEvents: 'none',
		bottom: 0,
		left: '-15px',
		right: '-15px',
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
		if(value !== this.state.value){
			this.props.updateSustainabilityStatus('mylinq');
		}
    };

    handleClick = (name) => {
        this.setState({ value: name });
		if(name !== this.state.value){
			this.props.updateSustainabilityStatus('mylinq');
		}
    };

    render() { /*TODO: remove inline styles*/
        const { classes, settings, sustainabilityStatus } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <div className='d-none d-lg-block'>
                    <div className={ classes.desktopNav }>
						<img className={ classes.logo } src={ logo } width='80' alt='LINQ logo' onClick={ () => this.handleClick('home') } />

						<div className={ classes.desktopNavList }>
							<List component='nav'>
								<ListItem className={ classes.desktopNavListItem + ' ' + (value === 'home' ? classes.checked : '') } button onClick={ () => this.handleClick('home') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>home</Icon>
									</ListItemIcon>
									<ListItemText primary='Home' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={ classes.desktopNavListItem + ' ' + (value === 'rooms' ? classes.checked : '') } button onClick={ () => this.handleClick('rooms') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>dashboard</Icon>
									</ListItemIcon>
									<ListItemText primary='Rooms' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
								<ListItem className={ classes.desktopNavListItem + ' ' + (value === 'settings' ? classes.checked : '') } button onClick={ () => this.handleClick('settings') }>
									<ListItemIcon>
										<Icon className={ classes.desktopNavListItemContent }>settings</Icon>
									</ListItemIcon>
									<ListItemText primary='Settings' classes={{ primary: classes.desktopNavListItemContent }} />
								</ListItem>
							</List>
						</div>
                    </div>
                </div>

				<img className={ classes.logo } src={ logo } width='80' alt='LINQ logo' onClick={ () => this.handleClick('home') } />
				<NotificationsDialogContainer />
				
				<div className={ 'wrapper ' + (sustainabilityStatus.fullscreen ? 'fullscreen ' : '') + value }> { /*  + ' ' + (value === 'home' && 'blabla') */ }
					<div className={ 'row ' + (value === 'home' ? classes.bg : '') } style={{ position: 'relative' }}>
						<div className={ 'col-lg-5 headerBg' }>
							<SustainabilityStatusCircleContainer />
						</div>

                        { !sustainabilityStatus.fullscreen &&
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
                        }
					</div>
				</div>

                {/*3D view cards*/}
				{ sustainabilityStatus.fullscreen &&
                    <Card className={ classes.sustainabilityCard }>
                        <CardContent>
                            Level: { sustainabilityStatus.selected }
                        </CardContent>
                        <CardActions>
                            <Button size='small'>Learn More</Button>
                        </CardActions>
                    </Card>
                }

                { !sustainabilityStatus.fullscreen &&
                    <div className='d-lg-none'>
                        <BottomNavigation value={ value } onChange={ this.handleChange } className={ classes.mobileNav } showLabels>
                            <BottomNavigationAction className={ classes.mobileNavItem } label='Home' value='home' icon={ <Icon>home</Icon> } />
                            <BottomNavigationAction className={ classes.mobileNavItem } label='Rooms' value='rooms' icon={ <Icon>dashboard</Icon> } />
                            <BottomNavigationAction className={ classes.mobileNavItem } label='Settings' value='settings' icon={ <Icon>settings</Icon> } />
                        </BottomNavigation>
                    </div>
                }
				
				{ /*<img className={ classes.dubaiSkyline } src={ dubaiSkyline } />*/ }
            </div>
        );
    }
}

MainNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    //checked: PropTypes.bool.isRequired
};

export default withStyles(styles)(MainNavigation);