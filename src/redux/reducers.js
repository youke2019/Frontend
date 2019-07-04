import { combineReducers } from 'redux'
import {UPDATE_USER_INFO,LOAD_USER_INFO} from "./actions.js"

function userInfoReducer(state=[], action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            global.storage.save({
                key: 'user',
                data: action.data
            })
            return action.data
        case LOAD_USER_INFO:
            return action.data
        default:
            return state
    }
}

export const combinedReducer = combineReducers({
    user_info : userInfoReducer
})