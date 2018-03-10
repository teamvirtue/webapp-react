import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';

import './Home.css';
import AdviceCard from '../AdviceCard';
import ImageCircle from '../ImageCircle';
import myLinqImage from '../../assets/my_linq.svg';
import linqImage from '../../assets/linq.svg';
import communityImage from '../../assets/city.svg';
import earthIcon from '../../assets/earth.svg';
import halfEarthIcon from '../../assets/half_earth.svg';

const styles = {
    /*root: {
    },*/
    appBar: {
        position: 'static',
        boxShadow: 'none',
        backgroundColor: 'white',
    },
    energyIcon: {
        fontSize: '3.5em',
        lineHeight: '50px',
        color: '#f15b27',
    },
    checkIcon: {
        fontSize: '2em',
    },
    earthIcon: {
        width: 50,
        margin: 2,
    },
    cardContainer: {
        //minWidth: 275,
        margin: 50,
    },
};

function TabContainer({ children, dir }) {
    return (
        <div className='pageContainer' dir={dir}>
            {children}
        </div>
    );
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;
        const { value } = this.state;

        return (
            <div className={ classes.root }> {/*TODO: reduce number of nameless divs*/}
                <AppBar className={ classes.appBar }>
                    <Tabs
                        value={ value }
                        onChange={ this.handleChange }
                        indicatorColor='primary'
                        indicatorClassName='tabIndicator'
                        textColor='primary'
                        fullWidth
                        centered
                    >
                        <Tab label='My LINQ' />
                        <Tab label='LINQ' />
                        <Tab label='City' /> {/*// Community*/}
                    </Tabs>
                </AppBar>

                { value === 0 && <ImageCircle imageSource={ myLinqImage }/> }
                { value === 1 && <ImageCircle imageSource={ linqImage }/> }
                { value === 2 && <ImageCircle imageSource={ communityImage }/> }

                <div className='panelView'>
                    <SwipeableViews
                        className={ 'swipeableViews' }
                        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                        //animateHeight={ true }
                    >
                        <TabContainer dir={ theme.direction }>
                            <h1>Good morning Jane</h1>

                            <div className='statusBar'>
                                <div className='statusItem'>
                                    <img className={ classes.earthIcon } src={ earthIcon } alt='icon'/>
                                    <img className={ classes.earthIcon } src={ earthIcon } alt='icon'/>
                                    <img className={ classes.earthIcon } src={ halfEarthIcon } alt='icon'/>
                                    {/*<h1>25%</h1>*/}
                                    <Typography type='subheading'>
                                        Use of resources
                                    </Typography>
                                </div>
                                <div className='statusItem'>
                                    <Icon className={ classes.energyIcon }>swap_vert</Icon>
                                    <Typography type='subheading'>
                                        Generating energy
                                    </Typography>
                                </div>
                            </div>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>16°</h1>
                                    <p>Indoors</p>
                                </div>
                                <div className='infoItem2'>
                                    <h1>30</h1>
                                    <p>January</p>
                                </div>
                                <div className='infoItem3'>
                                    <Icon className={ classes.checkIcon }>check_circle</Icon>
                                    <p>System</p>
                                </div>
                            </div>

                            <Divider />

                            <div className={ classes.cardContainer }>
                                <AdviceCard />
                                <AdviceCard />
                                <AdviceCard />
                            </div>

                            {/*<div className='adviceContainer'> {
                                <h1>Advices</h1>

                                <div className='adviceItem'>
                                    <Icon>info</Icon>
                                    <p>Message</p>
                                </div>

                                <div className='adviceItem'>
                                    <Icon>info</Icon>
                                    <p>Message</p>
                                </div>
                            </div>*/}
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
                                    <Icon className={ classes.energyIcon }>swap_vert</Icon>
                                    <Typography type='subheading'>
                                        Generating and using energy
                                    </Typography>
                                </div>
                            </div>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>18°</h1>
                                    <p>Indoors</p>
                                </div>
                                <div className='infoItem2'>
                                    <h1>3</h1>
                                    <p>Spaces free</p>
                                </div>
                                <div className='infoItem3'>
                                    <h1>1</h1>
                                    <p>Planned activity</p>
                                </div>
                            </div>
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <h1>City Activity</h1>

                            <div className='infoBar'>
                                <div className='infoItem1'>
                                    <h1>25°</h1>
                                    <p>Shade temperature</p>
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

export default withStyles(styles, { withTheme: true })(Home);