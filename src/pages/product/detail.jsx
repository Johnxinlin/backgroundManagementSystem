import React, {useEffect, useState} from 'react'
import { Card, List } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from "../../components/link-button"
import { useNavigate, useLocation } from 'react-router-dom'
import { reqCategoryName } from '../../api'

const Item = List.Item
export default function ProductDetail() {
  const [cName, setCName] = useState("xxx")
  const navigate = useNavigate()
  const {state:{product}} = useLocation()
  // console.log(product);
  useEffect(() => {
    getCName()
  }, [])

  const getCName = async() => {
    const {categoryId, pCategoryId} = product
    if(pCategoryId === '0'){
      const result = await reqCategoryName(categoryId)
      console.log(result);
      setCName(result.data.name)
    }else{
      // 通过多个await方式发多个请求：后面一个请求是在前一个请求成功返回之后才发送， 效率不佳
      // const result1 = await reqCategoryName(pCategoryId) // 获取一级分类列表
      // const result2 = await reqCategoryName(categoryId) // 获取二级分类列表
      // setCName(result1.data.name, result2.data.name)

        // 一次性发多个请求
      const results = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      setCName(cName1, cName2)
    }
  }
  const title = (
    <span>
      {/* 左箭头 */}
      <LinkButton onClick={() => {navigate(-1)}}>
        <ArrowLeftOutlined style={{fontSize: "20px", marginRight: "15px", color: "green"}}/>
      </LinkButton>
      
      <span>商品详情</span>
    </span>
  )
  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="left">商品名称:</span>
          <span className='right'>{product.name}</span>
        </Item>
        <Item>
          <span className="left">商品描述：</span>
          <span className='right'>{product.desc}</span>
        </Item>
        <Item>
          <span className="left">商品价格：</span>
          <span className='right'>{product.price}</span>
        </Item>
        <Item>
          <span className="left">所属分类：</span>
          <span className='right'> {cName}</span>
        </Item>
        <Item>
          <span className="left">商品图片：</span>
          <span className='right'>
            {product.imgs.map((value)=>{
              <img key={value} src={value} alt="商品图片" className='product-img'/>
            })}
            <img  src="" alt="商品图片" className='product-img'/>
            
            {/* <img src="" alt="商品图片" className='product-img'/> */}
          </span>
        </Item>
        <Item>
          <span className="left">商品详情</span>
          <span className='right' dangerouslySetInnerHTML={{__html:product.detail}}></span>
        </Item>
      </List>
    </Card>
    
  )
}
