import React, { Component } from 'react';
import Axios from 'axios';
import Line from '../reports/appliances/Label';


class Request extends React.Component {

  constructor() {
    super()
    this.request_url = "http://localhost:8000";
    this.request_username = "delta";
    this.request_password = "deltadelta";
    this.state = {
      array: [],
      token: [],

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

  getAxios() {
    return this.request_axios;
  }
  getRequest(url, token) {
    //console.log(this.request_axios);
    console.log(token);
    const instance = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.state.token },
    });
    console.log(instance);
    instance.get(url, {
      timeout: 5000
    }).then((response) => {
      this.state.array.push(response.data);
      console.log(this.state.array);
    });
  }

  getLines() {
    const line = this.state.array.map((index) => {
      <li key={index.toString()}>{index}</li>
    });
    console.log(line);
    return (
      <ul>
        {line}
      </ul>
    );
  }
  render() {

    return (
      this.state.array.map(item => {
        <div key={item.url} >
          <h1>{item.username.toString()}</h1>
          <h1>{item.email}</h1>
          <h1>{item.is_staff}</h1>
          <hr></hr>
        </div>
      }),
      < div >
        <getLines>dsadsada</getLines>
        {/* <button onClick={() => this.getLines(this.state.array)}>GetLines</button> */}
        {/* <Line data={this.state.array}></Line> */}
        <button onClick={() => this.getRequest(this.props.url, this.state.token)}>Refresh</button>
      </div >


    );
  }
}
export default Request;