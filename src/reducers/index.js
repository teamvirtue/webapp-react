import { combineReducers } from 'redux';
import settings from './settings';
import notifications from './notifications';
import temperature from './temperature';
import sustainabilityStatus from './sustainabilityStatus';
import houseData from './houseData';

const rootReducer = combineReducers({
	settings: settings,
	notifications: notifications,
	temperature: temperature,
	sustainabilityStatus: sustainabilityStatus,
	houseData: houseData,
});

export default rootReducer;