import { Form, Select, Button, Upload, Icon } from "antd";
import { Tag, Input, Tooltip } from "antd";

import React, { Component } from "react";
const { Option } = Select;
const API_KEY ="00554df841258b6af7b7228ea673c99f";
// const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image:null,
      imageUrl: null,
      location: null,
      title: null,
      tags: [],
      showModal: false,
      inputVisible: false,
      inputValue: ""
    };
  }


    
  handleSubmit = e => {
    e.preventDefault();
    console.log("values:", this.props.form);
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveInputRef = input => (this.input = input);

    setImages = (e) => {
      console.log(e);
    }

  render() {
    // const { getFieldDecorator } = this.props.form;
      const props = {
          name: 'file',
          multiple: true,
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          
          onChange(info) {

              const { status } = info.file;
              if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                  console.log(info);
                  let url=info.file.response.url;
                  console.log(`${info.file.name} file uploaded successfully.`);
                  console.log(info.file.response.url);
                  //this.setImages(url);
                  
                //   this.setState({imageUrl: info.file.response.url})
              } else if (status === 'error') {
                  console.log(`${info.file.name} file upload failed.`);
              }
          },
      };
    let { tags, inputVisible, inputValue } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Title" {...formItemLayout}>
          <Input placeholder="Enter Title for image" />
        </Form.Item>
        <Form.Item label="Location" {...formItemLayout}>
          <Input placeholder="Enter Location..." />
        </Form.Item>
        <Form.Item label="Tags">
          <div>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={index !== 0}
                  onClose={() => this.handleClose(tag)}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: "#fff", borderStyle: "dashed" }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </div>
        </Form.Item>

        <Form.Item label="Drag or Browse the Image">
          {/* {getFieldDecorator("dragger", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })( */}
          <Upload.Dragger {...props}
            onChange={()=>this.setImages}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
          {/* )} */}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);
export default AddImage;
