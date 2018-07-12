import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import grey from '@material-ui/core/colors/grey';

// Local import
import ImageCircle from '../../ImageCircle';
import RoomNavigation from './RoomNavigation';
import controlsImage from '../../assets/controls.jpg';

const styles = theme => ({
    root: {
        //textAlign: 'left',
    },
    imageCircle: {
        marginTop: 48,
    },
    pageTitle: {
        //textAlign: 'center',
        paddingTop: 48,
        paddingBottom: 16,
    },
    /*controlsTitle: {
        paddingTop: 16,
        paddingLeft: 16,
    },
	roomsBarContainer: {
		boxShadow: 'none',
	},
	roomsBarTab: {
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: grey[100],
		marginLeft: 5,
		marginRight: 5,
		minWidth: 120,
	},*/
});

function TabContainer({ children, dir }) {
	return (
		<Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};


class Controls extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
				<div className='col-md-5'>
                    <div className='hidden-lg'>
                        <ImageCircle gutterTop imageSource={ controlsImage }/>
                    </div>

                    <div className='hidden-md hidden-sm hidden-xs'>
                        <ImageCircle imageSource={ controlsImage }/>
                    </div>
				</div>

				<div className='col-md-6'>
                    <div className='hidden-lg'>
						<h1>Control your room</h1>
					</div>

                    <div className='hidden-md hidden-sm hidden-xs'>
                        <h1 className={ classes.pageTitle }>Control your room</h1>
                    </div>
					
					<RoomNavigation />
				</div>
            </div>
        );
    }
}

Controls.propTypes = {
	classes: PropTypes.object.isRequired,
	//theme: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Controls));