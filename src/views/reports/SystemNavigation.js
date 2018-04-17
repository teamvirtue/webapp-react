import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HVAC from './systems/HVAC';

const styles = theme => ({
    navWrapper: {
		maxWidth: 175,
    },
    navContainer: {
        backgroundColor: grey[200],
    },
    checked: {
        color: theme.palette.primary.main,
    },
	listItemGutters: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});

let systems = [
    { value: 'HVAC', component: <HVAC />, key: 1 },
    { value: 'Water System', component: '', key: 2 },
    { value: 'Battery', component: '', key: 3 },
    { value: 'Grid', component: '', key: 4 },
    { value: 'Solar Panels', component: '', key: 5 },
    { value: 'Smart System', component: '', key: 6 },
    { value: 'Wi-Fi', component: '', key: 7 },
];

class SystemNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleClick = (id, event) => {
        this.setState({
            value: id,
        });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
			<div className='row'>
				<div className={["col-xs-5", classes.navWrapper].join(' ')}>
					<List component='nav' className={ classes.navContainer }>
						{ systems.map(data => {
							return (
								<ListItem classes={{
										gutters: classes.listItemGutters,
									}}
									button onClick={ () => this.handleClick(data.key) }>
									<ListItemText primary={data.value} classes={{ primary: value === data.key ? classes.checked : 'unchecked' }} />
								</ListItem>
							);
						}) }
					</List>
				</div>
				<div className='col-xs-7'>
					{ systems.map(data => {
						return (
							value === data.key && data.component
						);
					}) }
				</div>
            </div>
        );
    }
}

SystemNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SystemNavigation);