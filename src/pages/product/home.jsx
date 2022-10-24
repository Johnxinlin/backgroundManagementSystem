import React, {useState} from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined} from "@ant-design/icons";
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
const Option = Select.Option

export default function ProductHome() {
    
    const navigate = useNavigate()
    const [searchName, setSearchName] = useState("")
    const [searchType, setSearchType] = useState("productName")
    
    const dataSource = [
        {
            "status": 1,
            "imgs": [
                "image-1559402396338.jpg"
            ],
            "_id": "5ca9e05db49ef916541160cd",
            "name": "联想ThinkPad 翼4809",
            "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
            "price": 65999,
            "pCategoryId": "5ca9d6c0b49ef916541160bb",
            "categoryId": "5ca9db9fb49ef916541160cc",
            "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
            "__v": 0
        },
        {
            "status": 1,
            "imgs": [
                "image-1559402448049.jpg",
                "image-1559402450480.jpg"
            ],
            "_id": "5ca9e414b49ef916541160ce",
            "name": "华硕(ASUS) 飞行堡垒",
            "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
            "price": 6799,
            "pCategoryId": "5ca9d6c0b49ef916541160bb",
            "categoryId": "5ca9db8ab49ef916541160cb",
            "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
            "__v": 0
        },
      ];
      const [product, setProduct] = useState(dataSource)
      const [total, setTotal] = useState(10)
      const [pageNum, setPageNum] = useState(1)
      const columns = [
        {
          title: '商品名',
          dataIndex: 'name',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => 
            "¥" + price
        },
        {
          width: "100px",
          title: '状态',
          //dataIndex: 'status',
          render: (product) => {
            return (product.status === 1 ? 
                <span>
                    <Button 
                        type='primary' 
                        onClick={() => { 
                            updateStatus(product._id, product.status)
                        }}
                        >下架</Button><br/>
                    <span>在售</span>
                </span> :
                <span>
                <Button type='primary'>上架</Button><br/>
                <span>售空</span>
            </span>

            )
          }
        },
        {
            title: '操作',
            width: "100px",
            render: (product) => 
              (
                <span>
                    <LinkButton
                    onClick = {() => { navigate('../detail', {state:{product: product}})}}
                    >详情</LinkButton>
                    <LinkButton
                    onClick = {() => { navigate('../add_update', {state:{product, mode:"update"}})}}
                    >修改</LinkButton>
                </span>
              )
          },
      ];

    const title = (
        <span>
            <Select value={searchType} onChange={(value) => {setSearchType(value);}}>
                <Option value="productName"> 按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{width: "150px", margin: '0 15px'}} value={searchName} 
            onChange = {event => {setSearchName(event.target.value)}}
            ></Input>
            <Button type='primary'>搜索</Button>
        </span>
    )

    const extra = (
        <Button type='primary' onClick={
            () => {navigate('../add_update', {state:{product:{}, mode:"add"}})}
        }>
            <PlusOutlined/>
            添加
        </Button>
    )

    // 获取对应页数的商品列表
    const getProducts = async(pageNum) => {
        setPageNum(pageNum)
        let result
        if(searchName){
            result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
        }else{
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        // 取出分页数据，更新状态，显示分页列表
        if(result.status === 0){
            const {total, list} = result.data
            setTotal(total)
            setProduct(list)
        }
    }

    // 更新商品状态
    const updateStatus = async(productId, status) => {
        let result
        if(status === 1){
            result = await reqUpdateStatus(productId, 2)
        }else{
            result = await reqUpdateStatus(productId, 1)
        }
        if(result.status === '0'){
            message.success("更新商品成功");
            getProducts(pageNum)
        }else{
            message.error("更新失败")
        }
    }
  return (
    <Card title={title} extra = {extra}>
        <Table 
        dataSource={product} 
        columns={columns} 
        rowKey="_id"
        pagination = {{
            showQuickJumper: true,
            defaultPageSize: PAGE_SIZE,
            total:{total},
            onChange:getProducts,
        }}
        />;
    </Card>
    
  )
}

