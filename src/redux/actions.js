export const UPDATE_USER_INFO = 'UPDATEUSERINFO'
export const LOAD_USER_INFO = 'LOADUSERINFO'
export const CLEAR_USER_INFO = 'CLEARUSERINFO'

export const updateUserInfo = (data) => ({
  type: UPDATE_USER_INFO,
  data
})

export const loadUserInfo = (data) => ({
  type: LOAD_USER_INFO,
  data
})

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO
})

export const SET_LOGIN = 'SETLOGIN'
export const UNSET_LOGIN = 'UNSETLOGIN'

export const setLogin = () => ({
  type: SET_LOGIN
})
export const unsetLogin = () => ({
  type: UNSET_LOGIN
})

export const ADD_TO_SORTLIST = 'ADDTOSORTLIST'
export const UPDATE_SORTLIST = 'UPDATESORTLIST'
export const REMOVE_FROM_SORTLIST = 'REMOVEFROMOSORTLIST'
export const CLEAR_SORTLIST = 'CLEARSORTLIST'
export const LOAD_SORTLIST = "LOADSORTLIST"
export const addToSortlist = (data) => ({
  type: ADD_TO_SORTLIST,
  data
})
export const removeFromSortlist = (data) => ({
  type: REMOVE_FROM_SORTLIST,
  data
})
export const clearSortlist = (data) => ({
  type: CLEAR_SORTLIST,
  data
})
export const loadSortlist = (data) =>({
  type: LOAD_SORTLIST,
  data,
})
export const updateSortlist = (data) =>({
  type:UPDATE_SORTLIST,
  data,
})
