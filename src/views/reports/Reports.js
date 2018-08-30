import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BarChart from './BarChart';

const styles = theme => ({
	appBar: {
		backgroundColor: '#fff',
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
    icon: {
        fontSize: '2em',
        marginTop: '23px',
        lineHeight: '50px',
    },
});

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
            <div>
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
						<Tab label='Overview' />
						<Tab label='Appliances' />
						<Tab label='Systems' />
					</Tabs>
				</AppBar>

                <div>
                    <SwipeableViews
                        className={ 'swipeableViews' }
                        axis={ theme.direction === 'rtl' ? 'x-reverse' : 'x' }
                        index={ value }
                        onChangeIndex={ this.handleChangeIndex }
                    >
                        <TabContainer dir={ theme.direction }>
                            <h1>Appliance Energy (kWh)</h1>
                            <BarChart />
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
							<div className='d-none d-lg-block'>
								<h1 className={ classes.pageTitle }>Check appliance status</h1>
							</div>
                        </TabContainer>

                        <TabContainer dir={ theme.direction }>
							<div className='d-none d-lg-block'>
								<h1 className={ classes.pageTitle }>Check system status</h1>
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

Reports.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withTheme()(withStyles(styles)(Reports));