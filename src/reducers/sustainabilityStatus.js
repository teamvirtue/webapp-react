const sustainabilityStatus = (state = {
    fullscreen: false,
	selected: 'mylinq',
	loadedModel: false,
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
		linq: [
            {
                id: 'linq',
				title: 'Inefficient washing machines',
				content: 'There are two washing machines runnning while the electricity grid is not fully charged yet.',
				icon: 'local_laundry_service',
				active: true,
			},
            {
                id: 'Bike',
                title: 'Bikes',
                content: 'The bikes haven\'t been used for some time now. Make sure to use them for short trips around the city.',
                icon: 'directions_bike',
                active: true,
            },
        ],
		mylinq: [
            {
                id: 'TV',
				title: 'Television',
				content: 'The television is on but no movement is detected. You can better turn it off.',
				icon: 'power',
				active: true,
			},
            {
                id: 'Laptop',
				title: 'Laptop!',
				content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
				icon: 'info',
				active: true,
			},
            {
                id: 'Washing_machine',
                title: 'Low humidity!',
                content: 'The humidity in the living room is too low. Buy a humidifier to improve this.',
                icon: 'info',
                active: true,
            },
        ],
		district: [
			{
                id: 'district_complete',
				title: 'Critical energy usage!',
				content: 'The entire district is currently consuming a lot of energy! Consider turning some of your appliances off to balance the electricity grid.',
				icon: 'battery_alert',
				active: true,
			},
			{
                id: 'district_roads',
				title: 'Public transport',
				content: 'In October, public transport was used by fewer people than before. To optimize the city conditions it is encouraged to use public transport more often.',
				icon: 'train',
				active: true,
			},
			{
                id: 'district_linq',
				title: 'Renewable energy',
				content: 'Last month, 87% of the district\'s energy usage came from renewable energy. That is 5% more than the same month last year.',
				icon: 'power',
				active: true,
			},
        ],
	},
}, action) => {
	switch (action.type) {
        case 'UPDATE_SUSTAINABILITY_STATUS':
			return {
				...state,
				selected: action.payload,
			};
        case 'UPDATE_FULLSCREEN_STATUS':
            return {
                ...state,
                fullscreen: action.payload,
            };
        case 'SELECT_ADVICE_CARD':
            let advices = state.advices[state.selected];

            // console.log(advices)

            advices.forEach((item, i) => {
                if (item.id === action.payload){
                    advices.splice(i, 1);
                    advices.unshift(item);
                }
            });

            return {
                ...state
            };
        case 'UPDATE_ADVICE':
            return {
                ...state,
                advices: {
                    ...state.advices,
                    [action.payload.level]: state.advices[action.payload.level].map((item, index) => {
                        let id = parseInt(action.payload.id);
                        // console.log(item, index);
                        // console.log(index, parseInt(action.payload.id))

                        // Replace the item at index 2
                        if (index === id) {
                            // console.log(action.payload.active)
                            // return item
                            /*return {
                                ...item,
                                ...action.payload.active
                            };*/
                            return {
                                ...item,
                                active: action.payload.active,
                            };
                        }

                        // Leave every other item unchanged
                        return item;
                    })
                }
            };
            /*return state.advices[action.payload.level].map((item, index) => {
                console.log(item, index);

                // Replace the item at index 2
                if (index === action.payload.id) {
                    return { ...item, ...action.payload };
                }

                // Leave every other item unchanged
                return item;
            });*/
            /*return state.advices[action.payload.level].map((item, index) => {
                console.log(item, index);

                // Replace the item at index 2
                if (index === 2) {
                    return item;
                }

                // Leave every other item unchanged
                return item;
            });*/
            /*return {
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
            };*/
		default:
			return state;
	}
};

export default sustainabilityStatus;