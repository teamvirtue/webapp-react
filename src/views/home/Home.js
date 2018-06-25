import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
// import MediaQuery from 'react-responsive';

import { CSSTransitionGroup } from 'react-transition-group';
import '../../animations.css';

// custom import
// import './Home.css';
import { CardContainer } from '../../containers/CardContainer';
import SocketCard from './SocketCard';
import ImageCircle from '../../ImageCircle';
import myLinqImage from '../../assets/my_linq.jpg';
import linqImage from '../../assets/linq.jpg';
import communityImage from '../../assets/city.jpg';
import earthIcon from '../../assets/earth.svg';
// import halfEarthIcon from '../../assets/half_earth.svg';

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
        position: 'static',
        boxShadow: 'none',
        backgroundColor: 'white',
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

    /*dismissCard = (id) => {
		//alert(advices);
        //delete advices[0];
    };*/

    render() {
        const { classes, theme, advices, accounts, temperature, localNewsHeadlines } = this.props;
        const { value } = this.state;

        //console.log(localNewsHeadlines);

        return (
            <div className={ classes.root }> {/*TODO: reduce number of nameless divs*/}
                <AppBar className={ classes.appBar }>
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

                <div className='col-md-5'>
                    { value === 0 && <ImageCircle imageSource={ myLinqImage }/> }
                    { value === 1 && <ImageCircle imageSource={ linqImage }/> }
                    { value === 2 && <ImageCircle imageSource={ communityImage }/> }
                </div>

                <div className='col-md-7'>
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

                            {/*<MediaQuery query='(max-width: 1200px)'>
                                <Divider />
                            </MediaQuery>*/}

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

                                {/*<Divider />*/}

                                <CSSTransitionGroup
                                    transitionName='cardAnimation'
                                    transitionAppear={ true }
                                    transitionAppearTimeout={ 500 }
                                    transitionEnterTimeout={ 350 }
                                    transitionLeaveTimeout={ 350 }
                                >
                                    { Object.keys(advices.byId).map((id) => {
                                            let card = advices.byId[id];
                                            // let lastMessage = messageArray[messageArray.length - 1];

                                            return card.visible ?
                                                <CardContainer
                                                    key={ id }
                                                    id={ id }
                                                    title={ card.title }
                                                    buttonIcon={ card.buttonIcon }
                                                    buttonText={ card.buttonText }
                                                    // onDismissCard={this.dismissCard}
                                                >
                                                    { card.message }
                                                </CardContainer> : null
                                        }
                                    ) }
                                </CSSTransitionGroup>

                                {/*{ advices.map(data => {
                                    return (
                                        <CardContainer
                                            key={ data.id }
                                            id={ data.id }
                                            title={ data.title }
                                            buttonIcon={ data.buttonIcon }
                                            buttonText={ data.buttonText }
                                            // onDismissCard={this.dismissCard}
                                        >
                                            { data.message }
                                        </CardContainer>
                                    );
                                })}*/}

                                {/*{ advices.map(data => {
									return (
										<AdviceCard
											key={ data.id }
											id={ data.id }
											title={ data.title }
											buttonIcon={ data.buttonIcon }
											buttonText={ data.buttonText }
											onDismissCard={this.dismissCard}
										>
											{ data.message }
										</AdviceCard>
									);
								})}*/}
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