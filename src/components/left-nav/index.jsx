import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AppstoreOutlined,
    MailOutlined,
    PieChartOutlined,
    AccountBookOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import "./index.less";
import logo from "./images/马卡龙.png";

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
    getItem("首页", "1", <PieChartOutlined />),
    // getItem("Option 2", "2", <DesktopOutlined />),
    // getItem("Option 3", "3", <ContainerOutlined />),
    getItem("商品", "sub1", <MailOutlined />, [
        getItem("品类管理", "5", <AppstoreOutlined />),
        getItem("商品管理", "6", <AccountBookOutlined/>),
        // getItem("Option 7", "7"),
        // getItem("Option 8", "8"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
        getItem("Submenu", "sub3", null, [
            getItem("Option 11", "11"),
            getItem("Option 12", "12"),
        ]),
    ]),
];

export default function LeftNav() {
    const [collapsed, setCollapsed] = useState(false);


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
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </div>
    );
}
