import { Form, Button, Icon } from "antd";
import { Tag, Input, Tooltip, message } from "antd";
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import * as ml5 from "ml5";
import UploadImage from "./uploadImage";

const warning = msg => {
  message.warning(msg);
};

const success = msg => {
  message.success(msg);
};

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
  }
  state = {
    data: {
      imageUrl: null,
      location: null,
      title: null,
      tags: []
    },
    
    errors: {},
    predictions: [],
    showModal: false,
    inputVisible: false,
    inputValue: ""
  };

  imageSchema = {
    title: Joi.string()
      .required()
      .label("Title"),
    location: Joi.string()
      .required()
      .label("Location"),
    tags: Joi.array()
      .items(Joi.string())
      .min(2)
      .required(),
    imageUrl: Joi.string()
      .required()
      .label("Image URL")
  };

  setPredictions = pred => {
    this.setState({
      predictions: pred
    });
  };

  classifyImage = () => {
    const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
    function modelLoaded() {
      console.log("Model Loaded");
    }
    const image = this.imageRef.current;
    console.log(image);
    console.log("Image: ",image);
    classifier
      .predict(image, 5, (err, res) => {
        return res;
      })
      .then(res => {
        console.log(res);
        this.setPredictions(res);
      })
      .catch(err => console.log(err));
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateInput();
    this.setState({ errors: errors || {} });

    if (errors) {
      console.log(errors);
      warning(errors);
      return;
    }
    console.log("Submitted");
    success("Image Submitted successfully");
    const params = {
      ...this.state.data
    };
    this.classifyImage();
    axios
      .post("http://localhost:3001/api/images/upload", params, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
  };

  handleClose = removedTag => {
    const tags = this.state.data.tags.filter(tag => tag !== removedTag);

    const data = { ...this.state.data };
    data["tags"] = tags;
    this.setState({ data });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = ({ currentTarget: input }) => {
    let key = input.name;
    if (key === "tag") {
      this.setState({ inputValue: input.value });
    } else {
      const state = { ...this.state };
      state.data[input.name] = input.value;

      this.setState({ state });
      // console.log("Current State: ", this.state);
    }
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const data = { ...this.state.data };
    if (inputValue && data.tags.indexOf(inputValue) === -1) {
      data["tags"] = [...data.tags, inputValue];
    }
    // console.log(data.tags);
    this.setState({
      inputVisible: false,
      inputValue: ""
    });

    this.setState({ data });
  };

  saveInputRef = input => (this.input = input);

  handleImageUrl = url => {
    console.log("Image URL: ", url);
    const data = { ...this.state.data };
    data["imageUrl"] = url;
    this.setState({ data });
  };

  validateInput = () => {
    const { data } = this.state;
    console.log(data);
    const { error } = Joi.validate(data, this.imageSchema);

    if (!error) return null;
    const errors = {};

    return error.details[0].message;
  };

  render() {
    let { inputVisible, inputValue } = this.state;
    let { tags, title, location, imageUrl } = this.state.data;
    let { errors } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item name="ltitle" label="Title">
          <Input
            error={errors.title}
            name="title"
            placeholder="Enter Title for image"
            onChange={this.handleInputChange}
          />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input
            error={errors.location}
            name="location"
            placeholder="Enter Location..."
            onChange={this.handleInputChange}
          />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
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
                name="tag"
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={e => this.handleInputChange(e)}
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

        <Form.Item label="Drag or Browse the Image" required>
          <UploadImage handleImageUrl={this.handleImageUrl} imageRef={this.imageRef}></UploadImage>
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

export default AddImage;
