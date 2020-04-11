import { GET_SONGS_LIST, } from './../actions/index'
import initialState from './initialState'
function manageSongsList(state = initialState.songs, action) {
    switch (action.type) {
        case GET_SONGS_LIST:
            return action.payload;
        default: return state
    }
}
export default manageSongsList;