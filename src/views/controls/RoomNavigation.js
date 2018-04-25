import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import List, { ListItem, ListItemText } from 'material-ui/List';

import All from './rooms/All';
import LivingRoom from './rooms/LivingRoom';
import DinnerRoom from './rooms/DinnerRoom';

const styles = theme => ({
    subNavContainer: {
		width: '30%',
		maxWidth: 175,
		float: 'left',
		whiteSpace: 'nowrap',
    },
    subNavList: {
        backgroundColor: grey[200],
    },
    subNavContent: {
		width: '70%',
		float: 'left',
    },
    checked: {
        color: theme.palette.primary.main,
    },
	listItemGutters: {
		paddingLeft: 15,
		paddingRight: 15,
	},
});

let rooms = [
    { id: 1, value: 'All', component: <All key={ 1 } />, },
    { id: 2, value: 'Living Room', component: <LivingRoom key={ 2 } />, },
    { id: 3, value: 'Dinner Room', component: <DinnerRoom key={ 3 } />, },
    { id: 4, value: 'Bedroom', component: '', },
    { id: 5, value: 'Bathroom', component: '', },
    { id: 6, value: 'Hallway', component: '', },
    { id: 7, value: 'Outdoor', component: '', },
];

class RoomNavigation extends Component {
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
				<div className={ classes.subNavContainer }>
					<List component='nav' className={ classes.subNavList }>
						{ rooms.map(data => {
							return (
								<ListItem key= { data.id } classes={{
										gutters: classes.listItemGutters,
									}} button onClick={ () => this.handleClick(data.id) }>
									<ListItemText primary={ data.value } classes={{ primary: value === data.id ? classes.checked : 'unchecked' }} />
								</ListItem>
							);
						}) }
					</List>
				</div>
				<div className={ classes.subNavContent }>
					{ rooms.map(data => {
						return (
							value === data.id && data.component
						);
					}) }
				</div>
            </div>
        );
    }
}

RoomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomNavigation);