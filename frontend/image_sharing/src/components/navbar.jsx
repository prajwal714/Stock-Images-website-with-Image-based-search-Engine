import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Carousel from './carousel';
import React, { Component } from "react";
import "antd/dist/antd.css";
import "./CSS/navbar.css";
import Search from "./search";
import ImageGallery from "./imageGallery";
import PageFooter from "./page_footer";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Navbar extends Component {
  state = {};
  render() {
    return (
      <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px", float: "left" }}
          >
            <Menu.Item key="1">Nature</Menu.Item>
            <Menu.Item key="2">Wildlife</Menu.Item>
            <Menu.Item key="3">Street</Menu.Item>
            <Menu.Item key="4">Other</Menu.Item>
            <Search></Search>
          </Menu>
        </Header>
        </Layout>
       
      </>
    );
  }
}
export default Navbar;
