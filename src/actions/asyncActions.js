import Axios from 'axios';

const server = 'http://192.168.0.50:8000';
const user = 'django';
const pass = 'P@ssw0rd';


export function apiConnect() {
	return dispatch => {
		return Axios.get(server + "/api/auth/token/?username=" + user + "&password=" + pass)
		//return Axios.get("https://httpbin.org/get")
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				var token = response.data.origin;
				localStorage.setItem('token', token);
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		})
		.catch(error => { console.log('Cannot connect with LINQ API. ', error); });
	}
}

export function apiGetSocketData(room) {
	return dispatch => {
		return Axios.get(server + "/socket/" + room + "/realtime/")
		//return Axios.get("https://httpbin.org/get")
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				var token = localStorage.getItem('token');
				console.log("asdf" + token);
				console.log(response);
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		})
		.catch(error => { console.log('Cannot connect with LINQ API. ', error); });
	}
}