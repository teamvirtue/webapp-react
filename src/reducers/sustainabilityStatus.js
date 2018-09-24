const sustainabilityStatus = (state = {
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
			}
		default:
			return state;
	}
};

export default sustainabilityStatus;