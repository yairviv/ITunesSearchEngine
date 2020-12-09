import { LOGIN, SET_LOGIN_ERROR, REFRESH_TOKEN } from '../actions/index'
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
        case REFRESH_TOKEN:
            document.cookie = `accessToken=${action.payload.data.accessToken}`;
            return {
                type: 'ok',
                message: ''
            };
        default: return state
    }
}
export default manageLogin;