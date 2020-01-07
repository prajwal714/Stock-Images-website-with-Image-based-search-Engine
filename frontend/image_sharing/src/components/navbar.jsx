import { Layout, Menu, Breadcrumb, Icon, Button } from "antd";
import React, { Component } from "react";
import "antd/dist/antd.css";
import "./CSS/navbar.css";
import Search from "./search";
import {Link} from "react-router-dom";

const { Header} = Layout;
const {SubMenu} =Menu;

class Navbar extends Component {
  state = {
    defaultKey: "1"
  };
  render() {
    return (
      <>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={this.state.defaultKey}
              style={{ lineHeight: "64px", float: "left" }}
            >
              <Menu.Item key="1">
                <Link to="/all">Gallery</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Search></Search>
            </Menu>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={this.state.defaultKey}
              style={{ lineHeight: "64px", float: "right" }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>Options</span>
                  </span>
                }
              >
                <Menu.Item key="1">
                  <Link to="/wildlife">Wildlife</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/nature">Nature</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/street">Street</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/other">Other</Link>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    type="danger"
                    size="small"
                    onClick={this.props.handleImageModal}
                  >
                    Add Image
                  </Button>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="5"><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/signup">SignUp</Link></Menu.Item>

            </Menu>
          </Header>
        </Layout>
      </>
    );
  }
}
export default Navbar;
