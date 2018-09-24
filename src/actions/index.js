// import * as types from '../constants/ActionTypes'

export const dismissCard = (id) => ({
    type: 'DISMISS_CARD',
    payload: id,
});

export const updateAccountName = (name, id) => ({
    type: 'UPDATE_ACCOUNT_NAME',
    payload: { name, id },
});

export const updateSleepCycleMode = (check) => ({
    type: 'UPDATE_SLEEP_CYCLE_MODE',
    payload: { check },
});

export const updateNightMode = (check) => ({
    type: 'UPDATE_NIGHT_MODE',
    payload: { check },
});

export const updateNotificationsVolume = (volume) => ({
    type: 'UPDATE_NOTIFICATIONS_VOLUME',
    payload: { volume },
});

export const updateNotificationsVibrate = (check) => ({
    type: 'UPDATE_NOTIFICATIONS_VIBRATE',
    payload: { check },
});

export const updateNotificationsDesktop = (check) => ({
    type: 'UPDATE_NOTIFICATIONS_DESKTOP',
    payload: { check },
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


