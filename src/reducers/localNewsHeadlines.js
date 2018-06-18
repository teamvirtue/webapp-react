const localNewsHeadlines = (state = {
    byId: {},
}, action) => {
	switch (action.type) {
        case 'UPDATE_LOCAL_NEWS_HEADLINES':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload]: {
                        ...state.byId[action.payload],
                        visible: false,
                    },
                },
            };
		default:
			return state;
	}
};

export default localNewsHeadlines;