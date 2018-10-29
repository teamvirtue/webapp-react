import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import FontAwesome from 'react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import accountPicture2 from '../../assets/accounts/2.jpg';
import accountPicture3 from '../../assets/accounts/3.jpg';
import accountPicture4 from '../../assets/accounts/4.jpg';
import accountPicture5 from '../../assets/accounts/5.jpg';

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
	badgeIcon: {
		fontSize: 10,
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
	dialogRoot: {
		top: 'auto',
		textAlign: 'center',
	},
	dialogActionContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	dialogAction: {
		margin: 10,
		transition: 'all 200ms',
		width: 40,
		height: 40,
		color: 'white',
	},
	avatarSmall: {
		width: 30,
		height: 30,
		marginRight: 10,
		border: '2px solid white',
	},
});


function Transition(props) {
	return <Slide direction="up" {...props} />;
}

var current_timeout = 0;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: this.props.sustainabilityStatus.selected,
			tabIndex: (this.props.sustainabilityStatus.selected === 'linq') ? (0) : ((this.props.sustainabilityStatus.selected === 'mylinq') ? (1) : (2)),
			openDialog: false,
			dialogContent: 'eattogether',
        };
    }

    updateActiveTabState = (tab) => {
        if (tab === 0) {
            this.props.updateSustainabilityStatus('linq');
			this.setState({ tab: 'linq' });
        } else if(tab === 1) {
            this.props.updateSustainabilityStatus('mylinq');
			this.setState({ tab: 'mylinq' });
        } else if(tab === 2) {
            this.props.updateSustainabilityStatus('district');
			this.setState({ tab: 'district' });
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
	
	handleDialogOpen = (content) => {
		this.setState({ dialogContent: content });
		this.setState({ openDialog: true });
	};

	handleDialogClose = () => {
		this.setState({ openDialog: false });
	};

    handleSubmitEatTogether = (status, close) => {
		/*** Reset state after a while ***/
		clearTimeout(current_timeout);
        current_timeout = setTimeout(function(){
			this.props.updateEatTogether('requested');
        }.bind(this), 1000 * 30);//30 seconds
		/*********************************/
		
		this.props.updateEatTogether(status);
		if(close){
			this.handleDialogClose();
		}
    };
	
	renderCO2Message(){
		if (this.props.houseData.indoorCO2 >= 0 && this.props.houseData.indoorCO2 < 600) {
			return (
				<div>
					<h3>The level of CO2 is good ({ this.props.houseData.indoorCO2 })</h3>
					<p>That's great! Controlling ventilation is good for your health and it will increase productivity.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 600 && this.props.houseData.indoorCO2 < 1000) {
			return (
				<div>
					<h3>The level of CO2 is okay ({ this.props.houseData.indoorCO2 })</h3>
					<p>That's good but you might consider to open a window or turn the air conditioning higher. Controlling ventilation is good for your health and it will increase productivity.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 1000 && this.props.houseData.indoorCO2 < 2500) {
			return (
				<div>
					<h3>The level of CO2 should be improved ({ this.props.houseData.indoorCO2 })</h3>
					<p>Elevated levels of CO2 decrease productivity and performance and increase headaches and rates of absenteeism. You must ventilate rooms by turning the air conditioning on or opening a window!</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 2500 && this.props.houseData.indoorCO2 < 5000) {
			return (
				<div>
					<h3>The level of CO2 is bad ({ this.props.houseData.indoorCO2 })</h3>
					<p>This might have to do with poorly ventilated rooms or many people in the house. You must ventilate rooms by turning the air conditioning on or opening a window.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 5000) {
			return (
				<div>
					<h3>The level of CO2 is terribly bad ({ this.props.houseData.indoorCO2 })</h3>
					<p>You must <strong>immediately</strong> ventilate rooms by turning the air conditioning on or opening a window!</p>
				</div>
			);
		}
	}
	
	renderCO2LineProgress(){
		if (this.props.houseData.indoorCO2 >= 0 && this.props.houseData.indoorCO2 < 600) {
			return '12.5%';
		} else if (this.props.houseData.indoorCO2 >= 600 && this.props.houseData.indoorCO2 < 1000) {
			return '37.5%';
		} else if (this.props.houseData.indoorCO2 >= 1000 && this.props.houseData.indoorCO2 < 2500) {
			return '62.5%';
		} else if (this.props.houseData.indoorCO2 >= 2500 && this.props.houseData.indoorCO2 < 5000) {
			return '87.5%';
		} else if (this.props.houseData.indoorCO2 >= 5000) {
			return '100%';
		}
	}

    render() {
        const { classes, temperature, localNewsHeadlines, houseData } = this.props;
        const tab = this.state.tab;
		const tabIndex = this.state.tabIndex;

        return (
            <div className={ classes.root }>
				<div className='subNavBarContainer'>
					<Tabs
						value={ tabIndex }
						onChange={ this.handleTabChange }
						classes={{ indicator: classes.subNavBarIndicator }}
						indicatorColor="secondary"
						textColor="secondary"
						centered
						fullWidth
					>
						<Tab 
							label={(houseData.eatTogether === 'requested' && tab!=='linq') ? (
								<Badge badgeContent={<Icon className={ classes.badgeIcon }>restaurant</Icon>} color="secondary" style={{padding: '0 10px'}} classes={{badge: 'badge'}}>
									LINQ
								</Badge>
							) : (
								"LINQ" 
							)}
							classes={{ label: classes.subNavBarContainerTab, selected: 'subNavBarContainerTabSelected' }} />
						<Tab label="My LINQ" classes={{ label: classes.subNavBarContainerTab, selected: 'subNavBarContainerTabSelected' }} />
						<Tab label="District" classes={{ label: classes.subNavBarContainerTab, selected: 'subNavBarContainerTabSelected' }} />
					</Tabs>
					
					<SwipeableViews index={ tabIndex } onChangeIndex={ this.handleTabChangeIndex } style={{ overflow: 'hidden' }}>
					
						<div className='row no-margin'>
							<div className={ classes.iconBox + ' col-3' }>
								<Paper
									className={ classes.iconBoxPaper }
									elevation={ 1 }
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
								<Paper
									className={classes.iconBoxPaper}
									elevation={1}
									square={true}
									onClick={ () => this.handleDialogOpen('eattogether') }
								>
									<div className={ classes.iconBoxContent }>
										{houseData.eatTogether === 'requested' ? (
											<div>
												<Badge badgeContent={<Icon className={ classes.badgeIcon }>restaurant</Icon>} color="secondary">
													<span>
														<Icon className={ classes.iconBoxContentBigger }>restaurant</Icon>
														<span className={ classes.iconBoxContentBigger }> 2</span>
													</span>
												</Badge>
												<span className={ classes.iconCounterDescription }>eat together</span>
											</div>
										) : (
											<div>
												<span>
													<Icon className={ classes.iconBoxContentBigger }>restaurant</Icon>
													<span className={ classes.iconBoxContentBigger }> { (houseData.eatTogether === 'yes' ? 3 : 2 ) }</span>
												</span>
												<span className={ classes.iconCounterDescription }>eat together</span>
											</div>
										)}
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
									onClick={ () => this.handleDialogOpen('CO2') }
								>
									<div className={ classes.iconBoxContent }>
										{ houseData.indoorCO2 < 1000 ? 
											<div>
												<Icon className={ classes.iconBoxContentBigger }>cloud</Icon>
												<span className={ classes.iconBoxContentBigger }><Icon>check</Icon></span>
												<span className={ classes.iconCounterDescription }>healthy CO2</span>
											</div>
											: 
											<div>
												<Icon className={ classes.iconBoxContentBigger }>cloud</Icon>
												<span className={ classes.iconBoxContentBigger }><Icon>close</Icon></span>
												<span className={ classes.iconCounterDescription }><strong>unhealthy CO2</strong></span>
											</div>
										}
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
					classes={{
						root: classes.dialogRoot,
					}}
					fullWidth
				>
					<DialogContent>
					
						{this.state.dialogContent === 'eattogether' &&
							<div>
								<List>
									<ListItem>
										<Avatar alt="Abdul" src={accountPicture3} />
										<ListItemText 
											primary='Hey! Im free tonight, would someone like to cook and eat together around 19:00?'
											secondary="Abdul, today at 13:14 PM" />
									</ListItem>
								</List>
								<Divider />
								
								{houseData.eatTogether === 'yes' ? (
									<List>
										<ListItem dense>
											<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
											<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
											<Avatar alt="You" src={accountPicture2} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
											<span><em>Ana, Mohammed and you are joining</em></span>
										</ListItem>
									</List>
								) : (
									<List>
										<ListItem dense>
											<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
											<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
											<span><em>Ana and Mohammed are joining</em></span>
										</ListItem>
									</List>
								)}

								<div className={classes.dialogActionContainer}>
									<IconButton className={classes.dialogAction} style={{backgroundColor: (houseData.eatTogether === 'no' ? '#bdbdbd' : '#03cea4')}} onClick={ () => this.handleSubmitEatTogether('yes', false) }>
										<Icon>thumb_up_alt</Icon>
									</IconButton>
									<IconButton className={classes.dialogAction} style={{backgroundColor: (houseData.eatTogether === 'yes' ? '#bdbdbd' : '#e9190f')}} onClick={ () => this.handleSubmitEatTogether('no', true) }>
										<Icon>thumb_down_alt</Icon>
									</IconButton>
								</div>
							</div>
						}
						
						{this.state.dialogContent === 'CO2' &&
							<div className='CO2Container'>
								<div className='CO2Line'>
									<div className='dot'>
										Excellent
										<span>0-600</span>
									</div>
									<div className='dot'>
										Good
										<span>600-1,000</span>
									</div>
									<div className='dot'>
										Medium
										<span>1,000-2,500</span>
									</div>
									<div className='dot'>
										Bad
										<span>2,500 and higher</span>
									</div>
								</div>
								<div className='line'>
									<div className='lineProgress' style={{ width: this.renderCO2LineProgress() }}></div>
								</div>
								
								{ this.renderCO2Message() }
							</div>
						}
						
					</DialogContent>
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