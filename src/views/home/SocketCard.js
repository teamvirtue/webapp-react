import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

// custom import
import socketPlan from '../../assets/kitchen.jpg';

const styles = { //theme
    root: {
        // backgroundColor: 'lightblue',
    },
    card: {
        minWidth: 275,
        maxWidth: 600,
        margin: '15px auto',
        textAlign: 'left',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    controls: {
        justifyContent: 'space-between',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
	},
	button: {
		margin: 8, //theme.spacing.unit,
	},
	buttonIcon: {
		marginRight: 8, //theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
};

class SocketCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClickOpen = (event) => {
        this.setState({ open: true });

        console.log(event);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;

        return (
            <div className={ classes.root }>
                <Card className={ classes.card } >
                    <CardMedia
                        className={ classes.media }
                        image={ socketPlan }
                        title='New Appliance Connected'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='headline' component='h2'>
                            { this.props.title }
                        </Typography>
                        <Typography component='p'>
                            { this.props.children }
                        </Typography>
                    </CardContent>
                    <CardActions className={ classes.controls }>
                        <Button
                            className={ classes.button }
                            onClick={ this.handleClickOpen }
                            variant='raised'
                            color='primary'
                        >
                            <Icon className={ classes.buttonIcon }>touch_app</Icon>
                            Specify appliance
                        </Button>
                        <Button color='secondary'>
                            Ignore
                        </Button>
                    </CardActions>
                </Card>

                <Dialog
                    fullScreen={ fullScreen }
                    open={ this.state.open }
                    onClose={ this.handleClose }
                    aria-labelledby='responsive-dialog-title'
                >
                    <DialogTitle id='responsive-dialog-title'>Choose from list of appliances</DialogTitle>
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

SocketCard.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles, withMobileDialog())(SocketCard);