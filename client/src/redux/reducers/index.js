import { combineReducers } from 'redux'
import songsList from './songsListReducer'
import usersReducer from './usersReducer'
import cart from './cartReducer';
import settings from './settingsReducer';
export default combineReducers({
    songsList,
    usersReducer,
    cart,
    settings
})