import React, { useEffect, useState } from "react";
import {  Modal } from 'antd';
import { ExclamationCircleOutlined  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.less";
import PubSub from "pubsub-js";
import memoryUtils from "../../utils/memoryUtils";
import localStore from "../../utils/storageUtils";
import { reqWeather } from "../../api";
import formateDate from "../../utils/formatDate";
import LinkButton from "../link-button"

export default function Header() {
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
    const [title, setTitle] = useState("首页");
    const navigate = useNavigate()
    
    const { confirm } = Modal;
    // 侧边栏标题
    const titleDict = {
      'home':"首页",
      'category':"品类管理",
      'product':"商品管理",
      'user':"用户管理",
      'role':"角色管理",
      'bar':"相关数据（柱形图）",
      'line':"相关数据（折线图）",
      'pie':"相关数据（饼图）"
    }

    // 获取侧边栏标题
    const getTitle = () => {
      PubSub.subscribe('title', (_, stateObj) => {
        setTitle(titleDict[stateObj.title])
      })  
    }

    // 确认对话框
    const showConfirm = () => {
      confirm({
        title: '点击确认按钮退出',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
          localStore.removeUser()
          navigate('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    // 获取并设置温度天气
    const getWtAndTemp = async() => {
      try{
        const {temperature, weather} = await reqWeather() ;
        setWeather(weather)
        setTemperature(temperature)
      }catch(err){
        console.log(err);
      }
    }

    useEffect(() => {
        setInterval(() => {
            const currentTime = formateDate(Date.now());
            setCurrentTime(currentTime);
        }, 1000);
        // const {temperature, weather} = getWeather()
        getWtAndTemp()
        getTitle()
        
    }, []);
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎, {memoryUtils.user.username}</span>
                <LinkButton onClick={showConfirm}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{title}</div>
                <div className="header-bottom-right">
                    <span>{currentTime} {temperature}℃</span>
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
