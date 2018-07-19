import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Axios from 'axios';
import 'rc-slider/assets/index.css';

const styles = theme => ({

});

class SliderRequest extends React.Component {

  constructor(props) {
    super(props);
    this.request_url = "http://localhost:8000";
    this.request_username = "delta";
    this.request_password = "deltadelta";
    this.state = {
      array: [],
      token: [],
      brightness: 100,
    }
  }

  componentDidMount() {
    this.getToken();
  }
  getToken() {
    Axios.post("http://localhost:8000/api/auth/token/", "username=matahara&password=katinar4e")
      .then((response) => {
        var data = response.data;
        this.setState({ token: data.token });
      });
  }
  getDataArray() {
    return this.state.array;
  }
  getAxios() {
    return this.request_axios;
  }

  patchRequest(url) {
    console.log(url);
    const instance = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.state.token },
    });
    instance.patch(url, {
        "brightness": this.state.brightness,
    }).catch(this.getToken());
  }

  handleChange = name => (event) => {
      this.patchRequest(this.props.url,this.props.query);
      this.setState({ [name]: event });
      console.log(this.state.brightness);
  };

  render() {

    const { theme } = this.props;

    return (
        <ListItemText disableTypography primary='Brightness' secondary={
          <Slider
            min={ 0 }
            max={ 100 }
            defaultValue={ 5 }
            trackStyle={{ backgroundColor: theme.palette.primary.main }}
            handleStyle={{
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main,
            }}
            railStyle={{ backgroundColor: 'lightgray' }}
            onChange={this.handleChange('brightness')}
          />
        }
        />
    );
  }
}
export default withTheme()(withStyles(styles)(SliderRequest));
