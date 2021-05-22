import { SET_USER, LOG_OUT, SET_TOPICS, REMOVE_TOPIC, DISPLAY_TOAST, SET_SUGGESTIONS } from '../actions/index';

const initialState = {
    user: {},
    topics: [],
    showToast: false,
    suggestions: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.payload
            }

        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        case LOG_OUT:
            return {
                ...state,
                user: {}
            }

        case SET_TOPICS:
            return {
                ...state,
                topics: action.payload
            }

        case REMOVE_TOPIC:
            return {
                ...state,
                user: {
                    ...state.user,
                    topics: action.payload
                }
            }

        case DISPLAY_TOAST:
            return {
                ...state,
                showToast: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;