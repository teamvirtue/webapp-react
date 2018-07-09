import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import ThreeEntryPoint from './threejs/ThreeEntryPoint';

const styles = theme => ({
	linqStatus: {
		display: 'inline-block',
		width: '22vw',
		height: '22vw',
		top: '50%',
		margin: '-11vw 0 0 -11vw',
	},
	linqStatusMobile: {
		display: 'inline-block',
		width: '30vw',
		height: '30vw',
        marginTop: 20,
	},

	circle: {
		position: 'absolute',
		height: '94%',
		width: '94%',
		top: '3%',
		left: '3%',
		animation: 'borderGradient 4s 3500ms infinite alternate',
		borderRadius: '50%',
	},
	circleBorder: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: '0',
		top: '0',
		fill: 'none',
		stroke: theme.palette.primary.main,
		strokeWidth: '3px',
		strokeDasharray: '10',
		strokeDashoffset: '0',
		strokeLinecap: 'round',
		animation: 'startProgress 3500ms ease-in-out',
		animationFillMode: 'forwards',
	},
});

class ImageCircle extends Component {
    /*constructor(props) {
        super(props);
    }*/

    componentDidMount() {
        ThreeEntryPoint(this.threeRootElement);
    }

    render() {
		const { classes, gutterTop } = this.props;

        return (
			<div>
				<div className='linqStatusCircle'>
					<div className={ classes.circle } ref={ element => this.threeRootElement = element } />
					<svg className={ classes.circleBorder } version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="48"/>
					</svg>
				</div>
				
				{ /* Mobile 
				<div className='hidden-lg hidden-md'>
					<div className={ classes.linqStatusMobile }>
						<div className={ classes.circle } style={ gutterTop && { marginTop: 48 + 20  }} ref={ element => this.threeRootElement = element } />
						<svg className={ classes.circleBorder } version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
							<circle cx="50" cy="50" r="48"/>
						</svg>
					</div>
				</div>*/ }
					
			</div>
        );
    }
}

ImageCircle.propTypes = {
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageCircle);