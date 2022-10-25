import React, { Component } from "react";
import { Button, Form, Input, message } from "antd";
// import { login } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
// import storageUtils from "../../utils/storageUtils";
import { withNavigation } from "../../components/withNavigation";
import "./login.less";
import logo from "./images/马卡龙.png";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions";


const Item = Form.Item;


class Login extends Component {
    
    // 登录表单提交完成事件
    onFinish = (values) => {
        const { validateFields } = this.form;
        // 字段校验
        validateFields()
            .then(
                async(value) => {
                    if (/^[a-zA-Z0-9_]+$/.test(value.password)) {
                        // 请求登录
                        // let result = await login(value.username, value.password)
                        // if(result.status === 200 && !result.data.error){
                        //     console.log(result);
                        //     message.success("登录成功")
                        //     memoryUtils.user = result.data
                        //     storageUtils.saveUser(result.data)
                        //     // 跳转到管理界面
                        //     console.log(this.props)
                        //     this.props.navigate('/admin')
                        // }else if(result.status === 204){
                        //     message.error("用户不存在")
                        // } 
                       this.props.login(value)
                    }else{
                        message.error("请求失败")
                    }
                }
            ).catch((errorInfo) => {
                console.log(errorInfo);
            });
    };

    onFinishFailed = (values) => {
        console.log(values);
    };

    render() {
        const user = memoryUtils.user
        if(user && user.id){
            console.log(user);
            this.props.navigate("/admin")
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        ref={(c) => (this.form = c)}
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Item
                            label="Username"
                            name="username"
                            className="input"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                                {
                                    min: 4,
                                    message: "用户名至少为4位",
                                },
                                {
                                    max: 14,
                                    message: "用户名最多为14位",
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: "用户名只能由英文数字及下划线组成",
                                },
                            ]}
                        >
                            <Input />
                        </Item>

                        <Item
                            label="Password"
                            name="password"
                            className="input"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Item>

                        <Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Submit
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {login: loginAction}
)(withNavigation(Login))
