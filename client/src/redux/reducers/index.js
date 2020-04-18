import { combineReducers } from 'redux'
import songsList from './songsListReducer'
import usersReducer from './usersReducer'
export default combineReducers({
    songsList,
    usersReducer,

})