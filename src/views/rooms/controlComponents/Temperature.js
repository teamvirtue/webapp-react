import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import Slider from 'rc-slider';

const styles = theme => ({
	card: {
		marginBottom: 10,
	},
});

const Handle = Slider.Handle;
const handle = (props: HandleProps) => {
    const { value, offset, ...restProps } = props;
    const positionStyle = {
      position: 'absolute',
      left: `${offset-5}%`,
	  top: 15,
	  color: 'rgba(0, 0, 0, 0.54)',
    };

    return (
      <div>
        <span style={positionStyle}>{value}°C</span>
        <Handle value={value} offset={offset} {...restProps} />
      </div>
    );
}

class Temperature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedTemperature: true,
        };
    }
	
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };
	
	render() {
		const { classes, theme } = this.props;
		
		return (
			<div>
				<Typography variant="subheading" gutterBottom>Air conditioning</Typography>
				<Card className={classes.card}>
					<CardContent>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>power_settings_new</Icon>
							</ListItemIcon>
							<ListItemText disableTypography primary='Enable' secondary={
								<Switch
									checked={ this.state.checkedTemperature }
									onChange={ this.handleChange('checkedTemperature') }
									color="primary"
								/>
							}/>
						</ListItem>
						<ListItem disableGutters="true">
							<ListItemIcon>
								<Icon>toys</Icon>
							</ListItemIcon>

							<ListItemText disableTypography primary='Temperature' secondary={
								<Slider
									min={ 10 }
									max={ 25 }
									defaultValue={ 20 }
									trackStyle={{ backgroundColor: theme.palette.primary.main }}
									handle={ handle }
									handleStyle={{
										borderColor: theme.palette.primary.main,
										backgroundColor: theme.palette.primary.main,
									}}
									railStyle={{ backgroundColor: 'lightgray' }}
								/>
							}
							/>
						</ListItem>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withTheme()(withStyles(styles)(Temperature));