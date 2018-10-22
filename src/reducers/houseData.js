const houseData = (state = {
	indoorTemperature: 0,
	indoorHumidity: 0,
	room: {
		'All Rooms': {
			airco: {
				onOff: false,
				temperature: 20,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [0, 0, 0, 10, 0, 0, 0],
			energyUsageSocket: {
				'F1': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
		'Living Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F22': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
		'Dinner Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			movement: {
				movementDataAll: [],
			},
		},
		'Bedroom': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F20': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
			movement: {
				movementDataAll: [],
			},
		},
		'Bathroom': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F21': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F23': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
		'Hallway': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			movement: {
				movementDataAll: [],
			},
		},
		'Kitchen': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F10': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F11': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F15': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F16': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F19': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
		'Outdoor': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F12': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
		'Technical Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsageRealtime: 0,
			energyUsageAll: [],
			energyUsageSocket: {
				'F13': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F17': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F18': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
				'F24': {
					energyUsageRealtime: 0,
					energyUsageAll: [],
				},
			},
		},
	},
}, action) => {
	
	
	
	
	
	
	switch (action.type) {
        case 'UPDATE_ROOMS_AIRCO_ONOFF':
		    // console.log(action.payload.id);
			return {
                ...state,
				room: {
					...state.room,
					'All Rooms': {
						...state.room['All Rooms'],
						airco: {
							...state.room['All Rooms'].airco,
							onOff: action.payload.onOff,
						}
					}
				}
            };
			
        case 'UPDATE_ROOMS_AIRCO_TEMPERATURE':
			return {
                ...state,
				room: {
					...state.room,
					'All Rooms': {
						...state.room['All Rooms'],
						airco: {
							...state.room['All Rooms'].airco,
							temperature: action.payload.temperature,
						}
					}
				}
            };
			
        case 'UPDATE_ROOMS_LIGHT_ONOFF':
			return {
                ...state,
				room: {
					...state.room,
					[action.payload.room]: {
						...state.room[action.payload.room],
						lights: {
							...state.room[action.payload.room].lights,
							onOff: action.payload.onOff,
						}
					}
				}
            };
			
        case 'UPDATE_ROOMS_LIGHT_INTENSITY':
			return {
                ...state,
				room: {
					...state.room,
					[action.payload.room]: {
						...state.room[action.payload.room],
						lights: {
							...state.room[action.payload.room].lights,
							intensity: action.payload.intensity,
						}
					}
				}
            };
			
        case 'UPDATE_ROOMS_LIGHT_WARMTH':
			return {
                ...state,
				room: {
					...state.room,
					[action.payload.room]: {
						...state.room[action.payload.room],
						lights: {
							...state.room[action.payload.room].lights,
							warmth: action.payload.warmth,
						}
					}
				}
            };
			
        case 'UPDATE_ENERGY_USAGE':
			return {
                ...state,
				room: {
					...state.room,
					[action.payload.room]: {
						...state.room[action.payload.room],
						energyUsageAll: action.payload.energyUsageAll,
					}
				}
            };
			
        case 'UPDATE_ATMO_TEMPERATURE':
			return {
				indoorTemperature: [action.payload.temperature],
				indoorHumidity: [action.payload.humidity],
                ...state,
            };
			
		default:
			return state;
	}
};

export default houseData