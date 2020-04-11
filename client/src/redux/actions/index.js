/*
 * action types
*/
export const GET_SONGS_LIST = 'GET_SONGS_LIST'
/*
 * action creators
*/


export const getSongsList = (artistName) => dispatch => {
    return fetch('/api/songs/' + artistName)
        .then(res => res.json())
        .then(songs => dispatch({ type: GET_SONGS_LIST, payload: songs.results }))
}