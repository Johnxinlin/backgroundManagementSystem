/*
    包含应用中所有请求函数的模块
*/
import Request from './request'

// 用户登录
export const Login = (username, password) => Request('/user/login/', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (userInfo) => Request('/manage/user/add', userInfo, 'POST')

