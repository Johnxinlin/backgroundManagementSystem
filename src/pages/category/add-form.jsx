import React from 'react'
import { Form, Select, Input } from 'antd';

const {Item} = Form
const { Option } = Select
export default function AddForm(props) {
  return (
    <Form onFinish={(values) => {props.onFinish(values)}}>
        <p>类别：</p>
        <Item>
            <Select defaultValue="0">
                <Option value='0'>家电</Option>
                <Option value='1'>电脑</Option>
                <Option value='2'>图书</Option>
            </Select>
        </Item>
        <p>名称：</p>
        <Item >
            <Input placeholder='请输入类别名称'/>
        </Item>
    </Form>
  );
}
