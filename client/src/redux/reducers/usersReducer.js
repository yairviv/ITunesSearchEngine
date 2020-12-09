import { CREATE_USER, SET_CREATE_USER_ERROR, RESET_USER, SET_LOGGED_IN_USER, SET_NOT_LOGGED_IN_USER } from '../actions/index'
import initialState from './initialState'
function manageUsers(state = initialState.user, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                type: 'ok',
                message: ''
            }
        case RESET_USER:
            return {
                type: '',
                message: ''
            }
        case SET_CREATE_USER_ERROR:
            return {
                type: 'alert-error',
                message: action.payload.response.data
            }
        case SET_LOGGED_IN_USER:
            user = action.payload.user;
            return user;
        case SET_NOT_LOGGED_IN_USER:
            return {
                type: 'alert-error',
                message: action.payload.response.data
            }

        default: return state
    }
}
export default manageUsers;