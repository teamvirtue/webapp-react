import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
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

import accountPicture1 from '../../assets/accounts/1.jpg';
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
		'&:hover':{
			cursor: 'pointer',
		},
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
	
	handleDialogOpen = () => {
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
									onClick={ this.handleDialogOpen }
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
													<span className={ classes.iconBoxContentBigger }> 2</span>
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
				>
					<DialogContent>
						<List>
							<ListItem>
								<Avatar alt="Abdul" src={accountPicture3} />
								<ListItemText 
									primary='Hey! Im free tonight, would someone like to cook and eat together around 19:00?'
									secondary="Abdul, Today, 13:14 PM" />
							</ListItem>
						</List>
						<Divider />
						
						{houseData.eatTogether === 'yes' ? (
							<div>
								<List>
									<ListItem dense>
										<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
										<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										<Avatar alt="You" src={accountPicture1} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										<span><em>Ana, Mohammed and you are joining <a href="javascript:void(0);" onClick={ () => this.handleSubmitEatTogether('no', false) }>(cancel)</a></em></span>
									</ListItem>
								</List>
							</div>
						) : (
							<div>
								<List>
									<ListItem dense>
										<Avatar alt="Mohamed" src={accountPicture4} className={classes.avatarSmall} /> 
										<Avatar alt="Ana" src={accountPicture5} className={classes.avatarSmall} style={{marginLeft: '-28px'}} />
										<span><em>Ana and Mohammed are joining</em></span>
									</ListItem>
								</List>

								<div className={classes.dialogActionContainer}>
									<Avatar className={classes.dialogAction} style={{backgroundColor:'#03cea4'}} onClick={ () => this.handleSubmitEatTogether('yes', false) }>
										<Icon>thumb_up_alt</Icon>
									</Avatar>
									<Avatar className={classes.dialogAction} style={{backgroundColor:'#e9190f'}} onClick={ () => this.handleSubmitEatTogether('no', true) }>
										<Icon>thumb_down_alt</Icon>
									</Avatar>
								</div>
							</div>
						)}
						
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