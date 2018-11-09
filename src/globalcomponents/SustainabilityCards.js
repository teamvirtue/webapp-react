import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    sustainabilityCard: {
        position: 'absolute',
		width: '75vw',
        top: 'auto',
		left: '12.5vw',
        bottom: 12,
		zIndex: 15,
    },
});

class SustainabilityCards extends Component {

    render() {
		const { classes, sustainabilityStatus } = this.props;

        return (
            <div>
				<Card className={ classes.sustainabilityCard }>
					<CardContent>
						Level: { sustainabilityStatus.selected }
					</CardContent>
					<CardActions>
						<Button size='small'>Learn More</Button>
					</CardActions>
				</Card>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
		sustainabilityStatus: state.sustainabilityStatus,
    }
};

export default connect(mapStateToProps, null)(withTheme()(withStyles(styles)(SustainabilityCards)));