import axios from 'axios';
import {
  SUBMIT_DATA_REQUEST,
  SUBMIT_DATA_SUCCESS,
  SUBMIT_DATA_FAILED,
} from './action-type';


export const submitData = data => dispatch => {
  dispatch({ type: SUBMIT_DATA_REQUEST });
  axios
    .post('/api/data', data)
    .then(res => {
      return dispatch({
        type: SUBMIT_DATA_SUCCESS,
        data: res.data
      });
    })
    .catch(error => {
      return dispatch({ type: SUBMIT_DATA_FAILED, error });
    });
};