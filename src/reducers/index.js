import { combineReducers } from 'redux';
import accounts from './accounts';
import advices from './advices';

const rootReducer = combineReducers({
	accounts: accounts,
	advices: advices,
});

export default rootReducer;