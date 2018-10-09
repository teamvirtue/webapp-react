import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    root: {
		position: 'relative',
        transition: 'all 1s ease-in-out',
    },
	subNavBar: {
		backgroundColor: 'transparent',
	},
	homeBoxContainer: {
		width: '33%',
		display: 'inline-block',
	},
	homeBoxLeft: {
	},
	homeBoxMiddle: {
	},
	homeBoxRight: {
	},
	homeBox: {
		padding: 10,
		backgroundColor: '#db5020',
		width: 50,
		height: 50,
		borderRadius: '50%',
		margin: 'auto',
	},
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    iconSmall: {
        fontSize: 25,
    },
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: this.props.sustainabilityStatus.selected,
        };
    }

	setActiveTab = (tab) => (event) => { // TODO: what is newTab doing and why does it not work without?
        // event.preventDefault();
		this.setState({ tab });
		this.props.updateSustainabilityStatus(tab);
	};

    render() {
        const { classes, temperature, localNewsHeadlines } = this.props;
		const tab = this.state.tab;

        return (
            <div className={ classes.root }> {/*TODO: reduce number of nameless divs*/}
				<div className={ 'subNavBarContainer' }>
					<Tabs
					  value={ tab }
					  onChange={ this.setActiveTab }
					  indicatorColor='primary'
					  textColor='primary'
					  fullWidth
					  classes={{ root: classes.subNavBar }}
					>
						<Tab label='My LINQ' value='mylinq' />
						<Tab label='LINQ' value='linq' />
						<Tab label='District' value='district' />
					</Tabs>
				</div>

				<div className='homeBoxContainer'>
					{ tab === 'mylinq' &&
						<div>
                            <div className={ classes.homeBoxContainer + ' ' + classes.homeBoxLeft }>
                                <div className={ classes.homeBox }> </div>
                            </div>
                            <div className={ classes.homeBoxContainer + ' ' + classes.homeBoxMiddle }>
                                <div className={ classes.homeBox }> </div>
                            </div>
                            <div className={ classes.homeBoxContainer + ' ' + classes.homeBoxRight }>
                                <div className={ classes.homeBox }> </div>
                            </div>
                        </div>
					}
					{ tab === 'linq' &&
                        <div className='homebox'>
							<h1>{ temperature.outside.celsius }°</h1>
							<p>{ temperature.outside.description }</p>
						</div>
					}
					{ tab === 'district' &&
                        <div className='homebox'>
							News:
							Powered by News API
							{ Object.keys(localNewsHeadlines.byId).map((id) => {
                                let card = localNewsHeadlines.byId[id];

                                return card.visible ?
                                    <div key={id}>{ card.description }</div>
                                    : null;
                            }) }
						</div>
					}
				</div>
			</div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Home));