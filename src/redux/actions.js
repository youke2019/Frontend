export const UPDATE_USER_INFO = 'UPDATEUSERINFO'
export const LOAD_USER_INFO = 'LOADUSERINFO'
export const CLEAR_USER_INFO = 'CLEARUSERINFO'

export const updateUserInfo = (data) => ({
    type:UPDATE_USER_INFO,
    data
})

export const loadUserInfo = (data) => ({
    type:LOAD_USER_INFO,
    data
})

export const clearUserInfo = () => ({
    type:CLEAR_USER_INFO,
})
