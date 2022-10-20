import React, { useEffect, useRef } from 'react'
import { Form, Select, Input, Button } from 'antd';
import PropTypes from 'prop-types'

const {Item} = Form
const { Option } = Select
function AddForm(props) {
  const formAdd = useRef()
  const {categorys, parentId} = props

  const onFinish = () => {
    const {getFieldValue, resetFields} = formAdd.current
    console.log(getFieldValue("categoryName"),getFieldValue("parentId"));
    props.setCategoryAddForm(getFieldValue("categoryName"),getFieldValue("parentId"))
    resetFields() // 此处无用，暂时不知如何解决
  }
  return (
    <Form ref={formAdd} onFinish = {onFinish}>
        <p>类别：</p>
        <Item name="parentId" initialValue={parentId}>
            <Select >
                {categorys.map(
                  (item) => {
                    return (<Option key= {item._id} value={item._id}>{item.name}</Option>)
                  }
                )}
                <Option value='0'>家电</Option>
                <Option value='1'>电脑</Option>
                <Option value='2'>图书</Option>
            </Select>
        </Item>
        <p>名称：</p>
        <Item name = "categoryName">
            <Input placeholder='请输入类别名称'/>
        </Item>
        <Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
}

AddForm.propTypes = {
  categorys: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
  setCategoryAddForm: PropTypes.func
}

export default AddForm
