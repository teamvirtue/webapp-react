import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';	
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	root: {
        /*height: '100%',
        width: '100%',
		backgroundColor: 'blue',*/
	},
	circle: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		/*top: '2%',
		left: '2%',*/
		overflow: 'hidden',
		animation: 'borderGradient 2s 100ms infinite alternate',
		borderRadius: '50%',
	},
	circleBorder: {
		cursor: 'pointer',
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: '0',
		top: '0',
		fill: 'none',
		stroke: theme.palette.primary.main,
		strokeWidth: '0',
		strokeDasharray: '12',
		strokeDashoffset: '0',
		strokeLinecap: 'square',
		animation: 'startProgress 1500ms ease-out, continueProgress 15s 1500ms linear infinite',
		animationFillMode: 'forwards',
		pointerEvents: 'none',
	},
	dialogSmall: {
		minWidth: 350,
	},
	dialogFull: {
		minWidth: 0,
	},
});

function Transition(props) {
	return <Grow {...props} />;
}

class LinqStatus extends Component {
    /*constructor(props) {
        super(props);
    }*/

    componentDidMount() {
        // ThreeEntryPoint(this.threeRootElement);
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
		const { fullScreen } = this.props;
		const { classes } = this.props;

        return (
			<div className={ classes.root }>
				<div className='linqStatusCircle' onClick={ this.handleClickOpen }>
					<div className={ classes.circle }>
                        <Scene />
                    </div>
					<svg className={ classes.circleBorder } version='1.1' id='L1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 100 100'>
						<circle cx='50' cy='50' r='48'/>
					</svg>
				</div>
				
				<Dialog
					fullScreen={ fullScreen }
					open={ this.state.open }
					TransitionComponent={Transition}
					onClose={ this.handleClose }
					classes={{
						paperWidthSm: classes.dialogSmall,
						paperFullScreen: classes.dialogFull,
					}}
				>
					<DialogContent>
						<div>Tips about LINQ</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={ this.handleClose } color='primary'>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</div>
        );
    }
}

LinqStatus.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    //src: PropTypes.string.isRequired,
};

export default withStyles(styles)(withMobileDialog()(LinqStatus));