import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = theme => ({
    root: {
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
	buttonIcon: {
		marginRight: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
    /*pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },*/
});

class AdviceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ignored: false,
        };
    }

    handleClick = (event) => {
        console.log('hi');
        // this.setState({ ignored: !this.state.ignored });
    };

    handleClickIgnore = (event) => {
        this.setState({ ignored: true });
        console.log(this.state.ignored);
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={ classes.root }>
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
                        onClick={ this.handleClick }
                        variant='raised'
                        color='primary'
                    >
                        <Icon className={ classes.buttonIcon }>{ this.props.buttonIcon }</Icon>
                        { this.props.buttonText }
                    </Button>
                    <Button
                        onClick={ this.handleClickIgnore }
                        color='secondary'
                    >
                        Ignore
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

AdviceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviceCard);