import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import ApplianceNavigation from './ApplianceNavigation';
import SystemNavigation from './SystemNavigation';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Local import
import LineChart from './LineChart';
import BarChart from './BarChart';
import ImageCircle from '../../ImageCircle';
import OverviewImage from '../../assets/reports.png';
import AppliancesImage from '../../assets/reports.png';
import SystemsImage from '../../assets/reports.png';

const styles = theme => ({
    appBar: {
        position: 'static',
        boxShadow: 'none',
        backgroundColor: 'white',
    },
    tabIndicator: {
        top: 0,
        bottom: 'auto',
    },
    icon: {
        fontSize: '2em',
        marginTop: '23px',
        lineHeight: '50px',
    },
});

/*let systems = [ // Use https://github.com/github/fetch for loading data?
    { value: 'HVAC', icon: 'toys', status: 'check_circle', key: '1' },
    { value: 'Water System', icon: 'info', status: 'highlight_off', key: '2' },
    { value: 'Battery', icon: 'battery_full', status: 'warning', key: '3' },
    { value: 'Grid', icon: 'grid_on', status: 'error_outline', key: '4' },
    { value: 'Solar Panels', icon: 'check_circle', status: 'check_circle', key: '5' },
    { value: 'Smart System', icon: 'developer_board', status: 'check_circle', key: '6' },
    { value: 'Wi-Fi', icon: 'wifi', status: 'check_circle', key: '7' },
];*/

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
            <div className={ classes.root }>
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
                        <Tab label='Overview' />
                        <Tab label='Appliances' />
                        <Tab label='Systems' />
                    </Tabs>
                </AppBar>

				<div className='col-md-5'>
					{ value === 0 && <ImageCircle imageSource={ OverviewImage }/> }
					{ value === 1 && <ImageCircle imageSource={ AppliancesImage }/> }
					{ value === 2 && <ImageCircle imageSource={ SystemsImage }/> }
				</div>

                <div className='col-md-7'>
                    <SwipeableViews
                        className={ 'swipeableViews' }
                        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                    >
                        <TabContainer dir={ theme.direction }>
                            <h1>Net Energy (kWh)</h1>
                            <LineChart type='energy' />

                            <h1>Water Usage (L)</h1>
                            <LineChart type='water' />

                            <h1>Appliance Energy (kWh)</h1>
                            <BarChart />
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
							<ApplianceNavigation />
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
                            <SystemNavigation />
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


export default withTheme()(withStyles(styles)(Reports));