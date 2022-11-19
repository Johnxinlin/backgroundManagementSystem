/*
    包含应用中所有请求函数的模块
*/
import { message } from "antd";
import jsonp from "jsonp";
import request from "./request";

// 用户登录
export const login = (username, password, verify, uuid) =>
    request("/users/login/", { username, password, verify, uuid }, "POST");

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
    request('', {parentId}, 'GET')
}

// 添加分类
export const addCategorys = (categoryName, parentID) => {
    request('', {categoryName, parentID}, 'POST')
}

// 更新分类
export const updateCategorys = (categoryName, parentID) => {
    request('', {categoryName, parentID}, 'POST')
}

// 请求商品列表
export const reqProducts = (pageNum, pageSize) => {
    request('', {pageNum, pageSize}, 'GET')
}

// 搜索商品分类列表
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => {
    request('', {
        pageNum,
        pageSize,
        [searchType]: searchName   // 想要让变量的值作为属性得上中括号
    }, 'GET')
}

// 根据categoryId获取商品分类
export const reqCategoryName = categoryId => {
    request('', {categoryId})
}

//  更新商品的状态（上架/下架)
export const reqUpdateStatus = (productId, status) => {
    request('', {productId, status}, 'POST')
}

// 删除图片
export const reqDeleteImage = (name) => {
    request('', {name}, 'POST')
}

// 添加或修改商品
export const reqAddOrUpdateProduct = (product) => {
    request('/manage/product/' + (product._id ? 'update': 'add'), product, 'POST')
}

// 获取所有角色的列表
export const reqRoles = () => {
    request('/manage/roles')
}

// 添加角色
export const reqAddRole = (name) => {
    request('/manage/role/add', {name}, 'POST')
}

// 更新角色
export const reqUpdateRole = (menus) => {
    request('/manage/role/update', {menus}, 'POST')
}

// 获取用户列表
export const reqUsersList = () => {
    request('/manage/user/list')
}

// 删除用户
export const reqDeleteUser = (userId) => {
    request('/manage/user/delete', {userId}, 'POST')
}

// 添加或更新用户
export const reqAddOrUpdateUser = (user) => {
    request('/manage/user/' + (user.password ? 'add' : 'update'), user, 'POST')
}

