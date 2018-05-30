import { combineReducers } from 'redux';
import accounts from './accounts';
import advices from './advices';
import temperature from './temperature';

const rootReducer = combineReducers({
	accounts: accounts,
	advices: advices,
	temperature,
});

export default rootReducer;