import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';	
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import withMobileDialog from '@material-ui/core/withMobileDialog';
// import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	/*root: { // TODO: remove root
        height: '100%',
        width: '100%',
		backgroundColor: 'blue',
	},*/
	/*circle: {
        position: 'absolute',
        height: '40vh',
        width: '40vh',
        left: 0,
        right: 0,
        margin: 'auto',
        // marginTop: '25vh',
		overflow: 'hidden',
		borderRadius: '50%',
		transition: 'all 200ms ease-out',
	},*/
    circleFullscreen: { // TODO: animate transition
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderRadius: 0,
        transition: 'all 200ms ease-out',
    },
	circleBorder: {
        // position: 'absolute',
		cursor: 'pointer',
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
		transition: 'all 200ms ease-out',
        // transform: 'scale(1.2)',
	},
    /*fullScreen: {
        WebkitTransform: 'scale(2)',
        transform: 'scale(2)',
    },*/
	dialogSmall: {
		minWidth: 550,
	},
	dialogFull: {
		minWidth: 0,
	},
});

/*function Transition(props) {
	return <Grow { ...props } />;
}*/

class SustainabilityStatusCircle extends Component {
    /*constructor(props) {
        super(props);
    }*/

	state = {
        fullScreen: false,
	};

	handleClickOpen = () => {
		this.setState({ fullScreen: true });
	};

	handleClose = () => {
		this.setState({ fullScreen: false });
	};

    render() {
		// const { fullScreen } = this.props;
		const { fullScreen } = this.state;
		const { classes } = this.props;
		const { sustainabilityStatus } = this.props;
		
		const circleColorClass = sustainabilityStatus[sustainabilityStatus.selected]['efficiency'];
		const fullScreenClass = fullScreen ? ' fullScreen' : '';
		// const fullScreenClass = this.state.open ? classes.fullScreen : null;

        return (
            <div className={ 'sustainabilityStatusCircle' + fullScreenClass + ' ' + circleColorClass }>
                <div className={ fullScreen ? classes.circleFullscreen : 'sustainabilityStatusScene' } onClick={ this.handleClickOpen }>
                    <Scene fullScreen={ fullScreen }/>
                </div>

                <div className={ 'circleBorderContainer' + fullScreenClass }>
                    <svg
                        className={ classes.circleBorder }
                        version='1.1'
                        id='L1'
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        viewBox='0 0 100 100'
                    >
                        <circle cx='50' cy='50' r='48'/>
                    </svg>
                </div>
            </div>
        );
    }
}

SustainabilityStatusCircle.propTypes = {
	// fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(SustainabilityStatusCircle);
// export default withStyles(styles)(withMobileDialog()(SustainabilityStatusCircle));