import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Form, Input, message, Select } from "antd";
import PropTypes from "prop-types";
import { reqAddOrUpdateUser } from "../../api";
const Item = Form.Item;
const Option = Select.Option;

const UserForm = forwardRef((props, ref) => {
    const formUser = useRef();
    const { roles,  user } = props; 
    const currentUser = user !== {} ? user : null  // 当前行用户

    useImperativeHandle(ref, () => ({
        // 表单验证
        validate: () => {
            const {validateFields, resetFields} = formUser.current
            validateFields().then(async(values) => {
                const {username, password, phone} = values
                const reqPhone = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
                const reqUsername = /^[\u4e00-\u9fa50-9_a-zA-Z]{1,10}$/
                const reqPassword = /^[0-9_a-zA-Z]{6,16}$/
                if(reqUsername.test(username)){
                    if(reqPassword.test(password)){
                        if(reqPhone.test(phone)){
                            resetFields()
                            const result = await reqAddOrUpdateUser(values)
  
                            if(result.status && result.status === 0){
                                props.setForm(result.data)
                                message.success(`${values.password? "添加" : "更新"}用户成功`)
                            }
                        }else{
                            message.error("手机号格式不正确")
                        }
                    }else{
                        console.log("password",reqPassword.test(password));
                        message.error("密码格式不正确")
                    }
                }else{
                    message.error("用户名格式不正确")
                }
                resetFields()
            })
        },
        reset: () => {
            formUser.current.resetFields()
        }
    }));

    // 表单提交事件
    const onFinish = (value) => {
        console.log("user-form.jsx onFinish(): ",value);
    };
    return (
        <Form
            ref={formUser}
            onFinish={onFinish}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
        >
            <Item
                name="username"
                label="用户名"
                rules={[
                    {
                        require: true,
                        message: "用户名不能为空",
                    },
                ]}
                initialValue={currentUser.username}
            >
                <Input placeholder="请输入用户名" />
            </Item>
            {currentUser._id ? null : (
                <Item
                name="password"
                label="密码"
                rules={[
                    {
                        require: true,
                        message: "密码不能为空",
                    },
                ]}
                
            >
                <Input placeholder="请输入密码" type="password" />
            </Item>
            )}
            <Item
                name="phone"
                label="手机号"
                rules={[
                    {
                        require: true,
                        message: "手机号不能为空",
                    },
                ]}
                initialValue={currentUser.phone}
            >
                <Input placeholder="请输入手机号" />
            </Item>
            <Item
                name="email"
                label="邮箱"
                initialValue={currentUser.email}
            >
                <Input placeholder="请输入邮箱" />
            </Item>
            <Item name="role_id" label="角色" initialValue={currentUser} >
                <Select>
                    {roles.map((item) => {
                        return (
                            <Option value={item._id} key={item._id}> 
                                {item.name}
                            </Option>
                        );
                    })}
                    <Option value="0">暂未分配角色</Option>
                </Select>
            </Item>
        </Form>
    );
});

UserForm.propTypes = {
    setForm: PropTypes.func,
    roles: PropTypes.array,
};

export default UserForm;
