const adviceCards = (state = {
    byId: {
        'card1': {
            id: 'card1',
            title: 'Washer-dryer',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ut labore et dolore magna aliqua.',
            buttonIcon: 'schedule',
            buttonText: 'schedule',
            visible: true,
        },
        'card2': {
            id: 'card2',
            title: 'Dishwasher',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            buttonIcon: 'done',
            buttonText: 'Agree',
            visible: true,
        },
        'card3': {
            id: 'card3',
            title: 'TV',
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            buttonIcon: 'done',
            buttonText: 'Agree',
            visible: true,
        },
    },
    allIds: ['card1', 'card2', 'card3'],
}, action) => {
	switch (action.type) {
        case 'DISMISS_CARD':
            console.log(action.payload);
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload]: {
                        ...state.byId[action.payload],
                        visible: false,
                    },
                },
                allIds: [...state.allIds, action.payload],
            };
		/*case 'ADD_ADVICECARD':
			return state.concat([
				{
					content: action.content,
					author: action.author,
					id: action.id
				}
			]);*/
	default:
		return state;
	}
};

export default adviceCards;