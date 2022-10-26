import React, { useState } from "react";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { Card, Statistic, Timeline, DatePicker } from "antd";
import "./home.less";
import Line from "./line";
import Bar from "./bar";

export default function Home() {
    const [isVisited, setIsVisited] = useState(true);
    const [dates, setDates] = useState(null);
    const [hackValue, setHackValue] = useState(null);
    const [value, setValue] = useState(null);
    const disabledDate = (current) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
        const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
        return !!tooEarly || !!tooLate;
    };
    const onOpenChange = (open) => {
        if (open) {
            setHackValue([null, null]);
            setDates([null, null]);
        } else {
            setHackValue(null);
        }
    };

    const handleChange = (type) => {
        return (event) => {
            setIsVisited(type);
        };
    };
    return (
        <div className="home">
            <div className="home-header">
                <Card
                    title={<span>商品总量</span>}
                    extra={<QuestionCircleOutlined />}
                    className="home-statistic-card"
                >
                    <Statistic
                        value={1128163}
                        suffix="个"
                        style={{ fontWeight: "bolder" }}
                    />
                    <Statistic
                        value={15}
                        valueStyle={{ fontSize: 15 }}
                        prefix={"周同比"}
                        suffix={
                            <div>
                                % <ArrowDownOutlined style={{ color: "red" }} />
                            </div>
                        }
                    />
                    <Statistic
                        value={10}
                        valueStyle={{
                            fontSize: 15,
                        }}
                        prefix={"日同比"}
                        suffix={
                            <div>
                                % <ArrowUpOutlined />
                            </div>
                        }
                    />
                </Card>

                <Line className="home-line" />
            </div>

            <Card
                title={
                    <div className="home-menu">
                        <span
                            className={
                                isVisited
                                    ? "home-menu-active home-menu-visited"
                                    : "home-menu-visited"
                            }
                            onClick={handleChange(true)}
                        >
                            访问量
                        </span>
                        <span
                            className={isVisited ? "" : "home-menu-active"}
                            onClick={handleChange(false)}
                        >
                            销售量
                        </span>
                    </div>
                }
                className="home-content"
                extra={
                    <DatePicker.RangePicker
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={(val) => setDates(val)}
                        onChange={(val) => setValue(val)}
                        onOpenChange={onOpenChange}
                    />
                }
            >
                <Card
                    className="home-table-left"
                    title={isVisited ? "访问趋势" : "销售趋势"}
                    bodyStyle={{ padding: 0, height: 275 }}
                    extra={<ReloadOutlined />}
                >
                    <Bar />
                </Card>
                <Card
                    title="任务"
                    extra={<ReloadOutlined />}
                    className="home-table-right"
                >
                    <Timeline>
                        <Timeline.Item color="green">
                            新版本迭代会
                        </Timeline.Item>
                        <Timeline.Item color="green">
                            完成网站设计初版
                        </Timeline.Item>
                        <Timeline.Item color="red">
                            <p>联调接口</p>
                            <p>功能验收</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>登录功能设计</p>
                            <p>权限验证</p>
                            <p>页面排版</p>
                        </Timeline.Item>
                    </Timeline>
                </Card>
            </Card>
        </div>
    );
}
