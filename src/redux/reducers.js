import { combineReducers } from 'redux'
import {
    UPDATE_USER_INFO,
    LOAD_USER_INFO,
    CLEAR_USER_INFO,
    SEARCH_COURSES,
} from "./actions.js"
import initialState from "./state";
import { saveData } from '../utils/LocalStorage'
import { SET_LOGIN, UNSET_LOGIN } from './actions'


function userInfoReducer(state=initialState.user_info, action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            saveData({
                key:"user",
                data:action.data
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

function loginStateReducer(state=initialState.login_ready, action) {
    switch (action.type) {
        case SET_LOGIN:
            return true
        case UNSET_LOGIN:
            return false
        default:
            return state
    }
}

export const combinedReducer = combineReducers({
    user_info : userInfoReducer,
    course_list: courseReducer,
    login_ready: loginStateReducer,
})