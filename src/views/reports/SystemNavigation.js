import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

// Local import
import HVAC from './systems/HVAC';

const styles = theme => ({
    subNavItem: {
		marginTop: 10,
		marginBottom: 10,
		display: 'table',
		whiteSpace: 'nowrap',
    },
    subNavItemPaper: {
        backgroundColor: grey[100],
		height: 140,
		cursor: 'pointer',
		display: 'table-cell',
		verticalAlign: 'middle',
	},
	dialogSmall: {
		minWidth: 450,
	},
	dialogFull: {
		minWidth: 0,
	},
});

let systems = [
    { id: 1, value: 'HVAC', icon: 'toys', component: <HVAC /> },
    { id: 2, value: 'Water System', icon: 'invert_colors', component: <HVAC /> },
    { id: 3, value: 'Battery', icon: 'battery_full', component: <HVAC /> },
    { id: 4, value: 'Grid', icon: 'power', component: <HVAC /> },
    { id: 5, value: 'Solar Panels', icon: 'view_column', component: <HVAC /> },
    { id: 6, value: 'Smart System', icon: 'developer_board', component: <HVAC /> },
    { id: 7, value: 'Wi-Fi', icon: 'wifi', component: <HVAC /> },
];

function Transition(props) {
	return <Grow {...props} />;
}

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
		const { fullScreen } = this.props;
        const { classes } = this.props;
        const { currentId } = this.state;

        return (
			<div>
				<div className="row">
					{ systems.map(data => {
						return (
							<div key={ data.id } className={ classes.subNavItem + ' col-4' }>
								<Paper className={classes.subNavItemPaper} elevation={1} square={true} onClick={ () => { this.handleClick(data.id);this.handleDialogOpen(); } }>
									<Icon color="primary" style={{ fontSize: 30 }}>{ data.icon }</Icon>
									<Typography component="p">
										{ data.value }
									</Typography>
								</Paper>
							</div>
						);
					}) }
				</div>
				
				
				<Dialog
					fullScreen={ fullScreen }
					open={this.state.openDialog}
					TransitionComponent={Transition}
					onClose={this.handleDialogClose}
					classes={{
						paperWidthSm: classes.dialogSmall,
						paperFullScreen: classes.dialogFull,
					}}
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
						<Button onClick={this.handleDialogClose} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
            </div>
        );
    }
}

SystemNavigation.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SystemNavigation));