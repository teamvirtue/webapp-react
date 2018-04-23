import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import LineChart from '../LineChart';

class HVAC extends Component {

    render() {
		const classes = this.props;
		
        return (
            <div>
				<List>
					
					<Typography className={ classes.controlsTitle } type='subheading'>
						Chart
					</Typography>
					
					{/*<LineChart />*/}
					
					<Divider/>

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

export default HVAC;