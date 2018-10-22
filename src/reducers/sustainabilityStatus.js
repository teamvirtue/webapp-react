const sustainabilityStatus = (state = {
    fullscreen: true,
	selected: 'mylinq',
	linq: {
		efficiency: 'neutral',
	},
	mylinq: {
		efficiency: 'positive',
	},
	district: {
		efficiency: 'negative',
	},
	
}, action) => {
	switch (action.type) {
        case 'UPDATE_SUSTAINABILITY_STATUS':
			return {
				...state,
				selected: action.payload.selected,
			};
        case 'UPDATE_FULLSCREEN_STATUS':
            return {
                ...state,
                fullscreen: action.payload.fullscreen,
            };
		default:
			return state;
	}
};

export default sustainabilityStatus;