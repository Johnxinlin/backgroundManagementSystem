import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import memoryUtils from '../../utils/memoryUtils'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const {Footer, Sider, Content } = Layout;

export default function Admin() {

  return (
    <Layout style={{height:'100%'}}>
    <Sider>
      <LeftNav></LeftNav>
    </Sider>
    <Layout>
      <Header>Header</Header>
      <Content>
        <Routes>
          <Route path='/admin/home' element={<Home/>}></Route>
          <Route path='/category' element={<Category/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/role' element={<Role/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/charts/bar' element={<Bar/>}></Route>
          <Route path='/charts/line' element={<Line/>}></Route>
          <Route path='/charts/pie' element={<Pie/>}></Route>
          <Route path='/' element={<Navigate to="/home"/>}></Route>
        </Routes>
      </Content>
      <Footer style={{textAlign: 'center', color:'#ccc'}}>Footer</Footer>
    </Layout>
  </Layout>
  )
}

