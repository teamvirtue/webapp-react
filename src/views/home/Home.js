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
import { CardContainer } from '../../containers/CardContainer';
import SocketCard from './SocketCard';
import ImageCircle from '../../ImageCircle';
import myLinqImage from '../../assets/my_linq.jpg';
import linqImage from '../../assets/linq.jpg';
import communityImage from '../../assets/city.jpg';
import earthIcon from '../../assets/earth.svg';
// import halfEarthIcon from '../../assets/half_earth.svg';

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

let worlds = [
    { id: '1' },
    // { id: '2' },
];

let sockets = [
    {   id: '1',
        title: 'Appliance Connected',
        message: 'A new applicance is connected to a socket in the kitchen. Please specify what appliance this is.',
        // buttonIcon: 'schedule',
        // buttonText: 'schedule',
    },
];

const styles = theme => ({
    root: {
        transition: 'all 1s ease-in-out',
    },
    appBar: {
		backgroundColor: '#f5f5f5',
		borderRadius: 5,
		boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.10)',
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
    notification: {
        outline: '2px dashed #f15b27',
        backgroundColor: '#f15b27',
        padding:10,
        maxWidth: 400,
        margin: '0 auto',
        color: 'white',
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
    };

    handleChangeIndex = (index) => {
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
                        value={ 0 }
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
                        <ImageCircle imageSource={ myLinqImage }/>
                    </div>
                </SupportTouch>*/}

                {/*<div className='col-md-5'>
                    { value === 0 && <ImageCircle imageSource={ myLinqImage }/> }
                    { value === 1 && <ImageCircle imageSource={ linqImage }/> }
                    { value === 2 && <ImageCircle imageSource={ communityImage }/> }
                </div>*/}

                <div>
                    {/*TODO: check https://react-swipeable-views.com/demos/demos/ & https://react-swipeable-views.com/demos/demos/*/}
                    <SwipeableViews
                        className={ 'swipeableViews' }
                        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                        animateHeight={ true }
                    >

                        <TabContainer dir={ theme.direction }>
                            <h1>Good morning { accounts.byId[accounts.currentUser].name }</h1>
                            {/*<div className = {classes.notification}>This is the 1st demo release of the VIRTUe LINQ app</div>*/}

                            <div className='statusBar'>
                                <div className='statusItem'>
                                    { worlds.map(data => {
                                        return (
                                            <img key={ data.id } className={ classes.earthIcon } src={ earthIcon } alt='icon'/>
                                        );
                                    })}
                                    {/*{ data.half && <img className={ classes.earthIcon } src={ halfEarthIcon } alt='icon'/> }*/}

                                    <Typography type='p'>
                                        Your footprint today
                                    </Typography>
                                </div>
                            </div>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>16°</h1>
                                    <p>Indoors</p>
                                </div>
                                <div className='infoItem2'>
                                    <Icon className={ classes.checkIcon }>swap_vert</Icon>
                                    <p>Generating energy</p>
                                </div>
                                <div className='infoItem3'>
                                    <Icon className={ classes.checkIcon }>check_circle</Icon>
                                    <p>System</p>
                                </div>
                            </div>

                            <div className={ classes.cardContainer }>
                                { sockets.map(data => {
                                    return (
                                        <SocketCard
                                            key={ data.id }
                                            title={ data.title }
                                        >
                                            { data.message }
                                        </SocketCard>
                                    );
                                })}
                            </div>
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <h1>LINQ Activity</h1>

                            <div className='statusBar'>
                                <div className='statusItem'>
                                    <h1>30%</h1>
                                    <Typography type='subheading'>
                                        Greener than average
                                    </Typography>
                                </div>
                                <div className='statusItem'>
                                    <h1>3</h1>
                                    <Typography type='subheading'>
                                        Spaces available
                                    </Typography>
                                </div>
                            </div>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>18°</h1>
                                    <p>Indoors</p>
                                </div>
                                <div className='infoItem2'>
                                    <Icon className={ classes.checkIcon }>swap_vert</Icon>
                                    <p>Generating & using energy</p>
                                </div>
                                <div className='infoItem3'>
                                    <h1>1</h1>
                                    <p>Planned activity</p>
                                </div>
                            </div>
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <h1>City Activity</h1>
                            <Typography variant='subheading'>Current location: Eindhoven</Typography>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>{ temperature.outside.celsius }°</h1>
                                    <p>{ temperature.outside.description }</p>
                                </div>
                                <div className='infoItem2'>
                                    <h1>10</h1>
                                    <p>Spaces free in other LINQs</p>
                                </div>
                                <div className='infoItem3'>
                                    <h1>5</h1>
                                    <p>Events near you</p>
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