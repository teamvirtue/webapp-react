import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
	root: {
		// backgroundColor: 'red',
	},
    card: {
        minWidth: 275,
        maxWidth: 600,
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
    buttonIcon: {
        marginRight: theme.spacing.unit,
    },
	iconSmall: {
		fontSize: 20,
	},
});

class AdviceCard extends Component {
    constructor(props) {
        super(props);
    }
	
    handleDismissCard = () => {
        this.props.onDismissCard(this.props.id);            
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <Card className={ classes.card }>
                    <CardContent>
                        <Typography variant='headline' className={ classes.title } component='h1'>
                            { this.props.title }
                        </Typography>

                        <Typography component='p'>
                            { this.props.children }
                        </Typography>
                    </CardContent>
                    <CardActions className={ classes.controls }>
                        <Button
                            className={ classes.button }
                            onClick={this.handleDismissCard}
                            variant='raised'
                            color='primary'
                        >
                            <Icon className={ classes.buttonIcon }>{ this.props.buttonIcon }</Icon>
                            { this.props.buttonText }
                        </Button>
                        <Button
                            onClick={this.handleDismissCard}
                            color='secondary'
                        >
                            Ignore
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

AdviceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviceCard);