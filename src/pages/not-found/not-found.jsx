import React from 'react'
import { Col, Row, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import "./not-found.less"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Row className='not-found'>
        <Col span={12} className="left"></Col>
        <Col span={12} className="right">
            <h1>404</h1>
            <h2>奇怪了，没有该界面啊</h2>
            <div>
                <Button type="primary" onClick={() => {
                    navigate('admin')
                }}>
                    点我返回首页
                </Button>
            </div>
        </Col>
    </Row>
  )
}
