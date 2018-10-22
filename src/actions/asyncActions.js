import axios from 'axios';

const server = 'http://192.168.0.50:8000';
const user = 'django';
const pass = 'P@ssw0rd';


export function getApiToken(callback) {
	return dispatch => {
		return axios.post(server + "/api/auth/token/", {
				username: user,
				password: pass
			})
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				var token = response.data.token;
				console.log(token);
				axios.defaults.headers.common['Authorization'] = "JWT " + token;
				if(callback){
					callback();
				}
			} else {
				throw new Error(response.statusText);
			}
		})
		.catch(error => { console.log('[1] Cannot connect with LINQ API. ', error); });
	}
}

export function apiGetSocketData(room, time) {
	return dispatch => {
		setInterval(() => {
			dispatch({
				type: 'UPDATE_ENERGY_USAGE',
				payload: {
					room: room, 
					energyUsageAll: [0, 0, 0, 10, 30, 0, 0],
				}
			});
		}, 2000);
		return axios.get(server + "/socket_reading/" + room + "/" + time + "/")
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				//console.log(response.data);
				dispatch({			
					type: 'UPDATE_ENERGY_USAGE',
					payload: {
						room: room, 
						energyUsageAll: [0, 0, 0, 10, 30, 0, 0],
					}
				});
				return true;
			} else {
				throw new Error(response.statusText);
			}
		})
		.catch(
			//refresh token
			error => {
				console.log('[1] Refreshing token...');
				dispatch(getApiToken(function() {
					dispatch(apiGetSocketData(room, time));
				})); 
			}
		);
	}
}

export function apiGetAtmoTemperature() {
	return dispatch => {
		return axios.get(server + "/room/1")
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				dispatch({			
					type: 'UPDATE_ATMO_TEMPERATURE',
					payload: {
						temperature: response.data.last_temperature, 
						humidity: response.data.last_humidity,
					}
				});
				return true;
			} else {
				throw new Error(response.statusText);
			}
		})
		.catch(
			//refresh token
			error => {
				console.log('[2] Refreshing token...');
				dispatch(getApiToken(function() {
					dispatch(apiGetAtmoTemperature());
				})); 
			}
		);
	}
}