import * as axios from 'axios';

export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOPICS = 'SET_TOPICS';
export const REMOVE_TOPIC = 'REMOVE_TOPIC';
export const DISPLAY_TOAST = 'DISPLAY_TOAST';
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

export function getSuggestions(query) {
    return function (dispatch) {
        axios.get(`/search?query=${query}`)
            .then (suggestions => dispatch({ type: SET_SUGGESTIONS, payload: suggestions.data }))
            .catch(err => console.error(err))
    }
}

export function setUser(user) {
    return { type: SET_USER, payload: user };
} 

export function logOut() {
    return { type: LOG_OUT }
}

export function getTopics() {
    return function (dispatch) {
        axios.get('/topic')
            .then(topics => dispatch({ type: SET_TOPICS, payload: topics.data }))
            .catch(err => console.log(err));
    }
}

export function addTopicToUser(ids) {
    return function (dispatch) {
        axios.post(`/user/${ids.user}/topic/${ids.topic}`)
            .then (user => dispatch({ type: SET_USER, payload: user.data }))
            .catch (err => console.log(err));
    }
}

export function removeUserTopic(filteredTopics) {
    return { type: REMOVE_TOPIC, payload: filteredTopics };
}

export function displayToast(boolean) {
    return { type: DISPLAY_TOAST, payload: boolean }
}