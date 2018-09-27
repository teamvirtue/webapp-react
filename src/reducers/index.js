import { combineReducers } from 'redux';
import settings from './settings';
import advices from './advices';
import temperature from './temperature';
import localNewsHeadlines from './localNewsHeadlines';
import sustainabilityStatus from './sustainabilityStatus';
import houseData from './houseData';

const rootReducer = combineReducers({
	settings: settings,
	advices: advices,
	temperature: temperature,
	localNewsHeadlines: localNewsHeadlines,
	sustainabilityStatus: sustainabilityStatus,
	houseData: houseData,
});

export default rootReducer;