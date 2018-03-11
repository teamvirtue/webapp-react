import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import './ImageCircle.css';

const styles = {
    /*root: {
        backgroundColor: 'firebrick'
    },*/
};

class ImageCircle extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        return (
            <div className='circleContainer'>
                <img className='circle' src={ this.props.imageSource } alt='circle'/>
            </div>
        );
    }
}

ImageCircle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageCircle);