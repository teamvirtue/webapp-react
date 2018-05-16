const adviceCards = (state = [], action) => {
	switch (action.type) {
		case 'ADD_ADVICECARD':
			return state.concat([
				{
					content: action.content,
					author: action.author,
					id: action.id
				}
			])
	default:
		return state
	}
}

export default adviceCards