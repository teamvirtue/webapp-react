import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import SupportTouch from 'react-swipeable-views';

// custom import
const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

let worlds = [
    { id: '1' },
    // { id: '2' },
];

const styles = theme => ({
    root: {
        transition: 'all 1s ease-in-out',
    },
    appBar: {
		backgroundColor: 'transparent',
		borderRadius: 5,
		boxShadow: 'none',
		marginTop: 10,
		marginBottom: 30,
		overflow: 'hidden',
    },
    tabIndicator: {
        top: 0,
        bottom: 'auto',
    },
    energyIcon: {
        fontSize: '3.5em',
        lineHeight: '50px',
        color: theme.palette.primary.main,
    },
    checkIcon: {
        fontSize: '2em',
    },
    earthIcon: {
        width: 50,
        margin: 2,
    },
    cardContainer: {
        // minWidth: 275,
        minWidth: 275,
        maxWidth: 600,
       /* display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',*/
        margin: '0 auto',
        // backgroundColor: 'lightblue',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    iconSmall: {
        fontSize: 25,
    },
});

function TabContainer({ children, dir }) {
    return (
        <div className='pageContainer' dir={ dir }>
            { children }
        </div>
    );
}

function slideRenderer(params) {
    const { index, key } = params;
    let style;

    switch (mod(index, 3)) {
        case 0:
            style = styles.slide1;
            break;

        case 1:
            style = styles.slide2;
            break;

        case 2:
            style = styles.slide3;
            break;

        default:
            break;
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            ignored: false,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
		
		if(value===0){
			this.props.updateSustainabilityStatus('linq');
		}else if(value===1){
			this.props.updateSustainabilityStatus('apartmentcomplex');
		}else if(value===2){
			this.props.updateSustainabilityStatus('dubai');
		}
    };

    handleChangeIndex = (index) => { // TODO: does not seem to work
        this.setState({ value: index });
    };

    render() {
        const { classes, theme, accounts, temperature, localNewsHeadlines } = this.props;
        const { value } = this.state;

        //console.log(localNewsHeadlines);

        return (
            <div className={ classes.root }> {/*TODO: reduce number of nameless divs*/}
                <AppBar className={ classes.appBar } position="static">
                    <Tabs
                        value={ value }
                        onChange={ this.handleChange }
                        indicatorColor='primary'
                        classes={{ indicator: classes.tabIndicator }}
                        textColor='primary'
                        fullWidth
                        centered
                    >
                        <Tab label='My LINQ' />
                        <Tab label='LINQ' />
                        <Tab label='City' />
                    </Tabs>
                </AppBar>

               {/* <SupportTouch>
                    <VirtualizeSwipeableViews
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                        slideRenderer={ slideRenderer }
                    />
                    <div className='col-md-5'>
                        <SustainabilityStatus imageSource={ myLinqImage }/>
                    </div>
                </SupportTouch>*/}

                {/*<div className='col-md-5'>
                    { value === 0 && <SustainabilityStatus imageSource={ myLinqImage }/> }
                    { value === 1 && <SustainabilityStatus imageSource={ linqImage }/> }
                    { value === 2 && <SustainabilityStatus imageSource={ communityImage }/> }
                </div>*/}

                {/*TODO: check https://react-swipeable-views.com/demos/demos/ & https://react-swipeable-views.com/demos/demos/*/}
                <SwipeableViews
                    // className={ 'swipeableViews' }
                    axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                    index={ value }
                    onChangeIndex={ this.handleChangeIndex }
                    animateHeight={ true }
                >
                    <TabContainer dir={ theme.direction }>
                        <h1>{ accounts.byId[accounts.currentUser].name }</h1>
                    </TabContainer>

                    <TabContainer dir={ theme.direction }>
                    </TabContainer>

                    <TabContainer dir={ theme.direction }>
                        <h1>City Activity</h1>
                        <div className='infoBar'>
                            <div className='infoItem1'>
                                <h1>{ temperature.outside.celsius }°</h1>
                                <p>{ temperature.outside.description }</p>
                            </div>
                        </div>

                        News:
                        Powered by News API
                        { Object.keys(localNewsHeadlines.byId).map((id) => {
                                let card = localNewsHeadlines.byId[id];

                                return card.visible ?
                                    <div key={id}>{card.description}</div>
                                    : null;
                            }
                        ) }
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Home));