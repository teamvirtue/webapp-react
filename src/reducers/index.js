import { combineReducers } from 'redux'
import accounts from './accounts'
import adviceCards from './adviceCards'

const rootReducer = combineReducers({
	accounts,
	adviceCards
})

export default rootReducer