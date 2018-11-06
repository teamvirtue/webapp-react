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
import Avatar from '@material-ui/core/Avatar';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransitionGroup } from 'react-transition-group';
import '../../animations.css';
import moment from 'moment';

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
	dialogPaperRoot: {
		backgroundColor: '#f9f9f9',
	},
	dialogHeader: {
		backgroundColor: 'white',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 10,
		marginBottom: 20,
	},
	dialogHeaderIcon: {
		fontSize: 32, 
		verticalAlign: 'middle',
		marginRight: 10,
		marginTop: -3,
		color: theme.palette.primary.main,
	},
	dialogHeaderHeading: {
		display: 'inline-block',
	},
	dialogActionContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	dialogAction: {
		margin: '10px 5px',
		transition: 'all 200ms',
		width: 40,
		height: 40,
		color: 'white', 
	},
	eatTogetherNewMessage: {
		borderRadius: 25,
		background: 'white',
		padding: '0 20px',
		marginTop: 10,
		border: '1px solid #dbdbdb',
		flexGrow: 2,
		'& div': {
			padding: '5px 0',
		},
	},
	eatTogetherJoining: {
		border: '1px solid #dbdbdb',
		color: '#707070',
		fontSize: '90%',
	},
	eatTogetherJoiningCancel: {
		color: 'black',
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
			newMessageInput: '',
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

	handleNewMessageInput = (e) => {
		this.setState({ newMessageInput: e.target.value });
	};

    handleSubmitEatTogetherStatus = (status, close) => {
		/*** Reset state after a while ***/
		clearTimeout(current_timeout);
        current_timeout = setTimeout(function(){
			this.props.updateEatTogetherStatus('requested');
			this.props.resetEatTogetherMessage();
        }.bind(this), 1000 * 45);//45 seconds
		/*********************************/
		
		this.props.updateEatTogetherStatus(status);
		this.setState({ newMessageInput: '' });
		
		if(this.state.newMessageInput){
			this.props.updateEatTogetherMessage(this.state.newMessageInput);
		}
		if(close){
			this.handleDialogClose();
		}
    };
	
	renderWashingMachineMessage(){
		let sunrise = moment.unix(this.props.temperature.outside.sunrise);
		let sunset = moment.unix(this.props.temperature.outside.sunset);
		let forecast3h = moment.unix(this.props.temperature.outside.forecast3hDatetime);
		let forecast6h = moment.unix(this.props.temperature.outside.forecast6hDatetime);
		let now = moment();
		
		let warning = '';
		let positive = '';
		
		if(now.isSameOrBefore(sunrise, 'hour')){// if before sunrise hour
			let warning = 'Because the sun hasn\'t fully risen yet, you can beter wait for a while.';
		}else{
			if(now.isSameOrAfter(sunset, 'hour')){// if after sunset hour
				let warning = 'Because the sun is already set, you can beter wait for tomorrow.';
			}else{
				if(this.props.temperature.outside.description !== 'Clear sky'){//if currently not clear sky
					if( this.props.temperature.outside.forecast3hDescription === 'Clear sky' &&
						forecast3h.isSameOrBefore(sunset, 'hour')
					){//if sun is shining within next forecast time
						warning = 'You can better wait until ' + moment(forecast3h).format("HH") + 'u. It seems like the sun is shining then!';
					}else{
						if( this.props.temperature.outside.forecast6hDescription === 'Clear sky' &&
							forecast6h.isSameOrBefore(sunset, 'hour')
						){//if sun is shining within 2nd forecast time
							warning = 'You can better wait until ' + moment(forecast6h).format("HH") + 'u. It seems like the sun is shining then!';
						}else{
							positive = 'The sun isn\'t shining but the forecast aren\'t any better. It\'s fine to use the washing machine now.';
						}
					}
				}else{//everything looks fine now
					positive = 'The weather is currently sunny enough to use the washing machines efficiently!';
				}
				//if(this.props.temperature.outside.forecast3hDescription)
			}
		}

		return (
			<div>
				There is currently <strong>1</strong> out of <strong>3</strong> shared washing machines available.
				<br /><br />
				{ positive  &&
					<div className={ 'notificationPositive' }>
						{ positive }
					</div>
				}
				{ warning  &&
					<div className={ 'notificationWarning' }>
						{ warning }
					</div>
				}
			</div>
		);
	}
	
	renderCO2Message(){
		if (this.props.houseData.indoorCO2 >= 0 && this.props.houseData.indoorCO2 < 600) {
			return (
				<div>
					<h3>The level of CO2 is excellent</h3>
					<p className='notificationPositive'>That's great! Controlling ventilation is good for your health and increases productivity.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 600 && this.props.houseData.indoorCO2 < 1000) {
			return (
				<div>
					<h3>The level of CO2 is good</h3>
					<p className='notificationPositive'>That's good but you might consider to open a window or turn the air conditioning higher. Controlling ventilation is good for your health and it will increase productivity.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 1000 && this.props.houseData.indoorCO2 < 2500) {
			return (
				<div>
					<h3>The level of CO2 should be improved</h3>
					<p className='notificationWarning'>Elevated levels of CO2 decrease productivity and performance and increase headaches and rates of absenteeism. You must ventilate rooms by turning the air conditioning on or opening a window!</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 2500 && this.props.houseData.indoorCO2 < 5000) {
			return (
				<div>
					<h3>The level of CO2 is bad</h3>
					<p className='notificationWarning'>This might have to do with poorly ventilated rooms or many people in the house. You must ventilate rooms by turning the air conditioning on or opening a window.</p>
				</div>
			);
		} else if (this.props.houseData.indoorCO2 >= 5000) {
			return (
				<div>
					<h3>The level of CO2 is terribly bad</h3>
					<p className='notificationWarning'>You must <strong>immediately</strong> ventilate rooms by turning the air conditioning on or opening a window!</p>
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
	
	renderHumidityMessage(){
		if (this.props.houseData.indoorHumidity >= 0 && this.props.houseData.indoorHumidity < 35) {
			return (
				<div>
					<h3>The level of humidity is too low</h3>
					<p className='notificationWarning'>Although it feels comfortable, a low level of humidity is bad for your health and for the condition of materials in the house. Consider buying a humidifier.</p>
				</div>
			);
		} else if (this.props.houseData.indoorHumidity >= 35 && this.props.houseData.indoorHumidity <= 50) {
			return (
				<div>
					<h3>The level of humidity is excellent</h3>
					<p className='notificationPositive'>That's great, both for your own health and for the condition of materials in the house. Let\'s keep it like this!</p>
				</div>
			);
		} else if (this.props.houseData.indoorHumidity > 50) {
			return (
				<div>
					<h3>The level of humidity is too high</h3>
					<p className='notificationWarning'>You might consider opening a door. Also, make sure to close the door when you are taking a shower.</p>
				</div>
			);
		}
	}
	
	renderTemperatureMessage(){
		if (this.props.houseData.indoorTemperature <= 23) {
			return (
				<div>
					<h3>The level of humidity is too low</h3>
					<p className='notificationWarning'>Although it might feel comfortable, a low level of humidity is bad for your own health and for the condition of materials in the house.</p>
				</div>
			);
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
							label={(houseData.eatTogetherStatus === 'requested' && tab!=='linq') ? (
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
									onClick={ () => this.handleDialogOpen('washingmachine') }
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
										{houseData.eatTogetherStatus === 'requested' ? (
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
													<span className={ classes.iconBoxContentBigger }> { (houseData.eatTogetherStatus === 'yes' ? 3 : 2 ) }</span>
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
									onClick={ () => this.handleDialogOpen('temperature') }
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
									onClick={ () => this.handleDialogOpen('humidity') }
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
						paper: classes.dialogPaperRoot,
					}}
					fullWidth
				>
					
					{this.state.dialogContent === 'washingmachine' &&
						<div>
							<div className={ classes.dialogHeader }>
								<Icon className={ classes.dialogHeaderIcon }>local_laundry_service</Icon>
								<Typography className={ classes.dialogHeaderHeading } variant="title" gutterBottom>
									Shared washing machines
								</Typography>
							</div>
							<DialogContent>
								{ this.renderWashingMachineMessage() }
							</DialogContent>
						</div>
					}
					
					{this.state.dialogContent === 'eattogether' &&
						<DialogContent>
							<List>
								<ListItem>
									<Avatar alt="Abdul" src={accountPicture3} />
									<ListItemText 
										primary='Hey! Im free tonight, would someone like to cook and eat together around 19:00?'
										secondary="Abdul, 1 hour ago" />
								</ListItem>
								<ListItem>
									<Avatar alt="Jamil" src={accountPicture4} />
									<ListItemText 
										primary='Cool, I&#39;m in! I can help after 18:30.'
										secondary="Mar, 45 minutes ago" />
								</ListItem>
								<CSSTransitionGroup
									transitionName='messageAnimation'
									transitionAppear={ true }
									transitionAppearTimeout={ 500 }
									transitionEnterTimeout={ 350 }
									transitionLeaveTimeout={ 350 }
								>
									{ houseData.eatTogetherMessage.map((message, i) => {
											return (
												<ListItem>
													<Avatar alt="You" src={accountPicture2} />
													<ListItemText 
														primary={message}
														secondary="You, just now" />
												</ListItem>
											);
										}
									) }
								</CSSTransitionGroup>
							</List>
							
							{houseData.eatTogetherStatus === 'yes' ? (
								<List>
									<ListItem dense className={classes.eatTogetherJoining + ' notificationPositive'}>
										<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
										<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										<Avatar alt="You" src={accountPicture2} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										<span>
											<em>Ana, Mohammed and you are joining. </em>
											<a href="javascript:void(0)" className={classes.eatTogetherJoiningCancel} onClick={ () => this.handleSubmitEatTogetherStatus('requested', false) }><em>Cancel</em></a>
										</span>
									</ListItem>
								</List>
							) : (
								<List>
									<ListItem dense className={classes.eatTogetherJoining + (houseData.eatTogetherStatus === 'no' ? ' notificationNegative' : '')}>
										<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
										<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										{houseData.eatTogetherStatus === 'no' ? (
											<span>
												<em>Ana and Mohammed are joining. You are not. </em>
												<a href="javascript:void(0)" className={classes.eatTogetherJoiningCancel} onClick={ () => this.handleSubmitEatTogetherStatus('requested', false) }><em>Cancel</em></a>
											</span>
										) : (
											<span><em>Ana and Mohammed are joining.</em></span>
										)}
									</ListItem>
								</List>
							)}

							<div className={classes.dialogActionContainer}>
								<TextField
									id="filled-dense"
									placeholder="Message"
									className={classes.eatTogetherNewMessage}
									margin="normal"
									variant="filled"
									InputProps={{
										disableUnderline: true
									}}
									onChange={ this.handleNewMessageInput }
									value={this.state.newMessageInput}
									ref={el => this.input = el}
								/>
								{houseData.eatTogetherStatus === 'requested' ? (
									<div>
										<IconButton className={classes.dialogAction} style={{backgroundColor: '#03cea4'}} onClick={ () => this.handleSubmitEatTogetherStatus('yes', false) }>
											<Icon>thumb_up_alt</Icon>
										</IconButton>
										<IconButton className={classes.dialogAction} style={{backgroundColor: '#e9190f'}} onClick={ () => this.handleSubmitEatTogetherStatus('no', false) }>
											<Icon>thumb_down_alt</Icon>
										</IconButton>
									</div>
								) : (
									<div>
										<IconButton className={classes.dialogAction} style={{backgroundColor: '#bcbcbc'}} onClick={ () => this.handleSubmitEatTogetherStatus('yes', false) }>
											<Icon>mode_comment</Icon>
										</IconButton>
									</div>
								)}
							</div>
						</DialogContent>
					}
					
					{this.state.dialogContent === 'CO2' &&
						<div className='ProgressContainer'>
							<div className={ classes.dialogHeader }>
								<Icon color='primary' className={ classes.dialogHeaderIcon }>cloud</Icon>
								<Typography className={ classes.dialogHeaderHeading } variant="title" gutterBottom>
									CO2: { this.props.houseData.indoorCO2 } ppm
								</Typography>
							</div>
							<DialogContent>
								<div className='ProgressLine'>
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
									<div className='lineFill' style={{ width: this.renderCO2LineProgress() }}></div>
								</div>
								
								{ this.renderCO2Message() }
							</DialogContent>
						</div>
					}
					
					{this.state.dialogContent === 'humidity' &&
						<div className='ProgressContainer'>
							<div className={ classes.dialogHeader }>
								<FontAwesome className={ classes.dialogHeaderIcon } name='tint' />
								<Typography className={ classes.dialogHeaderHeading } variant="title" gutterBottom>
									Humidity: { this.props.houseData.indoorHumidity }%
								</Typography>
							</div>
							<DialogContent>
								<div className='ProgressLine'>
									<div className='dot'>
										Very low
										<span>10%</span>
									</div>
									<div className='dot'>
										Low
										<span>30%</span>
									</div>
									<div className='dot'>
										Excellent
										<span>50%</span>
									</div>
									<div className='dot'>
										High
										<span>70%</span>
									</div>
									<div className='dot'>
										Very high
										<span>90%</span>
									</div>
								</div>
								<div className='line'>
									<div className='lineFill' style={{ width: houseData.indoorHumidity + '%' }}></div>
								</div>
								
								{ this.renderHumidityMessage() }
							</DialogContent>
						</div>
					}
					
					{this.state.dialogContent === 'temperature' &&
						<div>
							<div className={ classes.dialogHeader }>
								<FontAwesome className={ classes.dialogHeaderIcon } name='thermometer-half' />
								<Typography className={ classes.dialogHeaderHeading } variant="title" gutterBottom>
									Temperature: { this.props.houseData.indoorTemperature }°C
								</Typography>
							</div>
							<DialogContent>
								{ this.renderTemperatureMessage() }
							</DialogContent>
						</div>
					}
						
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