import { UPDATE_SONG, } from './../actions/index'
import initialState from './initialState'
function manageSongsList(state = initialState.song, action) {
    switch (action.type) {
        case UPDATE_SONG:
            return action.payload;
        default: return state
    }
}
export default manageSongsList;