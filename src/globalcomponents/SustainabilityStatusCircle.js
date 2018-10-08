import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Local import
import { SceneContainer } from '../containers/SceneContainer';
// import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	root: {
		// backgroundColor: 'blue',
	},
    backButton: {
        position: 'absolute',
        top: 12,
        right: 'auto',
        left: 0,
        bottom: 'auto',
    },
    circleBorder: {
        cursor: 'pointer',
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: '0',
        top: '0',
        fill: 'none',
		borderRadius: '47%',
        strokeWidth: '0',
        strokeDasharray: '12',
        strokeDashoffset: '0',
        strokeLinecap: 'square',
        animation: 'startProgress 1500ms ease-out, continueProgress 15s 1500ms linear infinite',
        animationFillMode: 'forwards',
        pointerEvents: 'none',
        transition: 'all 1s',
    },
    /*fullscreenContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
	    backgroundColor: 'blue',
    },*/
    /*fullscreen: {
        WebkitTransform: 'scale(2)',
        transform: 'scale(2)',
    },*/
});

/*function Transition(props) {
	return <Grow { ...props } />;
}*/

class SustainabilityStatusCircle extends Component {
    /*constructor(props) {
        super(props);
    }*/

	/*state = {
        fullscreen: false,
	};*/

	handleOpen = () => {
        this.props.updateFullscreenStatus(true);

        // this.setState({ fullScreen: true });
	};

	handleClose = () => {
        this.props.updateFullscreenStatus(false);

		// this.setState({ fullscreen: false });
	};

    render() {
		// const { fullscreen } = this.props;
		const { classes } = this.props;
		const { sustainabilityStatus } = this.props;
		
		const circleColorClass = sustainabilityStatus[sustainabilityStatus.selected]['efficiency'];
		// const fullscreenClass = sustainabilityStatus.fullscreen ? ' fullscreen' : '';

        return (
            <div className={ classes.root }>
                <div className={'sustainabilityStatusCircleContainer ' + circleColorClass} onClick={ this.handleOpen }>
                    <div className={ 'sustainabilityStatusCircle' }>
                        <SceneContainer />
                    </div>
					{ !sustainabilityStatus.fullscreen &&
						<svg className={ classes.circleBorder } version='1.1' id='L1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 100 100'>
							<circle cx='50' cy='50' r='48'/>
						</svg>
					}
                </div>

                { sustainabilityStatus.fullscreen &&
                    <IconButton className={ classes.backButton } onClick={ this.handleClose } aria-label='Back'>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                }
            </div>
        );
    }
}

SustainabilityStatusCircle.propTypes = {
	// fullscreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(SustainabilityStatusCircle);
// export default withStyles(styles)(withMobileDialog()(SustainabilityStatusCircle));