import * as types from '../constants/ActionTypes'

const accounts = (state = [], action) => {
	switch (action.type) {
		case types.UPDATE_ACCOUNT_NAME:
		return state.concat([{ name: action.name }])

		case types.FAMILY_LIST:
		return action.accounts
		
		default:
		return state
	}
}

export default accounts