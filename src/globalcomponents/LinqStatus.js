import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';	
import Dialog from '@material-ui/core/Dialog';
import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	root: {
        /*height: '100%',
        width: '100%',
		backgroundColor: 'blue',*/
	},
    /*linqStatusCircle: { // TODO: combine with 'circle'
        position: 'fixed',
        display: 'inline-block',
        width: '22vw',
        height: '22vw',
        top: '50%',
        margin: '-11vw 0 0 -11vw',
        transition: 'all 200ms ease-out',
    },*/
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
		animation: 'startProgress 1500ms ease-out, continueProgress 12s 1500ms linear infinite',
		animationFillMode: 'forwards',
	},
});

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

	/*handleClickOpen = () => {
		this.setState({ open: true });
	};*/

	handleClose = () => {
		this.setState({ open: false });
	};

    render() {
		const { classes } = this.props;

        return (
			<div className={ classes.root }>
				<div className='linqStatusCircle' onClick={ this.handleClickOpen }>
				{/*<div className={ classes.linqStatusCircle } onClick={ this.handleClickOpen }>*/}
					{/*<div className={ classes.circle } ref={ element => this.threeRootElement = element } />*/}
					<div className={ classes.circle }>
                        <Scene />
                    </div>
					{/*<svg className={ classes.circleBorder } version='1.1' id='L1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 100 100'>
						<circle cx='50' cy='50' r='46'/>
					</svg>*/}
				</div>
				
				<Dialog
					open={ this.state.open }
					onClose={ this.handleClose }
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