export const dismissCard = (id, visibility) => ({
    type: 'DISMISS_CARD',
    payload: { id, visibility },
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

export const updateWeatherData = (celsius, description, sunrise, sunset) => ({
	type: 'UPDATE_WEATHER_DATA',
	payload: { celsius, description, sunrise, sunset },
});

export const updateWeatherForecastData = (forecast3hDatetime, forecast3hCelsius, forecast3hDescription, forecast6hDatetime, forecast6hCelsius, forecast6hDescription) => ({
	type: 'UPDATE_WEATHER_FORECAST_DATA',
	payload: { forecast3hDatetime, forecast3hCelsius, forecast3hDescription, forecast6hDatetime, forecast6hCelsius, forecast6hDescription },
});

export const updateSustainabilityStatus = (selected) => ({
	type: 'UPDATE_SUSTAINABILITY_STATUS',
	payload: { selected },
});

export const updateFullscreenStatus = (fullscreen) => ({
    type: 'UPDATE_FULLSCREEN_STATUS',
    payload: { fullscreen },
});

export const updateAdvice = (level, id) => ({
    type: 'UPDATE_ADVICE',
    payload: { level, id },
});

export const updateRoomsAircoOnOff = (onOff) => ({
    type: 'UPDATE_ROOMS_AIRCO_ONOFF',
    payload: { onOff },
});

export const updateRoomsAircoTemperature = (temperature) => ({
    type: 'UPDATE_ROOMS_AIRCO_TEMPERATURE',
    payload: { temperature },
});

export const updateRoomsLightOnOff = (room, onOff) => ({
    type: 'UPDATE_ROOMS_LIGHT_ONOFF',
    payload: { room, onOff },
});

export const updateRoomsLightIntensity = (room, intensity) => ({
    type: 'UPDATE_ROOMS_LIGHT_INTENSITY',
    payload: { room, intensity },
});

export const updateRoomsLightWarmth = (room, warmth) => ({
    type: 'UPDATE_ROOMS_LIGHT_WARMTH',
    payload: { room, warmth },
});

export const updateEatTogetherStatus = (status) => ({
    type: 'UPDATE_EAT_TOGETHER_STATUS',
    payload: { status },
});

export const updateEatTogetherMessage = (message) => ({
    type: 'UPDATE_EAT_TOGETHER_MESSAGE',
    payload: { message },
});

export const resetEatTogetherMessage = () => ({
    type: 'RESET_EAT_TOGETHER_MESSAGE',
    payload: { },
});