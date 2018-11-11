import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { updateAdvice } from '../actions';

const styles = theme => ({
    sustainabilityCard: {
		marginBottom: 80,
    },
});

class SustainabilityCards extends Component {
	
	handleDismissAdvice = (event, id) => {
		console.log(id);
		this.props.updateAdvice(id);
	};

    render() {
		const { classes, sustainabilityStatus } = this.props;

        return (
            <div>
				{ Object.keys(sustainabilityStatus.advices).map((id) => {
					let advice = sustainabilityStatus.advices[id];
					return advice.active ?
						<Card className={ classes.sustainabilityCard } key={id}>
							<CardContent>
								CONTENT
							</CardContent>
							<CardActions>
								<Button size='small' onClick={ (event) => this.handleDismissAdvice(event, id) }>Close</Button>
							</CardActions>
						</Card>: null
				})}
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
    updateAdvice: (id) => {
        dispatch(updateAdvice(id));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(SustainabilityCards)));