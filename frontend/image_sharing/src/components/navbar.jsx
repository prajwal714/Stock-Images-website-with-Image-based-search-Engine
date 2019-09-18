import { Layout, Menu, Breadcrumb, Icon, Button } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import "./CSS/navbar.css";
import Search from "./search";

const { Header} = Layout;

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
              <Menu.Item>
                <Button type="danger" size="small" onClick={this.props.handleImageModal}>
                  Add Image
                </Button>
              </Menu.Item>
              <Search></Search>
            </Menu>
          </Header>
        </Layout>
      </>
    );
  }
}
export default Navbar;
