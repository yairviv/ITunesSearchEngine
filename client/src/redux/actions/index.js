import axios from 'axios';

/*
 * action types
*/
export const GET_SONGS_LIST = 'GET_SONGS_LIST'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const REMOVE_ITUNE_FROM_CART = 'REMOVE_ITUNE_FROM_CART'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const CREATE_USER = 'CREATE_USER'
export const SET_CREATE_USER_ERROR = 'SET_CREATE_USER_ERROR'
export const RESET_USER = 'RESET_USER'
export const LOGIN = 'LOGIN'
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

/*
 * action creators
*/

export const error = (message) => {
    return { type: 'ERROR', message };
}

export const getSongsList = (query) => dispatch => {
    let url = '/api/songs/' + query.song;
    if (query.limit !== undefined) {
        url = url + `&limit=${query.limit}`;
    }
    if (query.entity !== undefined) {
        url = url + `&entity=${query.entity}`;
    }
    return axios.get(url)
        .then(res => {
            let songs = res.json();
            dispatch({ type: GET_SONGS_LIST, payload: songs.results })
        }, error => {
            dispatch({ type: SET_CREATE_USER_ERROR, payload: error });

        })
}

export const createUser = (user) => dispatch => {
    return axios.post('/api/users', { user: user })
        .then(res => {
            dispatch({ type: CREATE_USER, payload: res })
        }, error => {
            dispatch({ type: SET_CREATE_USER_ERROR, payload: error });

        })
}

export const login = (user) => dispatch => {
    return axios.post('/api/login', { user: user })
        .then(res => {
            dispatch({ type: LOGIN, payload: res })
        }, error => {
            dispatch({ type: SET_LOGIN_ERROR, payload: error });
        })
}

export const resetUser = () => dispatch => {
    dispatch({ type: RESET_USER, payload: {} })
}

export const addItemToCart = (itune) => dispatch => {
    dispatch({ type: ADD_ITEM_TO_CART, payload: itune })
}




export const removeItemFromCart = (itune) => dispatch => {
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload: itune })
}

export const removeItuneFromCart = (itune) => dispatch => {
    dispatch({ type: REMOVE_ITUNE_FROM_CART, payload: itune })
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