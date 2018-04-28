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

const styles = theme => ({
    root: {
        // backgroundColor: 'lightblue',
    },
    card: {
        minWidth: 275,
        maxWidth: 500,
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
		margin: theme.spacing.unit,
	},
	buttonIcon: {
		marginRight: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
});

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
            <div>
                <Card className={ classes.root } >
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
                    <DialogTitle id='responsive-dialog-title'>{ "Use Google's location service?" }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.handleClose } color='primary'>
                            Disagree
                        </Button>
                        <Button onClick={ this.handleClose } color='primary' autoFocus>
                            Agree
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