import { combineReducers } from 'redux'
import {
    UPDATE_USER_INFO,
    LOAD_USER_INFO,
    CLEAR_USER_INFO,
    SEARCH_COURSES,
} from "./actions.js"
import initialState from "./state";
import axios from 'axios'


function userInfoReducer(state=initialState.user_info, action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            storage.save({
                key: 'user',
                data: action.data
            })
            state = action.data
            return state
        case LOAD_USER_INFO:
            state = action.data
            return state
        case CLEAR_USER_INFO:
            state = null
            return state
        default:
            return state
    }
}

function courseReducer(state=initialState.course_list, action) {
    switch (action.type) {
        case SEARCH_COURSES:
            state = action.data
            return state
        default:
            return state
    }
}

export const combinedReducer = combineReducers({
    user_info : userInfoReducer,
    course_list: courseReducer,
})