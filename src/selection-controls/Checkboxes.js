import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import './Checkboxes.css';

/*const styles = {
    checked: {
        color: green[500],
    },
};*/

class CheckboxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usage: false,
            generation: true,
        };
    }

    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });
    };

    /*handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };*/

    render() {
        // const { classes } = this.props;

        return (
            <FormGroup className='FormGroup' row>
                <FormControlLabel
                    control= {
                        <Checkbox
                            checked={ this.state.usage }
                            onChange={ this.handleChange('usage') }
                            value='usage'
                        />
                    }
                    label='Usage'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={ this.state.generation }
                            onChange={ this.handleChange('generation') }
                            value='generation'
                        />
                    }
                    label='Generation'
                />
            </FormGroup>
        );
    }
}

/*CheckboxGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};*/

export default (CheckboxGroup);