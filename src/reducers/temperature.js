const temperature = (state = {
	outside: {
		celsius: 30,
		description: '',
	}
}, action) => {
	switch (action.type) {
        case 'UPDATE_WEATHER_DATA':
			return {
				...state,
				outside: {
					//...state.temperature.outside,
					celsius: action.payload.celsius,
					description: action.payload.description,
				}
			}
		default:
			return state;
	}
};

export default temperature;