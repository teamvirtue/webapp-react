import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import List, { ListItem, ListItemText } from 'material-ui/List';

import WasherDryer from './appliances/WasherDryer';

const styles = theme => ({
    subNavContainer: {
		width: "30%",
		maxWidth: 175,
		float: "left",
		whiteSpace: "nowrap",
    },
    subNavList: {
        backgroundColor: grey[200],
    },
    subNavContent: {
		width: "70%",
		float: "left",
    },
    checked: {
        color: theme.palette.primary.main,
    },
	listItemGutters: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});

let appliances = [
    { value: 'Washer-dryer', component: <WasherDryer />, key: 1 },
    { value: 'Dishwasher', component: '', key: 2 },
    { value: 'Oven', component: '', key: 3 },
    { value: 'Kitchen', component: '', key: 4 },
    { value: 'Music System', component: '', key: 5 },
    { value: 'TV', component: '', key: 6 },
    { value: 'Laptop', component: '', key: 7 },
    { value: 'Lights', component: '', key: 8 },
    { value: 'Clock', component: '', key: 9 },
    { value: 'Car', component: '', key: 10 },
];

class ApplianceNavigation extends Component {
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
			<div>
				<div className={classes.subNavContainer}>
					<List component='nav' className={ classes.subNavList }>
						{ appliances.map(data => {
							return (
								<ListItem classes={{
										gutters: classes.listItemGutters,
									}} button onClick={ () => this.handleClick(data.key) }>
									<ListItemText primary={data.value} classes={{ primary: value === data.key ? classes.checked : 'unchecked' }} />
								</ListItem>
							);
						}) }
					</List>
				</div>
				<div className={classes.subNavContent}>
					{ appliances.map(data => {
						return (
							value === data.key && data.component
						);
					}) }
				</div>
            </div>
        );
    }
}

ApplianceNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplianceNavigation);