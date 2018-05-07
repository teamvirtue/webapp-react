import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  // DialogContentText,
  // DialogTitle,
  // withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';

import HVAC from './systems/HVAC';

const styles = theme => ({
    subNavContainer: {
		whiteSpace: 'nowrap',
    },
    subNavItem: {
		marginTop: 10,
		marginBottom: 10,
		display: 'table',
    },
    subNavItemPaper: {
        backgroundColor: grey[200],
		height: 120,
		cursor: 'pointer',
		display: 'table-cell',
		verticalAlign: 'middle',
	},
});

let systems = [
    { id: 1, value: 'HVAC', icon: 'toys', component: <HVAC /> },
    { id: 2, value: 'Water System', icon: 'invert_colors', component: '' },
    { id: 3, value: 'Battery', icon: 'battery_full', component: '' },
    { id: 4, value: 'Grid', icon: 'power', component: '' },
    { id: 5, value: 'Solar Panels', icon: 'view_column', component: '' },
    { id: 6, value: 'Smart System', icon: 'developer_board', component: '' },
    { id: 7, value: 'Wi-Fi', icon: 'wifi', component: '' },
];

class SystemNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 1,
			openDialog: false,
        };
    }

    handleClick = (id, event) => {
        this.setState({
            currentId: id,
        });
    };
	
	handleDialogOpen = () => {
		this.setState({ openDialog: true });
	};

	handleDialogClose = () => {
		this.setState({ openDialog: false });
	};

    render() {
        const { classes } = this.props;
        const { currentId } = this.state;

        return (
			<div>
				<div className="row">
					<div className={ classes.subNavContainer }>
						{ systems.map(data => {
							return (
								<div key={ data.id } className={[classes.subNavItem, "col-xs-4"].join(' ')}>
									<Paper className={classes.subNavItemPaper} elevation={1} onClick={ () => { this.handleClick(data.id);this.handleDialogOpen(); } }>
										<Icon color="primary" style={{ fontSize: 30 }}>{ data.icon }</Icon>
										<Typography component="p">
											{ data.value }
										</Typography>
									</Paper>
								</div>
							);
						}) }
					</div>
				</div>
				
				
				<Dialog
					open={this.state.openDialog}
					transition={Grow}
					onClose={this.handleDialogClose}
				>
					<DialogContent>
						{ systems.map(data => {
							if(currentId === data.id){
								return (
									<div key={ data.id }>
										{ data.component }
									</div>
								);
							}
							return false;
						}) }
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDialogClose} color="secondary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
            </div>
        );
    }
}

SystemNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SystemNavigation);