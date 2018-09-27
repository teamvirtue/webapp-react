import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
		position: 'relative',
        transition: 'all 1s ease-in-out',
    },
    subnavBar: {
		textAlign: 'center',
	},
	selected: {
		fontWeight: 'bold',
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

	setActiveTab = tab => (newTab) => {
		this.setState({ tab });
		this.props.updateSustainabilityStatus(tab);
	};

    render() {
        const { classes, temperature, localNewsHeadlines } = this.props;
		const tab = this.state.tab;

        return (
            <div className={ classes.root }> {/*TODO: reduce number of nameless divs*/}
				<div className={ classes.subnavBar + ' homepageSubnavBar row' }>
					<Button color="secondary" className={'col-4 tab ' + (tab === 'mylinq' ? "selected" : "" )} onClick={ this.setActiveTab('mylinq') }>
						My LINQ
					</Button>
					<Button color="secondary" className={'col-4 tab ' + (tab === 'linq' ? "selected" : "" )} onClick={ this.setActiveTab('linq') }>
						LINQ
					</Button>
					<Button color="secondary" className={'col-4 tab ' + (tab === 'district' ? "selected" : "" )} onClick={ this.setActiveTab('district') }>
						District
					</Button>
				</div>
				
				<div className='homeBoxContainer'>
					{ tab === 'mylinq' && 	<div>
												<div className={classes.homeBoxContainer + " " + classes.homeBoxLeft}>
													<div className={classes.homeBox}> </div>
												</div>
												<div className={classes.homeBoxContainer + " " + classes.homeBoxMiddle}>
													<div className={classes.homeBox}> </div>
												</div>
												<div className={classes.homeBoxContainer + " " + classes.homeBoxRight}>
													<div className={classes.homeBox}> </div>
												</div>
											</div> 
					}
					{ tab === 'linq' && <div className='homebox'>
							<h1>{ temperature.outside.celsius }°</h1>
							<p>{ temperature.outside.description }</p>
						</div> 
					}
					{ tab === 'district' && <div className='homebox'>
							News:
							Powered by News API
							{ Object.keys(localNewsHeadlines.byId).map((id) => {
									let card = localNewsHeadlines.byId[id];

									return card.visible ?
										<div key={id}>{card.description}</div>
										: null;
								}
							) }
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