import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Input, Cascader, Upload, Button, InputNumber, message } from "antd";
import LinkButton from "../../components/link-button";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqAddOrUpdateProduct, reqCategorys } from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import PictruesWall from "./picturesWall";
import RichTextEdit from "./rich-text-edit"
const Item = Form.Item;

const optionLists = [
    {
        value: "zhejiang",
        label: "Zhejiang",
        isLeaf: false,
    },
    {
        value: "jiangsu",
        label: "Jiangsu",
        isLeaf: false,
    },
    {
        value: "jiangsu2",
        label: "Jiangsu2",
        isLeaf: true,
    },
];

export default function ProductAddUpdate() {
    const img = useRef();
    const editor = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [options, setOptions] = useState(optionLists);
    const { product, mode } = location.state;
    const categoryId = [];

    useEffect(() => {
        getOptions("0");
    }, []);
    const title = (
        <span>
            <LinkButton
                onClick={() => {
                    navigate(-1);
                }}
            >
                <ArrowLeftOutlined style={{ fontSize: "20px" }} />
            </LinkButton>
            <span>{mode === "update" ? "修改商品" : "添加商品"}</span>
        </span>
    );

    // cascader配置项
    const loadData = async (selectedOptions) => {
        // 得到选择的option对象
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示Loading
        targetOption.loading = true;
        // 根据选中的分类，请求获取二级分类列表
        const subTargetOption = await getOptions(targetOption.value);
        if (subTargetOption && subTargetOption.length > 0) {
            // 生成一个二级列表的options
            const childrenOptions = subTargetOption.map((item) => ({
                label: item.name,
                value: item._id,
                isLeaf: true,
            }));
            setTimeout(() => {
                targetOption.loading = false;
                targetOption.children = childrenOptions;
                // targetOption.children = [
                //     {
                //         label: `${targetOption.label} Dynamic 1`,
                //         value: "dynamic1",
                //     },
                //     {
                //         label: `${targetOption.label} Dynamic 2`,
                //         value: "dynamic2",
                //     },
                // ];
                setOptions([...options]);
                // setOptions(options);
            }, 1000);
        } else {
            // 当前选中的分类没有二级分类
            targetOption.isLeaf = true;
        }
        // load options lazily
    };

    const getOptions = async (parentId) => {
        const result = await reqCategorys(parentId);
        if (result.status === 0) {
            if (parentId === "0") {
                initOption(result.data);
            } else {
                return result.data;
            }
        } else {
            console.log("获取商品列表失败");
        }
    };

    const initOption = async (category) => {
        const newOption = category.map((item) => ({
            label: item.name,
            value: item._id,
            isLeaf: false,
        }));
        categoryId.push(category._id);
        setOptions(newOption);
        // 如果为修改界面且为二级分类
        if (mode === "update" && category.parentId !== "0") {
            const subCategorys = await getOptions(category._id);
            const childrenOptions = subCategorys.map((item) => ({
                value: item._id,
                label: item.name,
                isLeaf: true,
            }));

            const targetOption = options.find(
                (option) => option.value === category._id
            );
            targetOption.children = childrenOptions;
            categoryId.push(category.parentId, category._id);
            setOptions(targetOption);
        }
    };

    const onFinish = async(value) => {
        // 收集数据，并封装成product对象
        const {productName, productDesc, productPrice, productCategory} = value
        let pCategoryId, categoryId;
        if(productCategory.length === 1){
            pCategoryId = '0'
            categoryId = productCategory[0]
        }else{
            pCategoryId = productCategory[0]
            categoryId = productCategory[1]
        }
        const imgs = img.current.getImgs()
        const detail = editor.current.getDetail()

        const new_product = {
            name: productName,
            desc: productDesc,
            price: productPrice,
            imgs,
            detail,
            pCategoryId,
            categoryId
        }

        if(mode === 'update'){
            new_product._id = product._id
        }

        console.log(new_product);

        // 调用接口请求函数去添加或更新商品
        const result = await reqAddOrUpdateProduct(new_product)

        // 根据响应提示
        if(result.status === 0){
            message.success(`${mode === 'update' ? '更新': '添加'}商品成功`)
            navigate('../product')
        }else{
            message.error(`${mode === 'update' ? '更新': '添加'}商品失败`)
        }

    }

    return (
        <Card title={title}>
            <Form
                onFinish={onFinish}
            >
                <Item
                    label="商品名称"
                    name="productName"
                    style={{ width: "45%", color: "green" }}
                    rules={[
                        {
                            required: true,
                            message: "商品名称不能为空",
                        },
                    ]}
                    initialValue={mode === "update" ? product.name : ""}
                >
                    <Input placeholder="请输入商品名称"></Input>
                </Item>
                <Item
                    label="商品描述"
                    name="productDesc"
                    style={{ width: "55%", color: "green" }}
                    rules={[
                        {
                            required: true,
                            message: "商品描述不能为空!",
                        },
                    ]}
                    initialValue={mode === "update" ? product.desc : ""}
                >
                    <Input.TextArea allowClear placeholder="请输入商品描述" />
                </Item>
                <Item
                    label="商品价格"
                    name="productPrice"
                    style={{ width: "200px", color: "green" }}
                    rules={[
                        {
                            required: true,
                            message: "商品价格不能为空!",
                        },
                        {
                            type: "number",
                            min: 0,
                            max: 5000000,
                        },
                    ]}
                    initialValue={mode === "update" ? product.price : ""}
                >
                    <InputNumber
                        prefix="￥"
                        placeholder="价格"
                        addonAfter="元"
                    />
                </Item>

                <Item
                    label="商品分类"
                    name="productCategory"
                    style={{ width: "45%", color: "green" }}
                    initialValue={mode === "update" ? categoryId : []}
                    rules={[
                        {
                            required: true,
                            message: "商品分类不能为空!",
                        },
                    ]}
                >
                    <Cascader options={options} loadData={loadData} />
                </Item>
                <Item
                    label="商品图片"
                    name="productImg"
                    style={{ width: "45%", color: "green" }}
                >
                    <div>
                        <PictruesWall ref={img} imgs = {product.imgs}></PictruesWall>
                    </div>
                </Item>
                <Item
                    label="商品详情"
                    name="productDetail"
                    style={{color: "green" }}
                    initialValue={mode === "update" ? product.detail : ""}
                    labelCol={{span: 2}} 
                    wrapperCol={{span: 20}}
                    
                >
                    <RichTextEdit ref = {editor} detail={product.detail}/>
                </Item>
                <Item style={{ marginLeft: "20px" }} >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Item>
            </Form>
        </Card>
    );
}
