import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

// Local import
import LineChart from '../LineChart';

class WasherDryer extends Component {

    render() {
		const classes = this.props;
		
        return (
            <div>
				<List>
					
					<ListSubheader>Consumption</ListSubheader>
					
					{<LineChart />}
					
					<ListSubheader>Status</ListSubheader>

					<div className='statusBar'>
						<div className='statusItem'>
							<h3>Feb</h3><h1>18</h1>
							<Typography type='subheading' gutterBottom>
								Last maintenance
							</Typography>
						</div>
						<div className='statusItem'>
							<Icon className={ classes.icon }>check_circle</Icon>
							<Typography type='subheading' gutterBottom>
								Operating normally
							</Typography>
						</div>
					</div>

				</List>
			</div>
        );
    }
}

export default WasherDryer;