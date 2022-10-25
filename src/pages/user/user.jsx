import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import formateDate from "../../utils/formatDate";
import LinkButton from "../../components/link-button";
import { reqDeleteUser, reqUsersList } from "../../api";
import UserForm from "./user-form";

const confirm = Modal.confirm;

export default function User() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStatu, setModalStatu] = useState(0); // 0 添加用户， 1 更新用户
    const [users, setUsers] = useState([
        {
            _id: "5cb05b4db6ed8c44f42c9af2",
            username: "test",
            password: "202cb962ac59075b964b07152d234b70",
            phone: "123412342134",
            email: "sd",
            role_id: "5ca9eab0b49ef916541160d4",
            create_time: 1555061581734,
            __v: 0,
            key: 1,
        },
        {
            _id: "5cb05b69b6ed8c44f42c9af3",
            username: "ss22",
            password: "123",
            phone: "23343",
            email: "df",
            role_id: "5caf5444c61376319cef80a8",
            create_time: 1555061609666,
            __v: 0,
            key: 2,
        },
    ]);
    const [roles, setRoles] = useState([
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
    ]);
    const [roleNames, setRoleNames] = useState({});
    const [user, setUser] = useState({})
    const userForm = useRef();

    useEffect(() => {
        getUser();
        // 生成角色名对象
        setRoleNames(
            users.reduce((pre, item) => {
                pre[item.role_id] = roles.find(
                    (value) => item.role_id === value._id
                )
                    ? roles.find((value) => item.role_id === value._id).name
                    : "暂未分配角色";
                return pre;
            }, {})
        );
    }, [users, roles]);

    // 获取用户列表
    const getUser = async () => {
        const result = await reqUsersList();
        if (result.status && result.status === 0) {
            const { roles, users } = result.data;
            setUsers(users);
            setRoles(roles);
        } else {
            message.error("请求状态有误", result.status);
        }
    };

    

    // 执行ok按钮点击事件
    const handleOk = () => {
        setIsModalOpen(false);
        userForm.current.validate();
    };

    // 执行cancel按钮点击事件
    const handleCancel = () => {
        userForm.current.reset()
        setIsModalOpen(false);
        setUser({})
        
    };

    // 打开模态对话框
    const showModal = () => {
        setIsModalOpen(true);
        // 此处若想更新模态对话框字段，必须进行延时，否则resetFields不生效
        // 尚不知原因
        // 同时第一次调用时没有userForm.current尚未得到值，接下来的调用才可。
        try{
            
            setTimeout(() => {
                console.log("user.jsx showModal(): ",userForm.current);
                userForm.current.reset()
            }, 100)
            
        }catch(info){
            console.log(info);
        }
    };

    // 请求删除用户事件
    const deleteUser = async (userId) => {
        const result = await reqDeleteUser(userId);
        if (result.status && result.status === 0) {
            message.success("删除用户成功");
        } else {
            message.error("出错了o(╥﹏╥)o");
        }
    };

    // 获取userForm表单数据并处理
    const handleUserForm = (user) => {
        setUsers([...users, user]);
    };

    const title = (
        <Button
            type="primary"
            onClick={() => {
                setModalStatu(0)
                showModal();
            }}
        >
            创建用户
        </Button>
    );
    const columns = [
        {
            title: "用户名",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "电话",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "注册时间",
            dataIndex: "create_time",
            key: "create_time",
            render: formateDate,
        },
        {
            title: "所属角色",
            dataIndex: "role_id", // 根据id找到对应角色名
            key: "role_id",
            render: (role_id) => roleNames[role_id],
        },
        {
            title: "操作",
            key: "operation",
            render: (user) => (
                <span>
                    <LinkButton
                        onClick={() => {
                            
                            setModalStatu(1);
                            setUser(user)
                            showModal()
                            // userForm.current.reset() 
                        }}
                    >
                        修改
                    </LinkButton>
                    <LinkButton
                        onClick={() => {
                            confirm({
                                title: (
                                    <span
                                        style={{ color: "grey" }}
                                    >{`你确定要删除用户 ${user.username}吗?`}</span>
                                ),
                                icon: <ExclamationCircleOutlined />,
                                content: "删除后数据将无法找回！！",
                                onOk() {
                                    console.log("OK");
                                    deleteUser(user._id);
                                },
                                onCancel() {
                                    console.log("Cancel");
                                },
                            });
                        }}
                    >
                        删除
                    </LinkButton>
                </span>
            ),
        },
    ];
    return (
        <Card
            title={title}
            style={{
                width: "100%",
            }}
        >
            <Modal
                title={!modalStatu ? "添加用户" : "更新用户"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ htmlType: "submit" }}
            >
                <UserForm
                    roles={roles}
                    ref={userForm}
                    setForm={handleUserForm}
                    user={user}
                />
            </Modal>
            <Table
                bordered
                dataSource={users}
                columns={columns}
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 5,
                    showQuickJumper: true, // 暂时改为true用于调试，届时需调整回来
                }}
            />
            ;
        </Card>
    );
}
