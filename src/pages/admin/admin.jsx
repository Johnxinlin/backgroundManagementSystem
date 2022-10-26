import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, message } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import { connect } from "react-redux";

const { Footer, Sider, Content } = Layout;

const Admin = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!props.user || !props.user.id) {
            navigate("../login");
            message.error("您尚未登陆！");
        }
    }, [props.user]);
    return (
        <Layout style={{ minHeight: "100%" }}>
            <Sider>
                <LeftNav></LeftNav>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content style={{ padding: "5px", backgroundColor: "#ddd" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center", color: "#ccc" }}>
                    Footer
                </Footer>
            </Layout>
        </Layout>
    );
};

export default connect((state) => ({ user: state.user }), {})(Admin);
