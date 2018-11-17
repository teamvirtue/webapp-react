import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { CSSTransitionGroup } from 'react-transition-group';
import '../animations.css';

import { updateAdvice } from '../actions';

// let indexCount = 100;

const styles = theme => ({
});

class SustainabilityCards extends Component {
	
	handleDismissAdvice = (event, level, id, active) => {
		this.props.updateAdvice(level, id, active);
		
		//set timer to re-add after a while
        setTimeout(() => {
            this.props.updateAdvice(level, id, true);
        }, 1000 * 60); //60 seconds

        /*setTimeout(function(){
			this.props.updateAdvice(level, id, true);
        }.bind(this), 1000 * 60); //60 seconds*/
	};
	
	componentDidUpdate(prevProps){
		// if marker is selected
	}

    render() {
		const { classes, sustainabilityStatus } = this.props;


        return (
            <div className='sustainabilityCardContainer'>
				<CSSTransitionGroup
					transitionName='adviceCardAnimation'
					transitionAppear={ false }
					transitionAppearTimeout={ 500 }
					transitionEnterTimeout={ 350 }
					transitionLeaveTimeout={ 350 }
				>
					{ Object.keys(sustainabilityStatus.advices[sustainabilityStatus.selected]).map((id) => {
						let advices = sustainabilityStatus.advices[sustainabilityStatus.selected];
						let advice = advices[id];

						// console.log(advices.indexOf(advice))

						return advice.active ?
							<Card className='sustainabilityCard row no-margin' key={ advice.id } style={{ zIndex: (100 - id) }}>
							{/*<Card className='sustainabilityCard row no-margin' key={ id } style={{ zIndex: (100 - id) }}>*/}
								<div className='col-9'>
									<div>
										<CardContent className='sustainabilityCardContent'>
											<h3>{ advice.title }</h3>
											{ advice.content }
										</CardContent>
										<CardActions style={{ paddingLeft: 0 }}>
											<Button color="primary" onClick={ (event) => this.handleDismissAdvice(event, sustainabilityStatus.selected, id, false) }>Next</Button>
										</CardActions>
									</div>
								</div>
								<div className='sustainabilityCardGraphic col-3'>
									<Icon className='sustainabilityCardIcon' style={{ fontSize: 48 }}>{ advice.icon }</Icon>
								</div>
							</Card>
						: null
					})}
					<Card className='sustainabilityCard sustainabilityCardEverythingFine'>
						<CardContent className='sustainabilityCardContent'>
							<Icon style={{ fontSize: 28, color: 'green' }}>check_circle</Icon> <br />
							Everything looks fine here!
						</CardContent>
					</Card>
				</CSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
		sustainabilityStatus: state.sustainabilityStatus,
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateAdvice: (level, id, active) => {
        dispatch(updateAdvice(level, id, active));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(SustainabilityCards)));