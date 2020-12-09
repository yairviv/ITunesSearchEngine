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
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const SET_LOGGED_IN_USER = 'REFRESH_TOKEN'
export const SET_NOT_LOGGED_IN_USER = 'REFRESH_TOKEN'

/*
 * action creators
*/

export const error = (message) => {
    return { type: 'ERROR', message };
}

export const getSongsList = (query) => dispatch => {
    const token = getCookie('accessToken');
    if (token) {
        setHeader('Authorization', `Bearer ${token}`);
    }
    let url = '/api/songs/' + query.song;
    if (query.limit !== undefined) {
        url = url + `&limit=${query.limit}`;
    }
    if (query.entity !== undefined) {
        url = url + `&entity=${query.entity}`;
    }
    return axios.get(url)
        .then(res => {
            dispatch({ type: GET_SONGS_LIST, payload: res.data.results })
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

export const checkUserLogin = () => dispatch => {
    return axios.post('/api/isLoggedIn')
        .then(res => {
            dispatch({ type: SET_LOGGED_IN_USER, payload: res })
        }, error => {
            dispatch({ type: SET_NOT_LOGGED_IN_USER, payload: error });

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

export const refreshToken = () => dispatch => {
    const refreshToken = getCookie('refreshToken');
    if (token) {
        return axios.post('/api/token', { token: refreshToken })
            .then(res => {
                dispatch({ type: REFRESH_TOKEN, payload: res })
            }, error => {
                dispatch({ type: SET_LOGIN_ERROR, payload: error });
            })
    }
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

function getCookie(key) {
    var value =
        decodeURIComponent(
            document.cookie.replace(
                new RegExp(
                    '(?:(?:^|.*;)\\s*' +
                    encodeURIComponent(key).replace(/[\\-\\.\\+\\*]/g, '\\$&') +
                    '\\s*\\=\\s*([^;]*).*$)|^.*$'
                ),
                '$1'
            )
        ) || null;

    if (
        value &&
        value.substring(0, 1) === '{' &&
        value.substring(value.length - 1, value.length) === '}'
    ) {
        try {
            value = JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    return value;
};

function setHeader(name, value) {
    axios.defaults.headers.common[name] = value;
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