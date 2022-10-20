import React from 'react'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import memoryUtils from '../../utils/memoryUtils'

const {Footer, Sider, Content } = Layout;

export default function Admin() {

  return (
    <Layout style={{minHeight:'100%'}}>
    <Sider>
      <LeftNav></LeftNav>
    </Sider>
    <Layout>
      <Header>Header</Header>
      <Content style={{"padding": "5px", "backgroundColor": "#ddd"}}>
        <Outlet/>
      </Content>
      <Footer style={{textAlign: 'center', color:'#ccc'}}>Footer</Footer>
    </Layout>
  </Layout>
  )
}

