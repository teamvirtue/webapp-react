const sustainabilityStatus = (state = {
	selected: 'linq',
	linq: {
		efficiency: 'positive',
	},
	apartmentcomplex: {
		efficiency: 'neutral',
	},
	dubai: {
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