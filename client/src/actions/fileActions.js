import axios from 'axios';
import { UPLOAD_FILE, DELETE_FILE } from './types';
import { setResponseLoading } from './enterpriseActions';

export const uploadFile = (file) => dispatch => {
    dispatch(setResponseLoading());

    let formData = new FormData();
    formData.append('file', file)

    return axios.post('/api/files/upload', formData, {'content-type': 'multipart/form-data'}).then(res => dispatch({
        type: UPLOAD_FILE,
        payload: res.data
    }));
}

export const deleteFile = (file_key) => dispatch => {
    dispatch(setResponseLoading());
    return axios.delete('/api/files/delete/' + file_key).then(res => dispatch({
        type: DELETE_FILE,
        payload: res.data
    }));
}
