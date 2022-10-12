import React, { useEffect, useState } from "react";
import {  Modal } from 'antd';
import { ExclamationCircleOutlined  } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.less";
import memoryUtils from "../../utils/memoryUtils";
import localStore from "../../utils/storageUtils";
import { reqWeather } from "../../api";
import formateDate from "../../utils/formatDate";
import LinkButton from "../link-button"

export default function Header() {
    const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
    const [title, setTitle] = useState("Home");
    const navigate = useNavigate()
    
    const { confirm } = Modal;
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
        
    }, []);
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎, {memoryUtils.user.username}</span>
                <LinkButton onClick={showConfirm}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">首页</div>
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
