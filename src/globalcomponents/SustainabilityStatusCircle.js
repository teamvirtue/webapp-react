import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Local import
import { SceneContainer } from '../containers/SceneContainer';
import SustainabilityCards from '../globalcomponents/SustainabilityCards';
// import Scene from '../threejs/Scene';
// import ThreeEntryPoint from '../threejs/ThreeEntryPoint';

const styles = theme => ({
	root: {
		overflow: 'hidden',
	},
	bottomContent: {
        position: 'absolute',
		width: '75vw',
        top: 'auto',
		left: '12.5vw',
        bottom: 50,
		zIndex: 15,
	},
    backButton: {
        position: 'absolute',
        top: 12,
        right: 'auto',
        left: 25,
        bottom: 'auto',
		color: 'black',
    },
    subNavBarContainerTab: {
        textAlign: 'center',
        lineHeight: '24px',
        transition: 'font-size 100ms',
		color: theme.palette.primary.main,
        padding: '7px 25px',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    subNavBarContainerTabSelected: {
        // color: 'white',
        fontWeight: 'bold',
        fontSize: '3.5vw',
    },
});

class SustainabilityStatusCircle extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            tab: this.props.sustainabilityStatus.selected,
            // fullscreen: false,
        };
    }*/

	handleOpen = () => {
        this.props.updateFullscreenStatus(true);
        // this.setState({ fullScreen: true });
	};

	handleClose = () => {
        this.props.updateFullscreenStatus(false);
        // this.setState({ fullscreen: false });
	};

    setActiveTab = (tab) => (event) => { // TODO: check event variable
        // this.setState({ tab });
        this.props.updateSustainabilityStatus(tab);
    };

    render() {
		const { classes, sustainabilityStatus } = this.props;
        const tab = this.props.sustainabilityStatus.selected;
        let circleColorClass = sustainabilityStatus[sustainabilityStatus.selected]['efficiency'];;

        /*if (sustainabilityStatus.selected) {
            const circleColorClass = sustainabilityStatus[sustainabilityStatus.selected]['efficiency'];
        }*/
		// const fullscreenClass = sustainabilityStatus.fullscreen ? ' fullscreen' : '';

        // console.log(this.props.sustainabilityStatus.fullscreen);

        return (
            <div className={ classes.root }>
                <div className={'sustainabilityStatusCircleContainer ' + circleColorClass} onClick={ this.handleOpen }>
					<div className='vignette'></div>
                    <div className={ 'sustainabilityStatusCircle' }>
                        <SceneContainer view={ this.props.view } />
                    </div>
                </div>

				<div className='sustainabilityStatusCircleFullscreen'>
					{ sustainabilityStatus.fullscreen &&
						<div>
							<div className={ classes.bottomContent }>
								<div className='subNavBarContainerFullscreen'>
									<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'linq' ? classes.subNavBarContainerTabSelected : '' ) } onClick={ this.setActiveTab('linq') }>
										LINQ
									</div>
									<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'mylinq' ? classes.subNavBarContainerTabSelected : '' )} onClick={ this.setActiveTab('mylinq') }>
										My LINQ
									</div>
									<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'district' ? classes.subNavBarContainerTabSelected : '' )} onClick={ this.setActiveTab('district') }>
										District
									</div>
								</div>
								
								<SustainabilityCards />
							</div>

							<IconButton className={ classes.backButton } onClick={ this.handleClose } aria-label='Back'>
								<Icon>arrow_back</Icon>
							</IconButton>
						</div>
					}
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