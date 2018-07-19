import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import SwichRequest from '../../axios_requests/SwichRequest.js';
import SliderRequest from '../../axios_requests/SliderRequest.js';



class Light extends Component {
    constructor(props) {
        super(props);
    }
    
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

	render() {
		const { theme } = this.props;
		return (
			<div>
				<Typography variant="title" gutterBottom>
					Lights
				</Typography>

				<ListItem>
					<ListItemIcon>
						<Icon>power_settings_new</Icon>
					</ListItemIcon>

					<ListItemText primary='Power' />

					<ListItemSecondaryAction>
						<SwichRequest url={this.props.url} ></SwichRequest>
					</ListItemSecondaryAction>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<Icon>lightbulb_outline</Icon>
					</ListItemIcon>
          <SliderRequest url={this.props.url} ></SliderRequest>


				</ListItem>
				<ListItem
					button
					aria-haspopup='true'
					aria-controls='lorem-ipsum'
					aria-label='Lorem ipsum'
					// onClick={this.handleClickListItem}
				>
					<ListItemIcon>
						<Icon>color_lens</Icon>
					</ListItemIcon>

					<ListItemText primary='Colors' secondary='Choose colors of your lights' />
				</ListItem>
			</div>
		);
	}
}

export default Light;
