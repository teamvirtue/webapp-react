import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const styles = theme => ({
    navContainer: {
        backgroundColor: grey[200],
    },
    checked: {
        color: theme.palette.primary.main,
    },
});

class RoomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            selectedValue: 0,
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

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
				<List component='nav' className={ classes.navContainer }>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(0) }>
						<ListItemText primary='All' classes={{ primary: value === 0 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(1) }>
						<ListItemText primary='Living room' classes={{ primary: value === 1 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(2) }>
						<ListItemText primary='Dinner room' classes={{ primary: value === 2 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(3) }>
						<ListItemText primary='Bed room' classes={{ primary: value === 3 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(4) }>
						<ListItemText primary='Bathroom' classes={{ primary: value === 4 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(5) }>
						<ListItemText primary='Hallway' classes={{ primary: value === 5 ? classes.checked : 'unchecked' }} />
					</ListItem>
					<ListItem className={ classes.listItem } button onClick={ () => this.handleClick(6) }>
						<ListItemText primary='Outdoor' classes={{ primary: value === 6 ? classes.checked : 'unchecked' }} />
					</ListItem>
				</List>

				{ value === 0 && <div>asdf</div> }
				{ value === 1 && <div>asdf2</div> }
				{ value === 2 && <div>asdf3</div> }
				{ value === 3 && <div>asdf4</div> }
            </div>
        );
    }
}

RoomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomNavigation);