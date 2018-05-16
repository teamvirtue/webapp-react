import { combineReducers } from 'redux';
import accounts from './accounts';
import advices from './adviceCards';

const rootReducer = combineReducers({
	accounts: accounts,
	advices: advices,
});

export default rootReducer;