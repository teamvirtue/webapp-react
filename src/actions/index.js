// import * as types from '../constants/ActionTypes'

export const dismissCard = (id) => ({
    type: 'DISMISS_CARD',
    payload: id,
});

export const updateAccountName = (name, id) => ({
    type: 'UPDATE_ACCOUNT_NAME',
    payload: { name, id },
});

export const updateLocalNewsHeadlines = (articles) => ({
    type: 'UPDATE_LOCAL_NEWS_HEADLINES',
    payload: { articles },
});

export const updateWeatherData = (celsius, description) => {
	return {
		type: 'UPDATE_WEATHER_DATA',
		payload: { celsius, description },
	}
};

