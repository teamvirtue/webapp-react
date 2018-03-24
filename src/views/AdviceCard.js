import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 500,
        margin: '15px auto',
        textAlign: 'left',
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
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
    /*pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },*/
});

function AdviceCard(props) { // TODO: function or class?
    const { classes } = props;

    return (
		<div>
			<Card className={ classes.card }>
				<CardContent>
					<Typography variant='headline' className={ classes.title } component='h1'>
						{ props.title }
					</Typography>
				   {/* <Icon>info</Icon>*/}
					<Typography component='p'>
						{ props.children }
					</Typography>
				</CardContent>
				<CardActions className={ classes.controls }>
					<Button className={classes.button} variant="raised" color="primary">
						{props.buttonText}
						<Icon className={classes.rightIcon}>{ props.buttonIcon }</Icon>
					</Button>
					<Button color="secondary">
						Ignore
					</Button>
				</CardActions>
			</Card>
		</div>
    );
}

AdviceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviceCard);