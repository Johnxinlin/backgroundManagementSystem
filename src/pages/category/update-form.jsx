import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd';

const {Item} = Form
function UpdateForm(props) {
  const form = useRef()
  const getValue = () => {
    const {getFieldValue, resetFields} = form.current

    // console.log(getFieldValue("categoryName"));
    props.setCategoryNameForm(getFieldValue("categoryName"))  // 此处通过父组件传递的函数将子组件的值传递回去
  }

  return (
    <Form onFinish={(values) => {props.onFinish(values)}} ref = {form} >

        <p>名称：</p>
        <Item name="categoryName" initialValue={props.categoryName}>
            <Input  placeholder={props.categoryName}  onChange={getValue}/>
        </Item>
        {/* <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item> */}
    </Form>
  );
}

UpdateForm.propTypes = {
  categoryName: PropTypes.string,
  setCategoryNameUpdateForm: PropTypes.func,
}

export default UpdateForm;