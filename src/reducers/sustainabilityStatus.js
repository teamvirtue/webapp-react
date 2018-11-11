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
			title: 'Television',
			content: 'The television is on but no movement is detected. You can better turn it off.',
			active: true,
		},
		2: {
			id: '2',
			title: 'Low humidity!',
			content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
			active: true,
		},
		3: {
			id: '3',
			title: 'Low humidity!',
			content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
			active: true,
		},
		4: {
			id: '4',
			title: 'Low humidity!',
			content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
			active: true,
		},
		5: {
			id: '5',
			title: 'Low humidity!',
			content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
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