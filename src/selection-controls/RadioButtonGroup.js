import React, { Component } from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

class RadioButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'week',
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        // const { value } = this.state;

        return (
            <RadioGroup
                aria-label='time'
                name='time'
                className='RadioGroup'
                value={this.state.value}
                onChange={this.handleChange}
                row
            >
                <FormControlLabel style={{display: 'inline', margin: 0}} value='week' control={<Radio />} label='Week' />
                <FormControlLabel style={{display: 'inline', margin: 0}} value='month' control={<Radio />} label='Month' />
                <FormControlLabel style={{display: 'inline', margin: 0}} value='year' control={<Radio />} label='Year' />
            </RadioGroup>
        );
    }
}

/*Reports.propTypes = {
    theme: PropTypes.object.isRequired,
};*/

export default (RadioButtonGroup);