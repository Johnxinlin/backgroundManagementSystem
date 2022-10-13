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

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        "首页",
        "home",
        <div>
            <HomeOutlined />
            <Link to="./home" />
        </div>
    ),
    getItem("商品", "sub1", <MailOutlined />, [
        getItem(
            "品类管理",
            "catagory",
            <div>
                <BarsOutlined />
                <Link to="./category" />
            </div>
        ),
        getItem(
            "商品管理",
            "product",
            <div>
                <AccountBookOutlined />
                <Link to="./product" />
            </div>
        ),
    ]),
    getItem(
        "用户管理",
        "user",
        <div>
            <TeamOutlined />
            <Link to="./user" />
        </div>
    ),
    getItem(
        "角色管理",
        "role",
        <div>
            <UserOutlined />
            <Link to="./role" />
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
                    <Link to="./charts/bar" />
                </div>
            ),
            getItem(
                "折线图",
                "line",
                <div>
                    <LineChartOutlined />
                    <Link to="./charts/line" />
                </div>
            ),
            getItem(
                "饼图",
                "pie",
                <div>
                    <PieChartOutlined />
                    <Link to="./charts/pie" />
                </div>
            ),            
        ]
    ),
];

export default function LeftNav() {
    // const location = useLocation()
    // const req = /\/([a-zA-Z0-9]+)$/
    // // 获取并设置标题
    // const getTitle = () => {
    //     setTitle(req.exec(location.pathname)[1])
    //     console.log(req.exec(location.pathname)[1]);
    //     PubSub.publish('title', {title:title})
    //   }

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
                            values.selectedKeys = ''
                            localStore.saveSelectedMenu(values.key)
                            // getTitle()
                            // sendPath()
                        }}
                    onOpenChange = {(values) => {
                        console.log(values[values.length - 1]);
                        localStore.saveSelectedMenu(values[values.length - 1]);
                    }}
                    
                />
            </div>
        </div>
    );
}
