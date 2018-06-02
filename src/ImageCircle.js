import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	circleSmall: {
		display: 'inline-block',
		width: '30vw',
		height: '30vw',
		top: 50,
		borderRadius: '50%',
		// border: '2px solid black',
		boxShadow: 'inset 0 0 10px 3px rgba(0, 0, 0, 0.25);',
	},
	circleLarge: {
		position: 'fixed',
		display: 'inline-block',
		width: '20vw',
		height: '20vw',
		top: '50%',
		margin: '-10vw 0 0 -10vw',
		borderRadius: '50%',
        // border: '2px solid black',
		boxShadow: 'inset 0 0 10px 3px rgba(0, 0, 0, 0.25);',
	},
};

class ImageCircle extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
		const { classes } = this.props;
		
        return (
			<div>
				{ /* Desktop */ }
				<div className='hidden-sm hidden-xs'>
					<img className={ classes.circleLarge } src={ this.props.imageSource } alt='circle'/>
				</div>
				
				{ /* Mobile */ }
				<div className='hidden-lg hidden-md'>
					<img className={ classes.circleSmall } src={ this.props.imageSource } alt='circle'/>
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