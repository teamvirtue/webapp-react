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
		marginBottom:20,
	},
    card: {
        minWidth: 275,
        maxWidth: 600,
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
	constructor() {
		super();
		this.state = { cardHeight: "" };
		this.updateCardHeight = this.updateCardHeight.bind(this);
	}
	
	componentDidMount() {
		this.updateCardHeight();
	}

    handleDismissCard = (event, id) => {
        this.props.dispatch(id);
        // console.log(event, id);
        // this.props.onDismissCard(this.props.id);
    };
	
	updateCardHeight() {
		if (this.state.cardHeight !== this.div.clientHeight){
			this.setState({ cardHeight: this.div.clientHeight })
		}
	}
	

    render() {
        const { classes, id } = this.props;

        return (
            <div className={ classes.root } ref={ div => { this.div = div; } } style={{height: `${this.state.cardHeight}px`}}>
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
                            onClick={ (event) => this.handleDismissCard(event, id) }
                            variant='raised'
                            color='primary'
                        >
                            <Icon className={ classes.buttonIcon }>{ this.props.buttonIcon }</Icon>
                            { this.props.buttonText }
                        </Button>
                        <Button
                            onClick={ (event) => this.handleDismissCard(event, id) }
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
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdviceCard);