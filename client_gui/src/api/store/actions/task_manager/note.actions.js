import { config } from "../../../../kernels/configs/configuration";
import { serverRequest } from "../../../baseAPI";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../../constants/task_manager/note.constants"

const portName = {
    middleware: 'middlewarePort',
}

export const getNoteList = (userId) => async (dispatch) => {
    dispatch({ type: NOTE_LIST_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/note/${userId}`, 'GET', portName.middleware);
        dispatch({ type: NOTE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_CREATE_REQUEST });
    try {
        const api = '/note/create';
        const url = `http://${config.serverHost}:${config[portName['middleware']]}${api}`;
        console.log('URL:', url);

        const formData = new FormData();
        formData.append('name', note.name);
        formData.append('userId', note.userId);
        formData.append('file', note.contentFile);
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData, 
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
            console.log('Note created successfully:', data);
        } else {
            dispatch({ type: NOTE_CREATE_FAIL, payload: data.message || 'Failed to create note' });
            console.error('Error creating note:', data);
        }
    } catch (error) {
        console.error('Error creating note:', error);
        dispatch({
            type: NOTE_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const updateNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_UPDATE_REQUEST, payload: note });
    try {
        const { data } = await serverRequest('/note/update', 'PUT', portName.middleware, note);
        dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: NOTE_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}