import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqUpdateRole } from "../../api";
import formateDate from "../../utils/formatDate";
import AddForm from "./add-form";
import AuthForm from "./auth-form"
import { connect } from "react-redux";
import { loginOutAction } from "../../redux/actions";

const Role = (props) => {

    const addForm = useRef();
    const authForm = useRef(); 
    const [roles, setRoles] = useState(
        [
            {
                menus: ["/role", "/charts/bar", "/home", "/category"],
                _id: "5ca9eaa1b49ef916541160d3",
                name: "测试",
                create_time: 1554639521749,
                __v: 0,
                auth_time: 1558679920395,
                auth_name: "test007",
            },
            {
                menus: [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/charts/line",
                    "/category",
                    "/product",
                    "/products",
                ],
                _id: "5ca9eab0b49ef916541160d4",
                name: "经理",
                create_time: 1554639536419,
                __v: 0,
                auth_time: 1558506990798,
                auth_name: "test008",
            },
            {
                menus: ["/home", "/products", "/category", "/product", "/role"],
                _id: "5ca9eac0b49ef916541160d5",
                name: "角色1",
                create_time: 1554639552758,
                __v: 0,
                auth_time: 1557630307021,
                auth_name: "admin",
            },
        ].map((item) => {
            item.create_time = formateDate(item.create_time);
            item.auth_time = formateDate(item.auth_time);
            return item;
        })
    );
    const [role, setRole] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // 模态对话框状态
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // 模态对话框状态

    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            setRoles(result.data);
        } else {
        }
    };

    // 取消，关闭添加对话框
    const handleAddFormCancel = () => {
        setIsAddModalOpen(false);
        addForm.current.reset();
    };
    // 取消，关闭设置权限对话框
    const handleAuthFormCancel = () => {
        setIsAuthModalOpen(false)
    };

    // 展示添加模态对话框
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    // 展示权限模态对话框
    const showAuthModal = () => {
        setIsAuthModalOpen(true)
    };



    // 获取在Add表单更新后的数据（通过子组件传递上来）
    const setAddForm = (role) => {
        setRole(role);
        setRoles([...roles, role]);
    };

    // 获取在Auth表单更新后的数据（通过子组件传递上来）
    const setAuthForm = (role) => {
        setRole(role);
        setRoles([...roles, role]); 
    };

    // 添加角色
    const addRole = async () => {
        addForm.current.validate();
        setIsAddModalOpen(false);
    };

    // 添加权限
    const addAuth = async() => {
        const menus = authForm.current.getMenus()
        const result = await reqUpdateRole(menus)
        if(result.status && result.status=== 0){
            setRole({...role, menus: menus, auth_time: Date.now()})
            message.success("权限更改成功")
            // 如果更改的是当前用户的权限，则强制退出
            if(role._id === props.user.role_id){
                props.loginOut()
                message.success("当前用户权限改变，请重新登陆")
            }
        }else{
            message.error("出错了o(╥﹏╥)o")
            setIsAddModalOpen(false);
        }
        setIsAddModalOpen(false);
    }

    const title = (
        <span>
            <Button type="primary" onClick={showAddModal}>
                创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button type="primary" disabled={!role._id} onClick={showAuthModal}>
                设置角色权限
            </Button>
        </span>
    );

    const onRow = (record) => {
        return {
            onClick: (event) => {
                // 点击行
                // console.log("onRow() ",record);
                setRole(record);
            },
        };
    };
    const columns = [
        {
            title: "角色名称",
            dataIndex: "name",
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
        },
        {
            title: "授权时间",
            dataIndex: "auth_time",
        },
        {
            title: "授权人",
            dataIndex: "auth_name",
        },
    ];

    return (
        <Card title={title}>
            <Table
                onRow={onRow}
                bordered
                dataSource={roles}
                columns={columns}
                rowKey="_id"
                rowSelection={{
                    type: "radio",
                    selectedRowKeys: [role._id],
                    onChange: (selectedRowKeys, selectedRows) => {
                        // console.log("role.jsx -> Table -> onChange",selectedRowKeys, selectedRows);
                        setRole({ ...role, _id: selectedRowKeys[0] });
                    },
                }}
                pagination={{
                    showQuickJumper: true,
                    defaultPageSize: PAGE_SIZE,
                    // total:{total},
                    // onChange:getProducts
                }}
            />
            <Modal
                title={"添加角色"}
                open={isAddModalOpen}
                onOk={addRole}
                onCancel={handleAddFormCancel}
                okButtonProps={{ htmlType: "submit" }}
            >
                {/* {!modalStatus ? 
                    <AddForm setForm={setCategoryNameAddForm}/>
                    : <UpdateForm setCategoryNameUpdateForm = {setCategoryNameUpdateForm}/>} */}
                <AddForm setForm={setAddForm} ref={addForm} />
            </Modal>

            <Modal
                title={"设置角色权限"}
                open={isAuthModalOpen}
                onOk={addAuth}
                onCancel={handleAuthFormCancel}
                okButtonProps={{ htmlType: "submit" }}
            >
                {/* {!modalStatus ? 
                    <AddForm setForm={setCategoryNameAddForm}/>
                    : <UpdateForm setCategoryNameUpdateForm = {setCategoryNameUpdateForm}/>} */}
                <AuthForm setForm={setAuthForm} ref={authForm} role={role}/>
            </Modal>
        </Card>
    );
}

export default connect(
    state => ({user: state.user}),
    {loginOut: loginOutAction}
)(Role)
