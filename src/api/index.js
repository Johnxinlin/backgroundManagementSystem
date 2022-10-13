/*
    包含应用中所有请求函数的模块
*/
import { createHashHistory } from "@remix-run/router";
import { message } from "antd";
import jsonp from "jsonp";
import request from "./request";
import Request from "./request";

// 用户登录
export const Login = (username, password) =>
    Request("/user/login/", { username, password }, "POST");

// 添加用户
export const reqAddUser = (userInfo) =>
    Request("/manage/user/add", userInfo, "POST");

// json接口请求函数
export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url =
            "https://restapi.amap.com/v3/weather/weatherInfo?key=007c961734ccdfb42c65e5ec869ee957&city=440300&extensions=base";
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === '1') {
                const { temperature, weather} = data.lives[0];
                resolve({temperature, weather})
            } else {
                message.info("天气请求失败");
            }
        });
    });
};

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => {
    Request('', {parentId}, 'GET')
}

// 添加分类
export const addCategorys = (categoryName, parentID) => {
    Request('', {categoryName, parentID}, 'POST')
}

// 更新分类
export const updateCategorys = (categoryName, parentID) => {
    Request('', {categoryName, parentID}, 'POST')
}
