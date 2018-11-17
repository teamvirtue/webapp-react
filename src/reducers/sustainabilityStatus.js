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
                id: 'linq_washing_machines',
				title: 'Inefficient washing machines',
				content: 'There are two washing machines runnning while the electricity grid is not fully charged yet.',
				icon: 'local_laundry_service',
				active: true,
			},
            {
                id: 'linq_complex',
				title: 'Your LINQ apartment complex',
				content: 'LINQ is currently consuming less energy than the average LINQ apartment complex. Great job!',
				icon: 'wb_sunny',
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
				content: 'The television is turned on but no movement is detected for more than an hour. You can better turn the television off after leaving the room.',
				icon: 'tv',
				active: true,
			},
            {
                id: 'Washing_machine',
                title: 'Air dry your dishes',
                content: 'A great way to save energy and money is to let your dishes air dry. Turn off the machine\'s heat-dry setting and open the door after the wash cycle is over.',
                icon: 'local_laundry_service',
                active: true,
            },
            {
                id: 'Laptop',
				title: 'Wireless charging',
				content: 'Your laptop is fully charged but still standing on the wireless charging table. It\'s better for the laptop battery to take it off.',
				icon: 'battery_charging_full',
				active: true,
			},
        ],
		district: [
			{
                id: 'district_consumption',
				title: 'Critical energy usage!',
				content: 'The entire district is currently consuming a lot of energy! Consider turning off some of your appliances to balance the electricity grid.',
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
                id: 'district_renewables',
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