import { combineReducers } from 'redux'
import songsList from './songsListReducer'
import usersReducer from './usersReducer'
import cart from './cartReducer';
import settings from './settingsReducer';
import loginReducer from './loginReducer';
export default combineReducers({
    songsList,
    usersReducer,
    cart,
    settings,
    loginReducer
})