import { login } from '../api'
import {LOGIN_OUT, MENUCLICK, RECEIVE_USER,  TEST, UUID_CHANGE} from './types'
import localStore from '../utils/storageUtils'
import memoryUtils from '../utils/memoryUtils'
import { message } from 'antd'

export const testAction = (data) => ({type: TEST, data: data})

export const menuListClickAction = (data) => ({type: MENUCLICK, data: data})

// 登录请求Action
export const loginAction = (data) => {
    return async dispatch => {
        // 1.执行异步请求
        const result = await login(data.username, data.password, data.verify, data.uuid)

        // 2.1 如果成功，分发成功的action
        if(result.status === 200 && !result.data.error){
            const user = result.data
            console.log(result, data.verify);
            localStore.saveUser(user)
            memoryUtils.user = user
            dispatch(receiveUserAction(user))
            message.success("登陆成功！！")
        }
    }
}

export const receiveUserAction = (data) => ({type: RECEIVE_USER, data})

export const loginOutAction = () => {
    localStore.removeUser();
    memoryUtils.user = ""
    return {type: LOGIN_OUT}
}

export const keepUuidAction = (data) => {
    return {type: UUID_CHANGE, data: data}
}

