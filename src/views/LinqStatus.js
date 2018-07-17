import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';	
import Dialog from '@material-ui/core/Dialog';
import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	circle: {
		position: 'absolute',
		height: '94%',
		width: '94%',
		top: '3%',
		left: '3%',
		animation: 'borderGradient 3s 1000ms infinite alternate',
		borderRadius: '50%',
	},
	circleBorder: {cursor: 'pointer',
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: '0',
		top: '0',
		fill: 'none',
		stroke: theme.palette.primary.main,
		strokeWidth: '0',
		strokeDasharray: '10',
		strokeDashoffset: '0',
		strokeLinecap: 'round',
		animation: 'startProgress 1500ms linear',
		animationFillMode: 'forwards',
	},
});

class LinqStatus extends Component {
    /*constructor(props) {
        super(props);
    }*/

    componentDidMount() {
        ThreeEntryPoint(this.threeRootElement);
    }
	
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

    render() {
		const { classes, gutterTop } = this.props;

        return (
			<div>
				<div className='linqStatusCircle' onClick={this.handleClickOpen}>
					<div className={ classes.circle } ref={ element => this.threeRootElement = element } />
					<svg className={ classes.circleBorder } version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="48"/>
					</svg>
				</div>
				
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
				>
					<div>Tips about LINQ</div>
				</Dialog>
			</div>
        );
    }
}

LinqStatus.propTypes = {
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(LinqStatus);