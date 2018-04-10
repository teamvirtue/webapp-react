import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Icon from 'material-ui/Icon';
import MediaQuery from 'react-responsive';

import Home from './home/Home';
import Controls from './controls/Controls';
import Reports from './reports/Reports';
import Settings from './settings/AppSettings';

//const styles = theme => ({
const styles = {
    /*root: {
        //display: 'flex',
        backgroundColor: 'lightblue'
    },*/
    nav: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        width: '100%',
        boxShadow: '0px -3px 3px 0px rgba(0,0,0,0.15)',
    },
    desktopMenuContainer: {
        position: 'fixed',
        display: 'flex',
        height: '100%',
        backgroundColor: grey[100],
    },
    desktopMenu: {
        alignSelf: 'center',
    },
    listItem: {
		width: '200px',
        padding: '20px 16px',
    },
    bottomNav: {
        minWidth: '60px',
    },
    /*checked: {
        color: theme.palette.primary.main,
    },*/
};

class MainNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
            selectedValue: 0,
        };
    }

    // The '()' are necessary to make `this` work in the callback
    // from https://reactjs.org/docs/handling-events.html
    handleChange = (event, value) => {
        this.setState({ value });

        console.log(value);
    };

    handleClick = (id, event) => {
        this.setState({
            //id: !this.state.selectedValue,
            value: id,
        });
        //console.log(id);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }>
                <MediaQuery minWidth={ 1200 }>
                    <div className={ classes.desktopMenuContainer }>
                        <List component='nav' className={ classes.desktopMenu }>
                            <ListItem className={ classes.listItem } button onClick={ () => this.handleClick(0) }>
                                <ListItemIcon>
                                    <Icon className={ value === 0 ? classes.checked : 'unchecked' }>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Home' classes={{ primary: value === 0 ? classes.checked : 'unchecked' }} />
                            </ListItem>
                            <ListItem className={ classes.listItem } button onClick={ () => this.handleClick(1) }>
                                <ListItemIcon>
                                    <Icon className={ value === 1 ? classes.checked : 'unchecked' }>tune</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Controls' classes={{ primary: value === 1 ? classes.checked : 'unchecked' }} />
                            </ListItem>
                            <ListItem className={ classes.listItem } button onClick={ () => this.handleClick(2) }>
                                <ListItemIcon>
                                    <Icon className={ value === 2 ? classes.checked : 'unchecked' }>assessment</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Reports' classes={{ primary: value === 2 ? classes.checked : 'unchecked' }} />
                            </ListItem>
                            <ListItem className={ classes.listItem } button onClick={ () => this.handleClick(3) }>
                                <ListItemIcon>
                                    <Icon className={ value === 3 ? classes.checked : 'unchecked' }>settings</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Settings' classes={{ primary: value === 3 ? classes.checked : 'unchecked' }} />
                            </ListItem>
                        </List>
                    </div>

                    { value === 0 && <Home/> }
                    { value === 1 && <Controls /> }
                    { value === 2 && <Reports /> }
                    { value === 3 && <Settings /> }
                </MediaQuery>

                <MediaQuery maxWidth={ 1200 }>
                    { value === 0 && <Home/> }
                    { value === 1 && <Controls /> }
                    { value === 2 && <Reports /> }
                    { value === 3 && <Settings /> }

                    <BottomNavigation value={ value } onChange={ this.handleChange } className={ classes.nav }>
                        <BottomNavigationAction className={ classes.bottomNav } label='Home' href='#home' icon={ <Icon>home</Icon> } />
                        <BottomNavigationAction className={ classes.bottomNav } label='Controls' href='#controls' icon={ <Icon>tune</Icon> } />
                        <BottomNavigationAction className={ classes.bottomNav } label='Reports' href='#reports' icon={ <Icon>assessment</Icon> } />
                        <BottomNavigationAction className={ classes.bottomNav } label='Settings' href='#settings' icon={ <Icon>settings</Icon> } />
                    </BottomNavigation>
                </MediaQuery>
            </div>
        );
    }
}

MainNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
    //checked: PropTypes.bool.isRequired
};

export default withStyles(styles)(MainNavigation);