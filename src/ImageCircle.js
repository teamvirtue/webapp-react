import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import ThreeEntryPoint from './threejs/ThreeEntryPoint';

const styles = {
	circleSmall: {
		display: 'inline-block',
		width: '30vw',
		height: '30vw',
        marginTop: 20,
		// top: 50,
		borderRadius: '50%',
		// border: '2px solid black',
		/*boxShadow: 'inset 0 0 10px 3px rgba(0, 0, 0, 0.25);',
		border: '5px solid',*/
		borderColor: grey[100],
	},
	circleLarge: {
		position: 'fixed',
		display: 'inline-block',
		width: '22vw',
		height: '22vw',
		top: '50%',
		margin: '-10vw 0 0 -10vw',
		// borderRadius: '50%',
        // border: '2px solid black',
		/*boxShadow: 'inset 0 0 10px 3px rgba(0, 0, 0, 0.25);',
		border: '5px solid',
		borderColor: grey[100],*/
		// backgroundColor: 'red',
	},
};

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
				{ /* Desktop */ }
				<div className='hidden-sm hidden-xs'>
                    <div className={ classes.circleLarge } ref={ element => this.threeRootElement = element } />
				</div>
				
				{ /* Mobile */ }
				<div className='hidden-lg hidden-md'>
                    /* <div className={ classes.circleSmall } style={ gutterTop && { marginTop: 48 + 20  }} ref={ element => this.threeRootElement = element } /> */
				</div>
			</div>
        );
    }
}

ImageCircle.propTypes = {
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageCircle);