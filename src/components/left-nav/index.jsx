import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import PubSub from "pubsub-js";
import "./index.less";
import logo from "./images/马卡龙.png";
import localStore from "../../utils/storageUtils";
import menuIconList from "../../config/menuIconConfig";
import menuList from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";

const req = /\/([a-zA-Z0-9]+)$/; // 匹配路由标题

// 配置菜单项
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

/**通过订阅发布者模式更新标题 */
// const linkClick = (event) => {
//     console.log("left-nav linkClick() : ",req.exec(event.target.href)[1]);
//     const title = req.exec(event.target.href)[1];
//     PubSub.publish("title", { title: title });
// };

// 静态菜单栏
// const items = [
//     getItem(
//         "首页",
//         "home",
//         <div>
//             <HomeOutlined />
//             <Link to="./home" onClick={linkClick}/>
//         </div>
//     ),
//     getItem("商品", "products", <MailOutlined />, [
//         getItem(
//             "品类管理",
//             "catagory",
//             <div>
//                 <BarsOutlined />
//                 <Link to="./category" onClick={linkClick} />
//             </div>
//         ),
//         getItem(
//             "商品管理",
//             "product",
//             <div>
//                 <AccountBookOutlined />
//                 <Link to="./product" onClick={linkClick}/>
//             </div>
//         ),
//     ]),
//     getItem(
//         "用户管理",
//         "user",
//         <div>
//             <TeamOutlined />
//             <Link to="./user" onClick={linkClick}/>
//         </div>
//     ),
//     getItem(
//         "角色管理",
//         "role",
//         <div>
//             <UserOutlined />
//             <Link to="./role" onClick={linkClick}/>
//         </div>
//     ),
//     getItem(
//         "图形图表",
//         "charts",
//         <AreaChartOutlined />,
//         [
//             getItem(
//                 "柱形图",
//                 "bar",
//                 <div>
//                     <BarChartOutlined />
//                     <Link to="./charts/bar" onClick={linkClick} />
//                 </div>
//             ),
//             getItem(
//                 "折线图",
//                 "line",
//                 <div>
//                     <LineChartOutlined />
//                     <Link to="./charts/line" onClick={linkClick}/>
//                 </div>
//             ),
//             getItem(
//                 "饼图",
//                 "pie",
//                 <div>
//                     <PieChartOutlined />
//                     <Link to="./charts/pie" onClick={linkClick}/>
//                 </div>
//             ),
//         ]
//     ),
// ];

export default function LeftNav() {

    // 判断当前登陆用户对item是否有权限 实现根据用户权限展示菜单栏
    const hasAuth = (item) => {
        const key = item.key;
        const menus = memoryUtils.user.role.menus;
        console.log(menus);
        const username = memoryUtils.user.username;
        // 如果用户为admin
        if (
            username === "admin" ||
            item.isPublic ||
            menus.indexOf(key) !== -1
        ) {
            return true;
        } // 如果当前用户有此Item的某个子item的权限
        else if (item.children) {
            return !!item.children.find(
                (child) => menus.indexOf(child.key) !== -1
            );
        }
    };

    // 根据配置项动态创建菜单栏
    const createMenu = (menuList) => {
        return menuList.reduce((pre, item) => {

            // 配置好接口时使用
            // if (hasAuth(item)) {
            //     pre.push(
            //         getItem(
            //             item.title,
            //             item.key,
            //             <div>
            //                 {menuIconList[item.key]}
            //                 <Link to={"." + item.key} onClick={linkClick} />
            //             </div>,
            //             item.children ? createMenu(item.children) : null
            //         )
            //     );
            // }
            
            pre.push(
                getItem(
                    item.title,
                    item.key,
                    <div>
                        {menuIconList[item.key]}
                        <Link to={"." + item.key}  />
                    </div>,
                    item.children ? createMenu(item.children) : null
                )
            );
            
            return pre;
        }, []);
    };

    const dynamicItems = createMenu(menuList);
    return (
        <div className="left-nav">
            <Link to="/" className="left-nav-header">
                <img src={logo} alt="logo" />
                <h1>react后台</h1>
            </Link>
            <div
                style={{
                    width: "100%",
                }}
            >
                <Menu
                    defaultSelectedKeys={[localStore.getSelectedMenu()]}
                    defaultOpenKeys={[localStore.getSelectedMenu()]}
                    mode="inline"
                    theme="dark"
                    items={dynamicItems}
                    onSelect={(values) => {
                        console.log("left-nav Menu组件 onSelect(): ",values);
                        localStore.saveSelectedMenu(values.key);

                    }}
                    onOpenChange={(values) => {
                        localStore.saveSelectedMenu(values[values.length - 1]);
                    }}
                />
            </div>
        </div>
    );
}
