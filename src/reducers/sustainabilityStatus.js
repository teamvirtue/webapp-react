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
		linq: {
			1: {
				id: '1',
				title: 'Television',
				highlight: 'TV',
				content: 'The television is on but no movement is detected. You can better turn it off.',
				icon: 'power',
				active: true,
			},
			2: {
				id: '2',
				title: 'Low humidity!',
				highlight: 'Laptop',
				content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
				icon: 'power',
				active: true,
			},
		},
		mylinq: {
			1: {
				id: '1',
				title: 'Television',
				highlight: 'TV',
				content: 'The television is on but no movement is detected. You can better turn it off.',
				icon: 'power',
				active: true,
			},
			2: {
				id: '2',
				title: 'Low humidity!',
				highlight: 'Laptop',
				content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
				icon: 'power',
				active: true,
			},
		},
		district: {
			1: {
				id: '1',
				title: 'asdf',
				highlight: 'TV',
				content: 'asdfasdfasdfasdf',
				icon: 'power',
				active: true,
			},
			2: {
				id: '2',
				title: 'asdfasdf',
				highlight: 'TV',
				content: 'asdfasdfasdfasdf',
				icon: 'power',
				active: true,
			},
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
					[action.payload.level]: {	
						...state.advices[action.payload.level],
						[action.payload.id]: {
							...state.advices[action.payload.level][action.payload.id],
							active: false,
						}
					}
				}
            };
		default:
			return state;
	}
};

export default sustainabilityStatus;