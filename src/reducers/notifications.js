const notifications = (state = {
    byId: {
        'card1': {
            id: 'card1',
            title: 'Connecting people with technology',
            message: 'LINQ connects people and technologies. This app makes users aware of the house functioning and helps people to live more sustainable livestyles. Please be aware that this app resets itself every few minutes during public tours.',
            buttonIcon: '',
            buttonText: '',
            visible: true,
			bordered: false,
        },
    },
    //allIds: ['card1'],
}, action) => {
	switch (action.type) {
        case 'DISMISS_CARD':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        visible: action.payload.visibility,
                    },
                },
                //allIds: [...state.allIds, action.payload],
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

export default notifications;