import axios from 'axios'
import {message} from 'antd'

export default function request(url, data = {}, type){

    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        
        if(type === 'GET'){
            promise = axios.get(url, {params:data})
        }else{
            promise = axios.post(url, data)
        }
        // 2. 如果成功了，调用resolve(value)
        promise.then(response => {
            resolve(response)
        }).catch(error => {// 3. 如果失败了，调用reject(error)
            console.error("error: ", error);
            message.error('请求出错了o(╥﹏╥)o：' + error)
        })

        
    })
}