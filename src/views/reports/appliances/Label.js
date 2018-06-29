import React, { Component } from 'react';
export default class Line extends React.Component {
  constructor() {
    super();

  }

  componentDidMount() {

  }

  render() {
    console.log(this.props.data)
    return (
      <h1>{this.props.data}</h1>
    );
  }

}