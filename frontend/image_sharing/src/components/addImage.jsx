import { Form, Select, Button, Upload, Icon } from "antd";
import { Tag, Input, Tooltip } from "antd";
import React, { Component } from "react";

import Accept from "./dropzone";
import UploadImage from './uploadImage';

const { Option } = Select;
const API_KEY ="00554df841258b6af7b7228ea673c99f";
// const WrappedDemo = Form.create({ name: 'validate_other' })(Demo);


const {Dragger}=Upload;
class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image:[],
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
    };

  render() {
     
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
          <UploadImage></UploadImage>
         
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
