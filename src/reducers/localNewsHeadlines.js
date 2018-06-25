const localNewsHeadlines = (state = {
    byId: {},
}, action) => {
	switch (action.type) {
        case 'UPDATE_LOCAL_NEWS_HEADLINES':
			//return state;
            return {
                ...state,
                byId: action.payload.sources,
            };
		default:
			return state;
	}
};

export default localNewsHeadlines;