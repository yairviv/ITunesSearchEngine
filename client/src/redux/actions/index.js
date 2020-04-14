/*
 * action types
*/
export const GET_SONGS_LIST = 'GET_SONGS_LIST'
export const UPDATE_SONG = 'UPDATE_SONG'
/*
 * action creators
*/


export const getSongsList = (artistName) => dispatch => {
    return fetch('/api/songs/' + artistName)
        .then(res => res.json())
        .then(songs => dispatch({ type: GET_SONGS_LIST, payload: songs.results }))
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