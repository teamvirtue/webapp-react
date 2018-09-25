// import * as types from '../constants/ActionTypes'

export const dismissCard = (id) => ({
    type: 'DISMISS_CARD',
    payload: id,
});

export const updateAccountName = (name, id) => ({
    type: 'UPDATE_ACCOUNT_NAME',
    payload: { name, id },
});

export const updateLocalNewsHeadlines = (sources) => ({
    type: 'UPDATE_LOCAL_NEWS_HEADLINES',
    payload: { sources },
});

export const updateWeatherData = (celsius, description) => {
	return {
		type: 'UPDATE_WEATHER_DATA',
		payload: { celsius, description },
	}
};

export const updateSustainabilityStatus = (selected) => {
	return {
		type: 'UPDATE_SUSTAINABILITY_STATUS',
		payload: { selected },
	}
};

export const updateFullscreenStatus = (fullscreen) => {
    return {
        type: 'UPDATE_FULLSCREEN_STATUS',
        payload: { fullscreen },
    }
};


