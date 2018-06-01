import React, { Component } from 'react';
import Axios from 'axios';

class Request {
  private var request_url;
  private var request_content;
  private var request_username;
  private var request_password;
  private var request_axios;
  constructor(url, content, username, password) {
    request_url = url;
    request_content = content;
    request_username = username;
    request_password = password;
    username=matahara&password=katinar4e
  }
  constructor() {
    request_url = "http://localhost:8000/api/auth/token/"
    request_content =
  }
  function setUrl() {

  }
  function getToken(){
    const url = ""
    request_axios = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: {'Authorization': 'JWT ' + token},
    });
  }

}
