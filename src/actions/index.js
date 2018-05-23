import * as types from '../constants/ActionTypes'

let nextAdviceCardId = 0;

export const dismissCard = (id) => ({
    type: 'DISMISS_CARD',
    payload: id,
    // id: nextAdviceCardId++,
});

export const updateAccountName = (name, id) => ({
    type: 'UPDATE_ACCOUNT_NAME',
    payload: { name, id },
});

export const updateWeatherData = (temperature) => ({
    type: 'UPDATE_WEATHER_DATA',
    payload: temperature,
});

/*
export const addAdviceCard = (content) => ({
	type: types.ADD_ADVICECARD,
	id: nextAdviceCardId++,
	content,
});

export const updateAccountName = name => ({
	type: types.UPDATE_ACCOUNT_NAME,
	name
});

export const populateFamilyList = accounts => ({
	type: types.FAMILY_LIST,
	accounts
});
*/
