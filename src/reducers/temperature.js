const temperature = (state = {
	outside: {
		celsius: 0,
		description: '',
		sunrise: '1542422237',
		sunset: '1542461402',
		forecast3hDatetime: '',
		forecast3hCelsius: 0,
		forecast3hDescription: '',
		forecast6hDatetime: '',
		forecast6hCelsius: 0,
		forecast6hDescription: '',
	}
}, action) => {
	switch (action.type) {
        case 'UPDATE_WEATHER_DATA':
			return {
				...state,
				outside: {
					...state.outside,
					celsius: action.payload.celsius,
					description: action.payload.description,
					sunrise: action.payload.sunrise,
					sunset: action.payload.sunset,
				}
			}
			
        case 'UPDATE_WEATHER_FORECAST_DATA':
			return {
				...state,
				outside: {
					...state.outside,
					forecast3hDatetime: action.payload.forecast3hDatetime,
					forecast3hCelsius: action.payload.forecast3hCelsius,
					forecast3hDescription: action.payload.forecast3hDescription,
					forecast6hDatetime: action.payload.forecast6hDatetime,
					forecast6hCelsius: action.payload.forecast6hCelsius,
					forecast6hDescription: action.payload.forecast6hDescription,
				}
			}
		default:
			return state;
	}
};

export default temperature;