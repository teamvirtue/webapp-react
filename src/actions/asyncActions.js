import axios from 'axios';

const server = 'http://192.168.0.50:8000';
const user = 'django';
const pass = 'P@ssw0rd';

var runningIntervalId;


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
				
				//Directly refresh temperature and humidity
				dispatch(apiGetAtmoTemperature());
			} else {
				throw new Error(response.statusText);
			}
		})
		.catch(error => { console.log('[1] Cannot connect with LINQ API. ', error); });
	}
}

export function apiGetSocketData(room, socket, time) {
	return dispatch => {
		/*** TEMPORARY ***/
		if(socket===false){
			//update room
			setInterval(() => {
				dispatch({
					type: 'UPDATE_ENERGY_USAGE_ALL',
					payload: {
						room: room, 
						energyUsageAll: [10, 20, 30, 35, 60, 10, 15, 3, 12, 19, 36, 45, 12, 10, 20, 32, 35, 40, 38, 15, 6, 12, 19, 33, 25, 62],
					}
				});
			}, 35000);
			setInterval(() => {
				dispatch({
					type: 'UPDATE_ENERGY_USAGE_REALTIME',
					payload: {
						room: room, 
						energyUsageRealtime: (Math.round((Math.random() * 40) + 1)),
					}
				});
			}, 10000);
		}else{
			//update socket
			setInterval(() => {
				dispatch({
					type: 'UPDATE_ENERGY_USAGE_SOCKET_REALTIME',
					payload: {
						room: room, 
						socket: socket,
						energyUsageRealtime: (Math.round((Math.random() * 40) + 1)),
					}
				});
			}, 10000);

		}
		/*** END TEMPORARY ***/
		if(socket===false){
			var url = server + "/socket_reading/" + room + "/" + time + "/";
		}else{
			var url = server + "/socket_reading/" + socket + "/" + time + "/";
		}
		return axios.get(url)
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				//console.log(response.data);
				if(socket===false){
					if(time === 'all'){
						dispatch({			
							type: 'UPDATE_ENERGY_USAGE_ALL',
							payload: {
								room: room, 
								energyUsageAll: [0, 0, 0, 10, 30, 0, 0],
							}
						});
					}
					
					if(time === 'realtime'){
						dispatch({			
							type: 'UPDATE_ENERGY_USAGE_REALTIME',
							payload: {
								room: room, 
								energyUsageRealtime: 0,
							}
						});
					}
				}else{
					dispatch({			
						type: 'UPDATE_ENERGY_USAGE_SOCKET_REALTIME',
						payload: {
							room: room,
							socket: socket,
							energyUsageAll: 0,
						}
					});
				}
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
					dispatch(apiGetSocketData(room, socket, time));
				})); 
			}
		);
	}
}

export function apiGetAtmoTemperature() {
	console.log('checking temp');
	return dispatch => {
		return axios.get(server + "/room/1/")
		.then(response => {
			if (response.status >= 200 && response.status < 300) {
				console.log("Temperature: " + response.data.last_temperature + ", Humidity: " + response.data.last_humidity);
				dispatch({			
					type: 'UPDATE_ATMO_TEMPERATURE',
					payload: {
						temperature: response.data.last_temperature, 
						humidity: response.data.last_humidity,
						CO2: response.data.last_amount_CO2
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