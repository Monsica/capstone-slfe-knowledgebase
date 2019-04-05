import axios from 'axios';
import {GET_USER_UPDATE_PASSWORD, ADD_USER, GET_USER_SESSION, GET_USER_REGISTER, RESPONSE_LOADING} from './types';

/* n is not defined ... removing for now
export const getUserSession = (username, password) => dispatch => {  //add integration for query here
  dispatch(setResponseLoading());
  return axios
  .get(`/api/users/account/${username}/${n}`)
  .then(res =>
    dispatch({
      type: GET_DOMAIN_ENTRIES,
      payload: res.data
    })
  )
};
*/
export const addUserFunc = (user) => dispatch => {
  dispatch(setResponseLoading());
  return axios.post('/api/users/newUserRequest', user).then(res => dispatch({
    type: ADD_USER,
    payload: res.data
  }))
};

export const setResponseLoading = () => {
  return{
    type: RESPONSE_LOADING
  }
}
