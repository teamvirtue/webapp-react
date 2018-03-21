import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
/* import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from 'material-ui/Table'; */
import Icon from 'material-ui/Icon';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';

import RadioButtonGroup from '../../selection-controls/RadioButtonGroup';
import LineChart from './LineChart';
import BarChart from './BarChart';
// import Checkboxes from '../../selection-controls/Checkboxes';
import ImageCircle from '../ImageCircle';
import './Reports.css';

import OverviewImage from '../../assets/reports.svg';
import AppliancesImage from '../../assets/reports.svg';
import SystemsImage from '../../assets/reports.svg';

const styles = {
    /*theme => root: {
        backgroundColor: theme.palette.background.paper,
    },*/
    appBar: {
        position: 'static',
        boxShadow: 'none',
        backgroundColor: 'white',
    },
    tableCell: {
        border: 'none', // TODO: combine tableCellName & tableCell
        textAlign: 'center',
    },
    tableCellName: {
        border: 'none',
    },
    tableIcon: {
        color: '#f15b27',
    },
    ExpansionPanelDetails: {
        display: 'block',
        padding: 0,
    },
    expandIconExpanded: {
        color: '#f15b27',
        transform: 'translateY(-50%)',
    },
    icon: {
        fontSize: '2em',
        marginTop: '23px',
        lineHeight: '50px',
    },
};

let systems = [ // Use https://github.com/github/fetch for loading data?
    { value: 'HVAC', icon: 'toys', status: 'check_circle', key: '1' },
    { value: 'Water System', icon: 'info', status: 'highlight_off', key: '2' },
    { value: 'Battery', icon: 'battery_full', status: 'warning', key: '3' },
    { value: 'Grid', icon: 'grid_on', status: 'error_outline', key: '4' },
    { value: 'Solar Panels', icon: 'check_circle', status: 'check_circle', key: '5' },
    { value: 'Smart System', icon: 'developer_board', status: 'check_circle', key: '6' },
    { value: 'Wi-Fi', icon: 'wifi', status: 'check_circle', key: '7' },
];

let appliances = [
    { value: 'Washer-dryer', icon: 'local_laundry_service', key: '1' },
    { value: 'Dishwasher', icon: 'info', key: '2' },
    { value: 'Oven', icon: 'info', key: '3' },
    { value: 'Kitchen', icon: 'kitchen', key: '4' },
    { value: 'Music System', icon: 'speaker', key: '5' },
    { value: 'TV', icon: 'tv', key: '6' },
    { value: 'Laptop', icon: 'laptop', key: '7' },
    { value: 'Lights', icon: 'lightbulb_outline', key: '8' },
    { value: 'Clock', icon: 'access_time', key: '9' },
    { value: 'Car', icon: 'directions_car', key: '10' },
];

function TabContainer({ children, dir }) {
    return (
        <div className='pageContainer' dir={dir}>
            {children}
        </div>
    );
}

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    componentDidMount = function() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount = function() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    /*handleScroll = function(event) {
        let scrollTop = window.scrollY;

        console.log(scrollTop);
    };*/

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;
        const { value } = this.state;

        return (
            <div> {/*className={ classes.root }*/}
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
                        <Tab label='Overview' />
                        <Tab label='Appliances' />
                        <Tab label='Systems' />
                    </Tabs>
                </AppBar>

                { value === 0 && <ImageCircle imageSource={ OverviewImage }/> }
                { value === 1 && <ImageCircle imageSource={ AppliancesImage }/> }
                { value === 2 && <ImageCircle imageSource={ SystemsImage }/> }

                <div className='panelView'>
                    <SwipeableViews
                        className={ 'swipeableViews' }
                        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                    >
                        <TabContainer dir={ theme.direction }>
                            {/*TODO: fix titles layout*/}

                            <h1>On Average</h1>

                            <div className='reportsInfoBar'>
                                <div className='infoItem1'>
                                    <h1>15</h1><h3>kwh</h3>
                                    <p>Weekly</p>
                                </div>
                                <div className='infoItem2'>
                                    <h1>60</h1><h3>kwh</h3>
                                    <p>Monthly</p>
                                </div>
                                <div className='infoItem3'>
                                    <h1>720</h1><h3>kwh</h3>
                                    <p>Yearly</p>
                                </div>
                            </div>

                            <Divider/>

                            <h1>Estimated Figures</h1>

                            <div className='reportsInfoBar'>
                                <div className='infoItem1'>
                                    <Icon style={{ display: 'block' }}>local_atm</Icon>
                                    <h1>5500</h1><h3>$</h3>
                                    <p>Money saved</p>
                                </div>
                                <div className='infoItem2'>
                                    <Icon style={{ display: 'block' }}>bubble_chart</Icon>
                                    <h1>2</h1><h3>T</h3>
                                    <p>CO<sub>2</sub> reduced</p>
                                </div>
                                <div className='infoItem3'>
                                    <Icon>nature</Icon>
                                    <h1>100</h1>
                                    <p>Trees saved</p>
                                </div>
                            </div>

                            <Divider/>

                            <RadioButtonGroup />

                            <h1>Total Energy</h1>

                            <LineChart />
                            {/*<Checkboxes />*/}

                            <h1>Per Appliance</h1>
                            <BarChart />
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <RadioButtonGroup />

                            { appliances.map(data => {
                                return (
                                    <ExpansionPanel key={data.key}>
                                        <ExpansionPanelSummary expandIcon={<Icon>{data.icon}</Icon>} classes={{
                                            expandIconExpanded: classes.expandIconExpanded,
                                        }}>
                                            <Typography type='title'>{data.value}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={ classes.ExpansionPanelDetails }>
                                            <LineChart />

                                            <Divider/>

                                            <div className='statusBar'>
                                                <div className='statusItem'>
                                                    <h3>Feb</h3><h1>18</h1>
                                                    <Typography type='subheading' gutterBottom>
                                                        Last maintenance
                                                    </Typography>
                                                </div>
                                                <div className='statusItem'>
                                                    <Icon className={ classes.icon }>check_circle</Icon>
                                                    <Typography type='subheading' gutterBottom>
                                                        Operating normally
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }) }
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <RadioButtonGroup />

                            { systems.map(data => {
                                return (
                                    <ExpansionPanel key={ data.key }>
                                        <ExpansionPanelSummary expandIcon={<Icon>{ data.icon }</Icon>} classes={{
                                            expandIconExpanded: classes.expandIconExpanded,
                                        }}>
                                            <Typography type='title'>{ data.value }</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={ classes.ExpansionPanelDetails }>
                                            <LineChart />

                                            <Divider/>

                                            <div className='statusBar'>
                                                <div className='statusItem'>
                                                    <h3>Feb</h3><h1>18</h1>
                                                    <Typography type='subheading' gutterBottom>
                                                        Last maintenance
                                                    </Typography>
                                                </div>
                                                <div className='statusItem'>
                                                    <Icon className={ classes.icon }>check_circle</Icon>
                                                    <Typography type='subheading' gutterBottom>
                                                        Operating normally
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }) }
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

Reports.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Reports);