import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import { LOGIN_OUT, MENUCLICK, RECEIVE_USER, TEST, UUID_CHANGE } from './types' 

/**
 * 用来管理主界面标题的reducer函数
 */
const initHeadTitle = "首页"
const headTitleReducer = (state=initHeadTitle, action) => {
    const {type, data} = action
    switch(type){
        case TEST:
            return state+data
        case MENUCLICK:
            return data
        default:
            return state
    }
}

/**
 * 用来管理主界面标题的reducer函数
 */
const initUser = storageUtils.getUser()
const userReducer = (state=initUser, action) => {
    const {type, data} = action
    switch(type){
        case RECEIVE_USER:
            return data
        case LOGIN_OUT:
            return {}
        default:
            return state
    }
}

const initUuid = ""
const uuidReducer = (state=initUuid, action) => {
    const {type, data} = action
    switch(type){
        case UUID_CHANGE:
            return data
        default:
            return state
    }
}

export default combineReducers({
    headTitle: headTitleReducer,
    user: userReducer,
    uuid: uuidReducer 
})

