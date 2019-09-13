import React, { Component } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Row,
  Col,
  Button,
  Modal
} from "antd";
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
class ImageGallery extends Component {
  state = {
    hover: false,
    modalVisibility: false
  };
  constructor(props) {
    super(props);
  }

  onImageClick = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisibility: false
    });
  };
  render() {
    const { images } = this.props;
    return (
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Row>
                {this.props.images.map(image => {
                  return (
                    <Col key={image.id} span={6}>
                      <div
                        className="image"
                        key={image.id}
                        style={{
                          padding: 10,
                          margin: 5,
                          border: "1px solid rgba(0,0,0,0.16)"
                        }}
                      >
                        <img
                          src={image.imageUrl}
                          alt=""
                          style={{
                            height: "50%",
                            width: "100%",
                            alignContent: "center"
                          }}
                        />
                        <p>
                          <h3>{image.title}</h3>
                          <p>{image.location}</p>
                        </p>
                        <Icon
                          type="heart"
                          theme="filled"
                          style={{ float: "left", marginLeft: "10%" }}
                        />
                        <Button
                          onClick={this.onImageClick}
                          type="danger"
                          size="small"
                        >
                          More Info
                        </Button>
                        <Button
                          style={{ float: "right" }}
                          type="primary"
                          shape="round"
                          icon="download"
                          size="small"
                        />
                        <Modal
                        centered
                          
                          title="Basic Modal"
                          visible={this.state.modalVisibility}
                          onCancel={this.handleCancel}
                          footer={[
                            
                            <Button
                              key="ok"
                              type="primary"
                              size="large"
                              onClick={() => this.onImageClick()}
                            >
                              Ok
                            </Button>
                          ]}
                        >
                        <img
                          src={image.imageUrl}
                          alt=""
                          style={{
                            height: "50%",
                            width: "100%",
                            alignContent: "center"
                          }}
                        />
                        </Modal>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Content>
          </Layout>
        </Content>
        <style>
          {`
               .image:hover{
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
               }
               `}
        </style>
      </Layout>
    );
  }
}

export default ImageGallery;
