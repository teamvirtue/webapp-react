import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({ //theme
    root: {
        // backgroundColor: 'lightblue',
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonIcon: {
        marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class ResponsiveDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 'laptop',
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
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
                    <DialogTitle id='responsive-dialog-title'>{ 'Choose from list of appliances' }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you plug in one of these devices?
                        </DialogContentText>

                        <FormControl component='fieldset' required className={ classes.formControl }>
                            {/*<FormLabel component='legend'>Devices</FormLabel>*/}
                            <RadioGroup
                                aria-label='gender'
                                name='gender1'
                                className={ classes.group }
                                value={ this.state.value }
                                onChange={ this.handleChange }
                            >
                                {/*TODO: implement data dynamically*/}
                                <FormControlLabel value='laptop' control={ <Radio /> } label='Laptop' />
                                <FormControlLabel value='phone' control={ <Radio /> } label='Phone' />
                                <FormControlLabel value='other' control={ <Radio /> } label='Other' />
                            </RadioGroup>

                            <FormHelperText>Lorem ipsum</FormHelperText>
                        </FormControl>
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