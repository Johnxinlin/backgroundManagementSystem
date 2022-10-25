import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import { Form, Input, message } from "antd";
import PropTypes from "prop-types";
import { reqAddRole} from "../../api";


const { Item } = Form;
const AddForm = forwardRef((props, ref) => {
    const formAdd = useRef();

    useImperativeHandle(ref, () => ({
        reset: () => {
            formAdd.current.resetFields();
        },
        validate: () => {
            const { resetFields, validateFields } =
                formAdd.current;
            validateFields()
                .then(async(value) => {
                    const re = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,10}$/;
                    const roleName = value.roleName
                    // console.log("validateField().then before reset",getFieldValue("roleName"));
                    resetFields();
                    // console.log("validateField().then after reset",getFieldValue("roleName"));
                    if (re.test(roleName)) {
                        // reset后无法在getFieldValue中取值
                        // console.log("validateField().then",getFieldValue("roleName"));

                        // 请求添加角色接口
                        const result = await reqAddRole(roleName)
                        if(result.status === 0){
                            message.success("创建角色成功")
                            props.setForm(result.data); // 更新role.jsx路由组件状态
                        }else{
                            message.error("创建角色失败", result)
                        }
                        console.log("validateField().then: ", roleName);
                    } else {
                        message.info("存在非法字符或字数大于10");
                    }
                })
                .catch((errorInfo) => {
                    console.log("validateField().catch", errorInfo);
                    if(!errorInfo.values.roleName){
                        message.error("角色名不能为空")
                    }else{
                        message.error("接口请求异常")
                    }
                });
        },
    }))

    return (
        <Form ref={formAdd}>
            <p>角色名称：</p>
            <Item
                name="roleName"
                rules={[
                    {
                        required: true,
                        message: "角色名不能为空白",
                    },
                ]}
            >
                <Input placeholder="请输入角色名称名称" />
            </Item>

        </Form>
    );
})

AddForm.propTypes = {
    setForm: PropTypes.func,
};

export default AddForm;
