import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
//import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
    card: {
        minWidth: 275,
        margin: '10px 0',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

function SimpleCard(props) {
    const { classes } = props;

    return (
        <Card className={ classes.card }>
            <CardContent>
                <Typography variant="headline" component="h1">
                    Lorem ipsum
                </Typography>
                <Typography component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="Add to favorites">
                    <Icon>info</Icon>
                </IconButton>
                <IconButton aria-label="Share">
                    <Icon>info</Icon>
                </IconButton>
                {/*<Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>*/}
            </CardActions>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);