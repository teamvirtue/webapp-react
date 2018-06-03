const advices = (state = {
    byId: {
        'card1': {
            id: 'card1',
            title: 'Lights',
            message: 'The lights in the Technical Room are turned on but no activity was detected in the past 15 minutes.',
            buttonIcon: 'done',
            buttonText: 'Turn lights off',
            visible: true,
        },
        'card2': {
            id: 'card2',
            title: 'Monthly Energy report',
            message: 'Your monthly Energy report for May is available. This month was much more sustainable than April. Well done!',
            buttonIcon: 'done',
            buttonText: 'Close',
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