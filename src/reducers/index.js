import { combineReducers } from 'redux';
import accounts from './accounts';
import advices from './advices';
import temperature from './temperature';
import localNewsHeadlines from './localNewsHeadlines';

const rootReducer = combineReducers({
	accounts: accounts,
	advices: advices,
	temperature: temperature,
	localNewsHeadlines: localNewsHeadlines,
});

export default rootReducer;