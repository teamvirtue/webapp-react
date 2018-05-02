import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';

const styles = { //theme
    root: {
        // backgroundColor: 'lightblue',
    },
    button: {
        margin: 8, //theme.spacing.unit,
    },
    buttonIcon: {
        marginRight: 8, //theme.spacing.unit,
    },
};

class ResponsiveDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullScreen } = this.props;
        const classes = styles;

        return (
            <div style={ classes.root }>
                <Button
                    style={ classes.button }
                    onClick={ this.handleClickOpen }
                    variant='raised'
                    color='primary'
                >
                    <Icon style={ classes.buttonIcon }>touch_app</Icon>
                    Specify appliance
                </Button>

                <Dialog
                    fullScreen={ fullScreen }
                    open={ this.state.open }
                    onClose={ this.handleClose }
                    aria-labelledby='responsive-dialog-title'
                >
                    <DialogTitle id='responsive-dialog-title'>{ "Choose from list of appliances" }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Lorem ipsum
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } color='primary'>
                            Save
                        </Button>
                        <Button onClick={ this.handleClose } color='primary' autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);