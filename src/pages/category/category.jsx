import React, { useEffect, useRef, useState } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys, addCategorys, updateCategorys } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default function Category() {
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Action",
            key: "action",
            render: (text) => {
                // console.log(text);
                return (
                    <span>
                        <LinkButton
                            onClick={() => {
                                setModalStatus(1);
                                setCategoryName(text.name || "")
                                showModal();
                            }}
                        >
                            修改分类
                        </LinkButton>
                        {parentId === "0" ? (
                            <LinkButton
                                onClick={() => {
                                    showSubCategorys(text);
                                }}
                            >
                                查看子分类
                            </LinkButton>
                        ) : null}
                    </span>
                );
            },
            width: "30%",
        },
    ];

    const data = [
        {
            key: "1",
            parentId: "0",
            name: "John Brown",
            _id: "1321",
        },
        {
            key: "2",
            name: "Jim Green",
            parentId: "0",
            _id: "1421",
        },
        {
            key: "3",
            name: "Joe Black",
            parentId: "0",
            _id: "1331",
        },
    ]; 

    const subData = [
        {
            parentId: "1321",
            _id: "5c2ed65df352726338607049",
            name: "分类3333",
            __v: 0,
            key: 1,
        },
        {
            parentId: "1321",
            _id: "5c2ed66ff35272633860704a",
            name: "分类34",
            __v: 0,
            key: 2,
        },
        {
            parentId: "1321",
            _id: "5c2ed66ff35272233860704a",
            name: "分类14",
            key: 3,
            __v: 0,
        },
    ];

    const addform = useRef()
    const updateform = useRef()
    const [category, setCategory] = useState(data); // 一级分类列表数据
    const [subCategory, setSubCategory] = useState(""); // 二级分类列表数据
    const [loading, setLoading] = useState(false); // 加载界面
    const [parentId, setParentId] = useState("0"); // 父类id
    const [categoryName, setCategoryName] = useState(""); // 当前类别名
    const [isModalOpen, setIsModalOpen] = useState(false); // 模态对话框状态
    const [modalStatus, setModalStatus] = useState(0); // 0 表示添加分类 1 表示更新分类
    const title =
        parentId === "0" ? (
            "一级分类列表"
        ) : (
            <span>
                <LinkButton
                    onClick={() => {
                        setParentId("0");
                    }}
                >
                    一级分类列表
                </LinkButton>
                <ArrowRightOutlined />
                <span>二级分类列表</span> {/**等配置好接口时再显示子分类名字 */}
            </span>
        );

    useEffect(() => {
        getCategory();
    });

    // 获取一级分类列表数据
    const getCategory = async () => {
        try {
            // 请求列表数据
            const result = await reqCategorys(parentId);
            if (result.status === 0) {
                setLoading(false); // 取消显示加载界面
                if (parentId === "0") {
                    setCategory(result.data); // 设置表格数据
                } else {
                    setSubCategory(result.data);
                }
            } else {
                message.warn("请求分类失败");
                setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 展示二级列表
    const showSubCategorys = (category) => {
        setParentId(category._id);
        getCategory(parentId);
        // setSubCategory(subData)
    };

    // 展示模态对话框
    const showModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            if(!modalStatus){
                addform.current.reset() 
            }else{
                updateform.current.reset()
            }
        }, 100)
    };

    // 获取更新后的类名（通过子组件传递上来）
    const setCategoryNameUpdateForm = (name) => {
        setCategoryName(name)
    }

    // 获取更新后的类名（通过子组件传递上来）
    const setCategoryNameAddForm = (name, id) => {
        setCategoryName(name)
        setParentId(id)
    }


    // 关闭模态对话框并请求数据
    const handleOk = async() => {
        setIsModalOpen(false);

        if( modalStatus === 0){// 进行添加操作
            const result = await addCategorys(categoryName, parentId)
            if(result.status && result.status === 0){
                message.success("添加品类成功")
            }
        }else{// 进行更新操作
            // console.log(categoryName);
            const result = await updateCategorys(categoryName, category._id)
            if(result.status && result.status === 0){
                message.success("更新成功")
            }
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        // 更新表单字段
        if(!modalStatus){
            addform.current.reset() 
        }else{
            updateform.current.reset()
        }
        
    };

    return (
        <div>
            <Card
                title={title}
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            // 展示添加对话框
                            setModalStatus(0);
                            showModal();
                        }}
                    >
                        <PlusOutlined />
                    </Button>
                }
                style={{
                    width: "100%",
                }}
            >
                <Modal
                    title={!modalStatus ? "增加分类" : "更新分类"}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{htmlType: "submit"}}
                >
                    {!modalStatus ? 
                    <AddForm categorys={category} parentId={parentId} setCategoryAddForm={setCategoryNameAddForm} ref={addform}/>
                    : <UpdateForm categoryName={categoryName} setCategoryNameUpdateForm = {setCategoryNameUpdateForm} ref={updateform}/>}
                </Modal>
                <Table
                    dataSource={parentId === "0" ? category : subCategory}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        defaultCurrent: 1,
                        defaultPageSize: 5,
                        showQuickJumper: true, // 暂时改为true用于调试，届时需调整回来
                    }}
                />
                ;
            </Card>
        </div>
    );
}
