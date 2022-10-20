import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {
    MailOutlined,
    PieChartOutlined,
    AccountBookOutlined,
    BarChartOutlined,
    LineChartOutlined,
    BarsOutlined,
    AreaChartOutlined,
    HomeOutlined,
    UserOutlined,
    TeamOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import PubSub from "pubsub-js";
import "./index.less";
import logo from "./images/马卡龙.png";
import localStore from "../../utils/storageUtils";

const req = /\/([a-zA-Z0-9]+)$/ // 匹配路由标题

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const linkClick = (event) => {
    console.log(event.target.href);
    console.log(req.exec(event.target.href)[1]);
    const title = req.exec(event.target.href)[1]
    PubSub.publish('title', {title:title})
}

const items = [
    getItem(
        "首页",
        "home",
        <div>
            <HomeOutlined />
            <Link to="./home" onClick={linkClick}/>
        </div>
    ),
    getItem("商品", "sub1", <MailOutlined />, [
        getItem(
            "品类管理",
            "catagory",
            <div>
                <BarsOutlined />
                <Link to="./category" onClick={linkClick} />
            </div>
        ),
        getItem(
            "商品管理",
            "product",
            <div>
                <AccountBookOutlined />
                <Link to="./product" onClick={linkClick}/>
            </div>
        ),
    ]),
    getItem(
        "用户管理",
        "user",
        <div>
            <TeamOutlined />
            <Link to="./user" onClick={linkClick}/>
        </div>
    ),
    getItem(
        "角色管理",
        "role",
        <div>
            <UserOutlined />
            <Link to="./role" onClick={linkClick}/>
        </div>
    ),
    getItem(
        "图形图表",
        "sub2",
        <AreaChartOutlined />,
        [
            getItem(
                "柱形图",
                "bar",
                <div>
                    <BarChartOutlined />
                    <Link to="./charts/bar" onClick={linkClick} />
                </div>
            ),
            getItem(
                "折线图",
                "line",
                <div>
                    <LineChartOutlined />
                    <Link to="./charts/line" onClick={linkClick}/>
                </div>
            ),
            getItem(
                "饼图",
                "pie",
                <div>
                    <PieChartOutlined />
                    <Link to="./charts/pie" onClick={linkClick}/>
                </div>
            ),            
        ]
    ),
];

export default function LeftNav() {

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
                    items={items}
                    onSelect={
                        (values) => {
                            // values.selectedKeys = ''
                            console.log(values);
                            localStore.saveSelectedMenu(values.key)
                            // getTitle()
                            // sendPath()
                        }}
                    onOpenChange = {(values) => {
                        // console.log(values[values.length - 1]);
                        localStore.saveSelectedMenu(values[values.length - 1]);
                    }}
                    
                />
            </div>
        </div>
    );
}
