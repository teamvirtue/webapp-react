import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
	root: {
		marginBottom:10,
	},
	bordered: {
		border: '3px solid ' + theme.palette.primary.main,
	},
    card: {
        /*minWidth: 275,
        maxWidth: 600,*/
        textAlign: 'left',
    },
    controls: {
        /*justifyContent: 'space-between',*/
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
                <Card className={ classes.card + (this.props.bordered ? ' ' + classes.bordered : '') }>
                    <CardContent>
                        <Typography variant='headline' className={ classes.title } component='h1'>
                            { this.props.title }
                        </Typography>

                        <Typography component='p'>
                            { this.props.children }
                        </Typography>
                    </CardContent>
                    <CardActions className={ classes.controls }>
						{ this.props.buttonText !== '' && 
							<Button
								className={ classes.button }
								onClick={ (event) => this.handleDismissCard(event, id) }
								variant='contained'
								color='primary'
							>
								<Icon className={ classes.buttonIcon }>{ this.props.buttonIcon }</Icon>
								{ this.props.buttonText }
							</Button>
						}
                        <Button
                            onClick={ (event) => this.handleDismissCard(event, id) }
                            color='primary'
                        >
                            Close
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