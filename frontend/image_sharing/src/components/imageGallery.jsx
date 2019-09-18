import React, { Component } from "react";
import {
  Layout,
  
  Breadcrumb,
  Icon,
  
  Row,
  Col,
  Button,
  Modal,
  Tag
} from "antd";

const {Content } = Layout;
class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      modalVisibility: false,
      currentImage: this.props.images[0]
    };
  }

  onImageClick = image => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      currentImage: image
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisibility: false
    });
  };
  render() {
    let { currentImage } = this.state;
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
                        onClick={() => this.onImageClick(image)}
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
                          onClick={() => this.onImageClick(image)}
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
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Content>
          </Layout>
          <Modal
            centered
            title={currentImage.title + ", " + currentImage.location}
            width="60%"
            visible={this.state.modalVisibility}
            onCancel={this.handleCancel}
            footer={[
              <Row>
                <Col>
                  <p>
                    {currentImage.tags.map(tag => (
                      <Tag style={{ float: "left" }} color="geekblue">
                        {tag}
                      </Tag>
                    ))}
                  </p>
                </Col>
                <Col>
                  <Button
                    key="ok"
                    size="default"
                    onClick={() => this.handleCancel()}
                  >
                    Back
                  </Button>
                  <Button
                    style={{ float: "right" }}
                    type="primary"
                    shape="round"
                    icon="download"
                    size="default"
                  />
                </Col>
              </Row>
            ]}
          >
            <img
              src={currentImage.imageUrl}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                alignContent: "center",
                cursor: "pointer"
              }}
            />
          </Modal>
        </Content>
        <style>
          {`
          .ant-modal-wrap .ant-modal-centered{
              color: black;
          }
               .image:hover{
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                cursor: pointer;
               }
               `}
        </style>
      </Layout>
    );
  }
}

export default ImageGallery;
