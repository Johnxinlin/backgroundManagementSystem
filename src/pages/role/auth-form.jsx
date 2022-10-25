import React, {
    useRef,
    forwardRef,
    useImperativeHandle,

} from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";

//  静态展示树图
const treeData = [
    {
      title: '平台权限',
      key: '0',
      children: [
        {
            title: '首页',
            key: '/home',
        },
        {
          title: '商品',
          key: '/products',
          children: [
            {
              title: '品类管理',
              key: '/category',
            //   disableCheckbox: true,
            },
            {
              title: '商品管理',
              key: '/product',
            },
          ],
        },
        {
            title: '用户管理',
            key: '/user',
        },
        {
            title: '角色管理',
            key: '/role',
        },
        {
          title: '图形图表',
          key: '/charts',
          children: [
            {
              title: (
                <span
                  style={{
                    color: '#1890ff',
                  }}
                >
                  柱形图
                </span>
              ),
              key: '/charts/bar',
            },
            {
              title: (
                <span
                  style={{
                    color: '#119579',
                  }}
                >
                  折线图
                </span>
              ),
              key: '/charts/line',
            },
            {
              title: (
                <span
                  style={{
                    color: '#da63a0',
                  }}
                >
                  饼图
                </span>
              ),
              key: '/charts/pie',
            },
          ],
        },
      ],
    },
  ];


// //动态展示树图
// const getTreeNode = (menuList) => {
//     return menuList.reduce((pre, item) => {
//         if(!item.children){
//             pre.push({
//                 title:item.title,
//                 key:item.key,
//             })
//         }else{
//             pre.push({
//                 title:item.title,
//                 key:item.key,
//                 children: item.children
//             })
//         }
//         console.log(pre[pre.length-1]);
//         return pre
//     },[])
// }
// const treeData = getTreeNode(menuList)

const { Item } = Form;
const AuthForm = forwardRef((props, ref)  => {
    const treeNodes = useRef();

    console.log("AuthForm()",props.role.name);

    useImperativeHandle(ref, () => ({
        getMenus: () => {
            return treeNodes.current.state.checkedKeys
        },

    }));


    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        console.log("onCheck() :",treeNodes.current);
    };

    return (
        <Form >
            <p>角色名称：</p>
            <Item                
            >
                <Input value={props.role.name} disabled/>
            </Item>
            <Tree
                checkable
                checkedKeys={props.role.menus}
                defaultExpandAll={true}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
                ref={treeNodes}
            />
        </Form>
        
    );
})

AuthForm.propTypes = {
    setForm: PropTypes.func,
    role: PropTypes.object
};

export default AuthForm;
