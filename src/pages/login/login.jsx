import React, { Component } from "react";
import { Button, Form, Input, message, Image } from "antd";
// import { login } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
// import storageUtils from "../../utils/storageUtils";
import { withNavigation } from "../../components/withNavigation";
import "./login.less";
import logo from "./images/马卡龙.png";
import { connect } from "react-redux";
import { loginAction, keepUuidAction } from "../../redux/actions";
import { v4 } from "uuid";


const Item = Form.Item;


class Login extends Component {
    state = {
        verifyPic: ""
    }
    
    // 登录表单提交完成事件
    onFinish = (values) => {
        const { validateFields } = this.form;
        // 字段校验
        validateFields()
            .then(
                async(value) => {
                    if (/^[a-zA-Z0-9_]+$/.test(value.password)) {
                        console.log("validateFields: ",value, " uuid: ", this.props.uuid);
                       this.props.login({...value, uuid:this.props.uuid})
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

    resetVerifyCode = () => {
        const uuid = v4()
        this.props.saveUuid(uuid)
        const result = "http://127.0.0.1:8001/users/image/verifiaction/" + uuid
        console.log("resetVerifyCode(): ", result);
        this.setState({verifyPic: result})
    }

    componentDidMount = () => {
        this.resetVerifyCode()
    }

    render() {
        const user = memoryUtils.user
        // const user = this.props.user 
        const {verifyPic} = this.state
        // console.log(user);
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
                        <Item
                            label = {<Image height={40} width={140} src={verifyPic} onClick={this.resetVerifyCode}/>}
                            name="verify" 
                            className="input"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your verifyCode!",
                                },
                            ]}
                            
                        >
                            <Input/>
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
    state => ({user: state.user, uuid: state.uuid}), 
    {login: loginAction, saveUuid: keepUuidAction}
)(withNavigation(Login))
