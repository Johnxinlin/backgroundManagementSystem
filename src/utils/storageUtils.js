/**
 * 进行local数据存储管理的工具模块
 */
import store from "store";
const USER_KEY = "user_key";
const SELECTED_KEY = "selected_key"

const localStore = {
    // 保存user
    saveUser(user) {
        store.set(USER_KEY, user);
        // localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    // 读取user
    getUser() {
        return store.get(USER_KEY) || {};
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    // 删除user
    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY);
    },

    // 保存高亮的子菜单key
    saveSelectedMenu(key){
        store.set(SELECTED_KEY, key);
    },

    // 获取高亮子菜单key
    getSelectedMenu(){
        return store.get(SELECTED_KEY) || ""
    },

    // 删除高亮子菜单key
    removeSelectedMenu(){
        store.remove(SELECTED_KEY);
    }
};

export default localStore;
