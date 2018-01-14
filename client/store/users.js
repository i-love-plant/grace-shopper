import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const GET_SINGLE_USER = 'GET_SINGLE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
    users: [],
    currentUser: {}
}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })
const getSingleUser = user => ({ type: GET_SINGLE_USER, user });

/**
 * THUNK CREATORS
 */
export function fetchUsers() {
    return function thunk(dispatch) {
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => {
                const action = getUsers(users);
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}

export function fetchUser(userId) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${userId}`)
            .then(res => res.data)
            .then(user => {
                const action = getSingleUser(user);
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case GET_SINGLE_USER:
      return Object.assign({}, state, { currentUser: action.user })
    default:
      return state
  }
}
