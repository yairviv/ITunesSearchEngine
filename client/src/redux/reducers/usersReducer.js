import { CREATE_USER, SET_CREATE_USER_ERROR, RESET_USER } from '../actions/index'
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
            
        default: return state
    }
}
export default manageUsers;