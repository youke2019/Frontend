import { combineReducers } from 'redux'
import {
    UPDATE_USER_INFO,
    LOAD_USER_INFO,
    CLEAR_USER_INFO,
} from "./actions.js"
import initialState from "./state";

import Global from '../Global'

function userInfoReducer(state=initialState.user_info, action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            storage.save({
                key: 'user',
                data: action.data
            })
            state=action.data
            return state
        case LOAD_USER_INFO:
            state=action.data
            return state
        case CLEAR_USER_INFO:
            state= null
            return state
        default:
            return state
    }
}

export const combinedReducer = combineReducers({
    user_info : userInfoReducer
})