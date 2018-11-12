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
				title: 'Solar Car',
				highlight: 'linq',
				content: 'The bikes haven\'t been used for some time now. Make sure to use them for short trips around the city.',
				icon: 'directions_bike',
				active: true,
			},
			2: {
				id: '2',
				title: 'Solar Car',
				highlight: 'linq',
				content: 'There are two washing machines runnning while the electricity grid is not fully charged yet.',
				icon: 'local_laundry_service',
				active: true,
			},
		},
		mylinq: {
			1: {
				id: '1',
				title: 'Television',
				highlight: 'television',
				content: 'The television is on but no movement is detected. You can better turn it off.',
				icon: 'power',
				active: true,
			},
			2: {
				id: '2',
				title: 'Low humidity!',
				highlight: 'television',
				content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
				icon: 'power',
				active: true,
			},
		},
		district: {
			1: {
				id: '1',
				title: 'Critical energy usage!',
				highlight: 'district',
				content: 'The entire district is currently consuming a lot of energy! Consider turning some of your appliances off to balance the electricity grid.',
				icon: 'battery_alert',
				active: true,
			},
			2: {
				id: '2',
				title: 'Public transport',
				highlight: 'district',
				content: 'In October, public transport was used by fewer people than before. To optimize the city conditions it is encouraged to use public transport more often.',
				icon: 'train',
				active: true,
			},
			3: {
				id: '3',
				title: 'Renewable energy',
				highlight: 'district',
				content: 'Last month, 87% of the district\'s energy usage came from renewable energy. That is 5% more than the same month last year.',
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
							active: action.payload.active,
						}
					}
				}
            };
		default:
			return state;
	}
};

export default sustainabilityStatus;