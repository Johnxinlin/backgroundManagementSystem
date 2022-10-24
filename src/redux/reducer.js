import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import { MENUCLICK, TEST } from './types'

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
        default:
            return state
    }
}

export default combineReducers({
    headTitle: headTitleReducer,
    user: userReducer
})

