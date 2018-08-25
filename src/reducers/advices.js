const advices = (state = {
    byId: {
        'card1': {
            id: 'card1',
            title: 'This is a demo version of the LINQ app',
            message: 'This notifications area highlights important tips, information and warnings for an efficient household and a sustainable living. They require fast response. See below for a few examples.',
            buttonIcon: '',
            buttonText: '',
            visible: true,
			bordered: true,
        },
        'card2': {
            id: 'card2',
            title: 'Monthly Energy report',
            message: 'Your monthly Energy report for May is available. This month was much more sustainable than April. Well done!',
            buttonIcon: '',
            buttonText: '',
            visible: true,
        },
        'card3': {
            id: 'card3',
            title: 'Lights',
            message: 'The lights in the living room were on for the entire night. You can automatically turn them off after midnight with the Night Mode.',
            buttonIcon: 'schedule',
            buttonText: 'Enable Night Mode',
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

export default advices;