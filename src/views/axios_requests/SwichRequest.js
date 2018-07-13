import React, { Component } from 'react';
import Axios from 'axios';
import Line from '../reports/appliances/Label';
import Switch from '@material-ui/core/Switch';

class SwichRequest extends React.Component {

  constructor(props) {
    super(props);
    this.request_url = "http://localhost:8000";
    this.request_username = "delta";
    this.request_password = "deltadelta";
    this.state = {
      array: [],
      token: [],
      checkedLightOnOff: false,
    }
  }

  componentDidMount() {
    this.getToken();
  }
  getToken() {
    Axios.post("http://localhost:8000/api/auth/token/", "username=delta&password=deltadelta")
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

  patchRequest(url, value) {
    console.log(url);
    const instance = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.state.token },
    });
    instance.patch(url,
      {
          "brightness": value,
      }
    );
    console.log(this.state.checkedLightOnOff);
  }

  handleChange = name => (event, checked) => {
      this.patchRequest(this.props.url,80);
      this.setState({ [name]: checked });
  };
  render() {

    return (
      <div>
        <Switch
          checked={ this.state.checkedLightOnOff }
          onChange={ this.handleChange('checkedLightOnOff') }
        />
      </div >
    );
  }
}
export default SwichRequest;
