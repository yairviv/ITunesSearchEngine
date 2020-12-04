import { LOGIN, SET_LOGIN_ERROR } from '../actions/index'
import initialState from './initialState'
function manageLogin(state = initialState.loginStatus, action) {
    switch (action.type) {
        case LOGIN:
            document.cookie = `accessToken=${action.payload.data.accessToken}`;
            document.cookie = `refreshToken=${action.payload.data.refreshToken}`;
            return {
                type: 'ok',
                message: ''
            };
        case SET_LOGIN_ERROR:
            return {
                type: 'alert-error',
                message: action.payload.response.data
            }
        default: return state
    }
}
export default manageLogin;