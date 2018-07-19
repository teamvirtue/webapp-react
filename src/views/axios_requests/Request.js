import React, { Component } from 'react';
import Axios from 'axios';
import Line from '../reports/appliances/Label';


class Request extends React.Component {

  constructor() {
    super()
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
  update(url, instance){
    console.log("this is IN");
    instance.get(url, {
      timeout: 5000
    }).then((response) => {
      this.state.array.push(response.data);
      this.props.onDataChange(this.state.array);
    });
  }
  getDataArray() {
    return this.state.array;
  }
  getAxios() {
    return this.request_axios;
  }
  getRequest(url, token) {
    console.log(token);
    const instance = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.state.token },
    });
    this.interval = setInterval(() => this.update(url,instance), 5000);
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
  stop() {
    clearInterval(this.interval);
  }
  render() {

    return (
      <div>
        <button onClick={() => this.getRequest(this.props.url, this.state.token)}>Start</button>
        <button onClick={() => this.stop()}>stop</button>
      </div >


    );
  }
}
export default Request;
