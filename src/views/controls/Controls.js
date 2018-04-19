import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import RoomNavigation from './RoomNavigation';
// import SwipeableViews from 'react-swipeable-views';
import Typography from 'material-ui/Typography';
/*import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import Tabs, { Tab } from 'material-ui/Tabs';*/
import grey from 'material-ui/colors/grey';

//import './Controls.css';
import ImageCircle from '../ImageCircle';
import myLinqImage from '../../assets/controls.svg';

const styles = theme => ({
    root: {
        //textAlign: 'left',
    },
    pageTitle: {
        //textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 16,
    },
    controlsTitle: {
        paddingTop: 16,
        paddingLeft: 16,
    },
	roomsBarContainer: {
		boxShadow: 'none',
	},
	roomsBarTab: {
		borderWidth: 3,
		borderStyle: 'solid',
		borderColor: grey[200],
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 5,
		minWidth: 120,
	},
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
                <ImageCircle imageSource={ myLinqImage }/>

                <div className='panelView'>
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