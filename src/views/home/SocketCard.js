import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// custom import
import SocketPlan from '../../assets/kitchen.jpg';
import DialogResponsive from './DialogResponsive';

const styles = { //theme
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
    cardActions: {
        justifyContent: 'space-between',
    },
    title: {
        marginBottom: 16,
        fontSize: 20,
	},
};

function SocketCard(props) {
    const { classes } = props;

    return (
        <Card className={ classes.card } >
            <CardMedia
                className={ classes.media }
                image={ SocketPlan }
                title='New Appliance Connected'
            />
            <CardContent>
                <Typography gutterBottom variant='headline' component='h2'>
                    { props.title }
                </Typography>
                <Typography component='p'>
                    { props.children }
                </Typography>
            </CardContent>
            <CardActions className={ classes.cardActions }>
                <DialogResponsive />

                <Button color='secondary'>
                    Ignore
                </Button>
            </CardActions>
        </Card>
    );
}

SocketCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocketCard);