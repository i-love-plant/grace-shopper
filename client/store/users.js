import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const initialState = {
    users: []
}

/**
 * ACTION CREATORS
 */
const getUsers = users => ({ type: GET_USERS, users })

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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      //return action.users
      return Object.assign({}, state, { users: action.users });
    default:
      return state
  }
}
