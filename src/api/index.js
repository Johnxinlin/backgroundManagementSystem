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

// 请求商品列表
export const reqProducts = (pageNum, pageSize) => {
    Request('', {pageNum, pageSize}, 'GET')
}

// 搜索商品分类列表
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => {
    Request('', {
        pageNum,
        pageSize,
        [searchType]: searchName   // 想要让变量的值作为属性得上中括号
    }, 'GET')
}

// 根据categoryId获取商品分类
export const reqCategoryName = categoryId => {
    Request('', {categoryId})
}

//  更新商品的状态（上架/下架)
export const reqUpdateStatus = (productId, status) => {
    Request('', {productId, status}, 'POST')
}

// 删除图片
export const reqDeleteImage = (name) => {
    Request('', {name}, 'POST')
}

// 添加或修改商品
export const reqAddOrUpdateProduct = (product) => {
    Request('/manage/product/' + (product._id ? 'update': 'add'), product, 'POST')
}
