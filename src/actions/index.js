import * as types from '../constants/ActionTypes'

let nextAdviceCardId = 0

export const addAdviceCard = (content) => ({
	type: types.ADD_ADVICECARD,
	id: nextAdviceCardId++,
	content,
})

export const updateAccountName = name => ({
	type: types.UPDATE_ACCOUNT_NAME,
	name
})

export const populateFamilyList = accounts => ({
	type: types.FAMILY_LIST,
	accounts
})
