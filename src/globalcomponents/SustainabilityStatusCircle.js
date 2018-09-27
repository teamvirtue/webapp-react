import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
// import Button from '@material-ui/core/Button';
import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	/*root: { // TODO: remove root
        height: '100%',
        width: '100%',
		backgroundColor: 'blue',
	},*/
	circle: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '50%',
        transition: 'all 1s',
    },
    circleFullscreen: {
        borderRadius: 0,
    },
    circleBorder: {
        cursor: 'pointer',
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: '0',
        top: '0',
        fill: 'none',
        strokeWidth: '0',
        strokeDasharray: '12',
        strokeDashoffset: '0',
        strokeLinecap: 'square',
        animation: 'startProgress 1500ms ease-out, continueProgress 15s 1500ms linear infinite',
        animationFillMode: 'forwards',
        pointerEvents: 'none',
        transition: 'all 1s',
    },
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

	handleClickOpen = () => {
        this.props.updateFullscreenStatus(true);

        console.log(this.props.sustainabilityStatus);

        // this.setState({ fullScreen: true });
	};

	handleClose = () => {
		// this.setState({ fullscreen: false });
	};

    render() {
		// const { fullscreen } = this.props;
		// const { fullscreen } = this.state;
		const { classes } = this.props;
		const { sustainabilityStatus } = this.props;
		
		const circleColorClass = sustainabilityStatus[sustainabilityStatus.selected]['efficiency'];
		// const fullscreenClass = sustainabilityStatus.fullscreen ? ' fullscreen' : '';

        return (
            <div className={ classes.root }>
                <div className={'sustainabilityStatusCircle ' + circleColorClass} onClick={ this.handleClickOpen }>
                    <div className={ sustainabilityStatus.fullscreen ? classes.circleFullscreen + ' ' + classes.circle : classes.circle }>
                        <Scene />
                        {/*<Scene fullscreen={ sustainabilityStatus.fullscreen }/>*/}
                    </div>
                    <svg className={ classes.circleBorder } version='1.1' id='L1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 100 100'>
                        <circle cx='50' cy='50' r='48'/>
                    </svg>
                </div>
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