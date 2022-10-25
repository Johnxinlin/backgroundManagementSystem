import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";
import localStore from "../../utils/storageUtils";
import { reqWeather } from "../../api";
import formateDate from "../../utils/formatDate";
import LinkButton from "../link-button";
import { loginOutAction } from "../../redux/actions";

const Header = (props) => {
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
    const [title, setTitle] = useState("首页");
    let location = useLocation();
    // console.log(pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length));

    const { confirm } = Modal;
    // console.log(props.test("123"));
    // 侧边栏标题
    const titleDict = {
        home: "首页",
        category: "品类管理",
        product: "商品管理",
        user: "用户管理",
        role: "角色管理",
        bar: "相关数据（柱形图）",
        line: "相关数据（折线图）",
        pie: "相关数据（饼图）",
    };

    // 获取侧边栏标题
    const getTitle = () => {
        /**通过订阅发布模式获取 */
        // PubSub.subscribe('title', (_, stateObj) => {
        //   setTitle(titleDict[stateObj.title])
        // })

        /**通过useLocation从路由中获取 刷新会重置*/
        // const pathname = location.pathname
        // setTitle(titleDict[pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length)])

        /**  通过localstore获取，如此刷新也不会重置，但路由地址改变会错误显示*/
        // const title = localStore.getSelectedMenu()
        // setTitle(titleDict[title.slice(1, title.length)])

        /** localstore加useLocation,路由地址改变也不会错误显示，刷新也不会重置*/
        const pathname = location.pathname;
        if (
            pathname.slice(pathname.indexOf("/", 2), pathname.length) ===
            "/product/home"
        ) {
            setTitle(titleDict["product"]);
            localStore.saveSelectedMenu("/product");
        } else {
            const titleRoute = pathname.slice(
                pathname.lastIndexOf("/") + 1,
                pathname.length
            );
            setTitle(titleDict[titleRoute]);
            localStore.saveSelectedMenu("/" + titleRoute);
        }

        /** 还有一种方法为使用redux, 最为容易 */
    };

    // 确认对话框
    const showConfirm = () => {
        confirm({
            title: "点击确认按钮退出",
            icon: <ExclamationCircleOutlined />,
            content: "Some descriptions",
            onOk() {
                props.loginOut()
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    // 获取并设置温度天气
    const getWtAndTemp = async () => {
        try {
            const { temperature, weather } = await reqWeather();
            setWeather(weather);
            setTemperature(temperature);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setInterval(() => {
            const currentTime = formateDate(Date.now());
            setCurrentTime(currentTime);
        }, 1000);
        getWtAndTemp();
        console.log(location);
    }, [location]);
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎, {props.username}</span>
                <LinkButton onClick={showConfirm}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{props.title}</div>
                <div className="header-bottom-right">
                    <span>
                        {currentTime} {temperature}℃
                    </span>
                    <img
                        src="https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/weather/icons/a1.png"
                        alt="天气Logo"
                    />
                    <span> {weather}</span>
                </div>
            </div>
        </div>
    );
}

export default connect(
    state => ({title:state.headTitle, username: state.user.name}),
    {loginOut: loginOutAction}
)(Header)