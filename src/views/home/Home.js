import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import FontAwesome from 'react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
		position: 'relative',
        transition: 'all 1s ease-in-out',
		marginBottom: 10,
    },
	subNavBarContainerTab: {
		color: 'white',
		textAlign: 'center',
		lineHeight: '24px',
		transition: 'font-size 100ms',
		borderBottom: '3px solid transparent',
		padding: '10px 0',
		textTransform: 'none',
		fontWeight: 400,
	},
	subNavBarIndicator:{
		display: 'none',
	},
	subNavBarContainerTabSelected: {
		'& span': {
			fontWeight: 'bold',
			fontSize: '3.5vw',
		}
	},
	iconBox: {
		marginTop: 10,
		marginBottom: 10,
		padding: '3.5vw',
		display: 'table',
		whiteSpace: 'nowrap',
		/*'&:hover': {
			'& .show': {
				opacity: 1,
			},
		},*/
	},
	iconBoxPaper: {
        backgroundColor: '#f2693a',
		cursor: 'pointer',
		display: 'table-cell',
		paddingBottom: '100%',
	},
	iconBoxContent: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	iconBoxContentBigger: {
		fontSize: 30, 
		verticalAlign: 'middle',
		color: 'white',
	},
	iconCounter: {
		fontSize: 30, 
		verticalAlign: 'middle',
		color: 'white',
	},
	iconCounterDescription: {
		display: 'block',
		color: '#ffd1bf',
	},
});


function Transition(props) {
	return <Fade {...props} />;
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: this.props.sustainabilityStatus.selected,
			tabIndex: (this.props.sustainabilityStatus.selected === 'linq') ? (0) : ((this.props.sustainabilityStatus.selected === 'mylinq') ? (1) : (2)),
			openDialog: false,
        };
    }

    updateActiveTabState = (tab) => {
        if (tab === 0) {
            this.props.updateSustainabilityStatus('linq');
        } else if(tab === 1) {
            this.props.updateSustainabilityStatus('mylinq');
        } else if(tab === 2) {
            this.props.updateSustainabilityStatus('district');
        }
    };

    handleTabChange = (event, tabIndex) => {
        this.setState({ tabIndex });
        this.updateActiveTabState(tabIndex);
    };

    handleTabChangeIndex = index => {
        this.setState({ tabIndex: index });
        this.updateActiveTabState(index);
    };
	
	handleDialogOpen = () => {
		this.setState({ openDialog: true });
	};

	handleDialogClose = () => {
		this.setState({ openDialog: false });
	};

    render() {
        const { classes, temperature, localNewsHeadlines, houseData } = this.props;
        const tab = this.state.tab;

        return (
            <div className={ classes.root }>
				<div className='subNavBarContainer'>
					<Tabs
						value={this.state.tabIndex}
						onChange={this.handleTabChange}
						classes={{indicator: classes.subNavBarIndicator}}
						indicatorColor="secondary"
						textColor="secondary"
						centered
						fullWidth
					>
						<Tab label="LINQ" classes={{ label: classes.subNavBarContainerTab, selected: classes.subNavBarContainerTabSelected }} />
						<Tab label="My LINQ" classes={{ label: classes.subNavBarContainerTab, selected: classes.subNavBarContainerTabSelected }} />
						<Tab label="District" classes={{ label: classes.subNavBarContainerTab, selected: classes.subNavBarContainerTabSelected }} />
					</Tabs>
					
					<SwipeableViews index={this.state.tabIndex} onChangeIndex={this.handleTabChangeIndex} style={{overflow: 'hidden'}}>
					
						<div className='row no-margin'>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>directions_bike</Icon>
											<span className={ classes.iconBoxContentBigger }> 6</span>
										</span>
										<span className={ classes.iconCounterDescription }>bikes</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>local_laundry_service</Icon>
											<span className={ classes.iconBoxContentBigger }> 1</span>
										</span>
										<span className={ classes.iconCounterDescription }>available machine</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								{houseData.showEatTogether ? (
									<Paper
										className={classes.iconBoxPaper}
										elevation={1}
										square={true}
										onClick={ this.handleDialogOpen }
									>
										<div className={ classes.iconBoxContent }>
											<Badge badgeContent={'!'} color="secondary">
												<span>
													<Icon className={ classes.iconBoxContentBigger }>restaurant</Icon>
													<span className={ classes.iconBoxContentBigger }> 2</span>
												</span>
											</Badge>
											<span className={ classes.iconCounterDescription }>eat together</span>
										</div>
									</Paper>
								) : (
									<Paper
										className={classes.iconBoxPaper}
										elevation={1}
										square={true}
									>
										<div className={ classes.iconBoxContent }>
											<span>
												<Icon className={ classes.iconBoxContentBigger }>restaurant</Icon>
												<span className={ classes.iconBoxContentBigger }> 2</span>
											</span>
											<span className={ classes.iconCounterDescription }>eat together</span>
										</div>
									</Paper>
								)}
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>fitness_center</Icon>
											<span className={ classes.iconBoxContentBigger }> 4</span>
										</span>
										<span className={ classes.iconCounterDescription }>people sporting</span>
									</div>
								</Paper>
							</div>
						</div>
						
						<div className='row no-margin'>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<FontAwesome className={ classes.iconBoxContentBigger } name='thermometer-half' />
											<span className={ classes.iconBoxContentBigger }> { Math.round(houseData.indoorTemperature) }°C</span>
										</span>
										<span className={ classes.iconCounterDescription }>temperature</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<FontAwesome className={ classes.iconBoxContentBigger } name='tint' />
											<span className={ classes.iconBoxContentBigger }> { houseData.indoorHumidity }%</span>
										</span>
										<span className={ classes.iconCounterDescription }>humidity</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>check</Icon>
											<span className={ classes.iconBoxContentBigger }> </span>
										</span>
										<span className={ classes.iconCounterDescription }>energy usage</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>check</Icon>
											<span className={ classes.iconBoxContentBigger }> </span>
										</span>
										<span className={ classes.iconCounterDescription }>water usage</span>
									</div>
								</Paper>
							</div>
						</div>
						
						<div className='row no-margin'>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<FontAwesome className={ classes.iconBoxContentBigger } name='thermometer-half' />
											<span className={ classes.iconBoxContentBigger }> { temperature.outside.celsius }°C</span>
										</span>
										<span className={ classes.iconCounterDescription }>{ temperature.outside.description }</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>directions_bus</Icon>
											<span className={ classes.iconBoxContentBigger }> 7m</span>
										</span>
										<span className={ classes.iconCounterDescription }>next bus</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>directions_subway</Icon>
											<span className={ classes.iconBoxContentBigger }> 9m</span>
										</span>
										<span className={ classes.iconCounterDescription }>next metro</span>
									</div>
								</Paper>
							</div>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
								>
									<div className={ classes.iconBoxContent }>
										<span>
											<Icon className={ classes.iconBoxContentBigger }>tram</Icon>
											<span className={ classes.iconBoxContentBigger }> 14m</span>
										</span>
										<span className={ classes.iconCounterDescription }>next tram</span>
									</div>
								</Paper>
							</div>
						</div>
						
					</SwipeableViews>
				</div>
				
				
				
									
				<Dialog
					open={this.state.openDialog}
					TransitionComponent={Transition}
					onClose={this.handleDialogClose}
				>
					test
				</Dialog>
			</div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Home));