const advices = (state = {
    byId: {
        'card1': {
            id: 'card1',
            title: 'The notifications area',
            message: 'This notifications area highlights important information and warnings that require immediate response, such as a system failure or a disastrous storm.',
            buttonIcon: '',
            buttonText: '',
            visible: true,
			bordered: false,
        },
        'card2': {
            id: 'card2',
            title: 'The notifications area',
            message: 'This notifications area highlights important information and warnings that require immediate response, such as a system failure or a disastrous storm.',
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

export default advices;