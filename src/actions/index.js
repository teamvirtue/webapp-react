// import * as types from '../constants/ActionTypes'

export const dismissCard = (id) => ({
    type: 'DISMISS_CARD',
    payload: id,
});

export const updateAccountName = (name, id) => ({
    type: 'UPDATE_ACCOUNT_NAME',
    payload: { name, id },
});

export const updateBirthdate = (date) => ({
    type: 'UPDATE_BIRTHDATE',
    payload: { date },
});

export const updateSleepCycleMode = (check) => ({
    type: 'UPDATE_SLEEP_CYCLE_MODE',
    payload: { check },
});

export const updateSleepCycleStartTime = (time) => ({
    type: 'UPDATE_SLEEP_CYCLE_START_TIME',
    payload: { time },
});

export const updateSleepCycleEndTime = (time) => ({
    type: 'UPDATE_SLEEP_CYCLE_END_TIME',
    payload: { time },
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

export const updateFullscreenStatus = (fullscreen) => {
    return {
        type: 'UPDATE_FULLSCREEN_STATUS',
        payload: { fullscreen },
    }
};

export const updateRoomsAircoOnOff = (onOff) => {
    return {
        type: 'UPDATE_ROOMS_AIRCO_ONOFF',
        payload: { onOff },
    }
};

export const updateRoomsAircoTemperature = (temperature) => {
    return {
        type: 'UPDATE_ROOMS_AIRCO_TEMPERATURE',
        payload: { temperature },
    }
};

export const updateRoomsLightOnOff = (room, onOff) => {
    return {
        type: 'UPDATE_ROOMS_LIGHT_ONOFF',
        payload: { room, onOff },
    }
};

export const updateRoomsLightIntensity = (room, intensity) => {
    return {
        type: 'UPDATE_ROOMS_LIGHT_INTENSITY',
        payload: { room, intensity },
    }
};

export const updateRoomsLightWarmth = (room, warmth) => {
    return {
        type: 'UPDATE_ROOMS_LIGHT_WARMTH',
        payload: { room, warmth },
    }
};
