import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
		position: 'relative',
        transition: 'all 1s ease-in-out',
    },
	subNavBarContainerTab: {
		color: 'white',
		textAlign: 'center',
		lineHeight: '24px',
		transition: 'font-size 100ms',
		borderBottom: '3px solid transparent',
		padding: '10px 0',
		'&:hover': {
			cursor: 'pointer',
		}
	},
	subNavBarContainerTabSelected: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: '3.5vw',
		borderColor: '#f3f3f3',
	},
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    iconSmall: {
        fontSize: 25,
    },
});


class Home extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            tab: this.props.sustainabilityStatus.selected,
        };
    }*/

	setActiveTab = (tab) => (event) => { // TODO: what is newTab doing and why does it not work without?
        // event.preventDefault();
		// this.setState({ tab });
		this.props.updateSustainabilityStatus(tab);
	};

    render() {
        const { classes, temperature, localNewsHeadlines } = this.props;
		const tab = this.props.sustainabilityStatus.selected;

        return (
            <div className={ classes.root }>
				<div className='subNavBarContainer row'>
					<div className='col-4'>
						<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'linq' ? classes.subNavBarContainerTabSelected : '' ) } onClick={ this.setActiveTab('linq') }>
							LINQ
						</div>
					</div>
					<div className='col-4'>
						<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'mylinq' ? classes.subNavBarContainerTabSelected : '' )} onClick={ this.setActiveTab('mylinq') }>
							My LINQ
						</div>
					</div>
					<div className='col-4'>
						<div className={ classes.subNavBarContainerTab + ' ' + ( tab === 'district' ? classes.subNavBarContainerTabSelected : '' )} onClick={ this.setActiveTab('district') }>
							District
						</div>
					</div>
				</div>

				<div>
					{ tab === 'linq' &&
                        <div className={ 'row' }>
							<h1>{ temperature.outside.celsius }°</h1>
							<p>{ temperature.outside.description }</p>
						</div>
					}
					{ tab === 'mylinq' &&
						<div className={ 'row' }>
							<div className='col-6 homeInfoBox'>
								<h1>{ temperature.outside.celsius }°</h1>
								<p>temperature</p>
							</div>
							<div className='col-6 homeInfoBox'>
								<h1>{ temperature.outside.celsius }°</h1>
								<p>temperature</p>
							</div>
						</div>
					}
					{ tab === 'district' &&
                        <div className={ 'row' }>
							News:
							Powered by News API
							{ Object.keys(localNewsHeadlines.byId).map((id) => {
                                let card = localNewsHeadlines.byId[id];

                                return card.visible ?
                                    <div key={id}>{ card.description }</div>
                                    : null;
                            }) }
						</div>
					}
				</div>
			</div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Home));