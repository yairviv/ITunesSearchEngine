/*
 * action types
*/
export const GET_SONGS_LIST = 'GET_SONGS_LIST'
export const CREATE_USER = 'CREATE_USER'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'
/*
 * action creators
*/


export const getSongsList = (query) => dispatch => {
    let url = '/api/songs/' + query.song;
    if (query.limit != undefined) {
        url = url + `&limit=${query.limit}`;
    }
    if (query.entity != undefined) {
        url = url + `&entity=${query.entity}`;
    }
    return fetch(url)
        .then(res => res.json())
        .then(songs => dispatch({ type: GET_SONGS_LIST, payload: songs.results }))
}

export const createUser = (userName) => dispatch => {
    return fetch('/api/users/' + userName)
        .then(userName => dispatch({ type: CREATE_USER, payload: userName }))
}

export const addItemToCart = (itune) => dispatch => {
    dispatch({ type: ADD_ITEM_TO_CART, payload: itune })
}

export const updateSettings = (settingsObj) => dispatch => {
    dispatch({ type: UPDATE_SETTINGS, payload: settingsObj })
}
/*
export const updateSong = (song) => dispatch => {
    return put('/api/song/', {
        body: {
            updatedSong: song
        }
    })
        .then(res => res.json())
        .then(newSong => dispatch({ type: UPDATE_SONG, payload: newSong }))
}
*/