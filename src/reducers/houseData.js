const houseData = (state = {
	room: {
		'All Rooms': {
			airco: {
				onOff: false,
				temperature: 20,
			},
			energyUsage: 0,
		},
		'Living Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Dinner Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Bedroom': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Bathroom': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Hallway': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Kitchen': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Outdoor': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
		},
		'Technical Room': {
			lights: {
				onOff: false,
				intensity: 5,
				warmth: 0,
			},
			energyUsage: 0,
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
						energyUsage: action.payload.energyUsage,
					}
				}
            };
			
		default:
			return state;
	}
};

export default houseData