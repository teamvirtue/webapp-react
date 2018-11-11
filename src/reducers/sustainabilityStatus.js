const sustainabilityStatus = (state = {
    fullscreen: false,
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
	advices: {
		1: {
			id: '1',
			title: 'test1',
			content: 'asdf1',
			active: true,
		},
		2: {
			id: '2',
			title: 'test2',
			content: 'asdf2',
			active: true,
		},
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
        case 'UPDATE_ADVICE':
			return {
                ...state,
				advices: {
					...state.advices,
					[action.payload.id]: {
						...state.advices[action.payload.id],
						active: false,
					}
				}
            };
		default:
			return state;
	}
};

export default sustainabilityStatus;