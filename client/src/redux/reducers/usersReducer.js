import { CREATE_USER } from '../actions/index'
import initialState from './initialState'
function manageUsers(state = initialState.user, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.payload;
        default: return state
    }
}
export default manageUsers;