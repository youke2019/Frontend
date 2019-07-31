import { combineReducers } from 'redux'
import {
  UPDATE_USER_INFO,
  LOAD_USER_INFO,
  CLEAR_USER_INFO,
  SEARCH_COURSES
} from './actions.js'
import initialState from './state'
import { loadData, saveData } from '../utils/LocalStorage'
import {
  ADD_TO_SORTLIST,
  CLEAR_SORTLIST, LOAD_SORTLIST,
  REMOVE_FROM_SORTLIST,
  SET_LOGIN,
  UNSET_LOGIN,
  UPDATE_SORTLIST
} from './actions'

function userInfoReducer (state = initialState.user_info, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      saveData({
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

function courseReducer (state = initialState.course_list, action) {
  switch (action.type) {
    case SEARCH_COURSES:
      state = action.data
      return state
    default:
      return state
  }
}

function loginStateReducer (state = initialState.login_ready, action) {
  switch (action.type) {
    case SET_LOGIN:
      return true
    case UNSET_LOGIN:
      return false
    default:
      return state
  }
}

function sortlistReducer (state = initialState.sortlist, action) {

  let newlist = [];
  switch (action.type) {
    case ADD_TO_SORTLIST:
      action.data.classes.map((classItem)=>{
        let tmpArray = [];
        let segArray=[];
        let tmp = {};
        classItem.classSegments.forEach(segment=>{
          tmp = Object.assign({},segment);
          tmp.class_sec_id = 0
          tmp = JSON.stringify(tmp);
          if(!tmpArray.some(t => t === tmp)){
            tmpArray.push(tmp)
            segArray.push(segment)
          }
          classItem.classSegments = segArray;
        })
      })
      saveData({
        key:'sortlist',
        data:state.concat([action.data])
      })
        return state.concat([action.data])
    case REMOVE_FROM_SORTLIST:
      state.forEach(item=>{
        if(item.course_id !== action.data.course_id)
         newlist.push(item);
      })
      saveData({
        key:'sortlist',
        data:newlist
      })
      return newlist;
    case CLEAR_SORTLIST:
      return []
    case LOAD_SORTLIST:
      return action.data;
    case UPDATE_SORTLIST:
      state.forEach(item=>{
        if(item.course_id !== action.data.course_id)
          newlist.push(item);
        else
          newlist.push(action.data)
      })
      saveData({
      key:'sortlist',
      data: newlist
    })
      return newlist;
    default:
      return state

  }
}

export const combinedReducer = combineReducers({
  user_info: userInfoReducer,
  course_list: courseReducer,
  login_ready: loginStateReducer,
  sortlist: sortlistReducer
})