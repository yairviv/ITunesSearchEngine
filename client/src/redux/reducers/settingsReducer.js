import { UPDATE_SETTINGS } from '../actions/index'
import initialState from './initialState'
function manageSettings(settings = initialState.settings, action) {
    switch (action.type) {
        case UPDATE_SETTINGS:
            settings[action.payload[0]] = action.payload[1];
            return settings;
        default: return settings
    }
}
export default manageSettings;