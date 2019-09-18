import React, { Component } from "react";
import { Icon, Upload, Modal } from "antd";
import axios from 'axios'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class DropImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      console.log(file);
      file.preview = await getBase64(file.originalFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = (event) => {
    let files=event.target.files;
    console.log(event.target.files[0]);
    if(this.maxSelectFiles(event)&&this.checkMimeType(event)){

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }
};

  handleUpload=()=>{
      const data=new FormData();
      data.append('file',this.state.selectedFile);
      axios.post('http://localhost:3001/upload',data,{

      })
      .then(res=>{
          console.log(res.statusText);
      })


  }

  maxSelectFiles=(event)=>{
      let files=event.target.files;
      if(files.length>1)
      {
          const msg="Only 1 image can be uploaded at a time"
          event.target.value=null;
          console.log(msg);
          return false;

      }
      return true;
  }

  checkMimeType=(event)=>{
      let file=event.target.files[0];
      console.log(file);
      let err='';

      const types=['image/png','image/jpeg','image/jpg','image/gif'];
      if(types.every(type=>file.type!==type))
      {
          err+=file.type+" is not supported format \n";
      }
  

  if(err!=='')
  {
    event.target.value=null;
    console.log(err);
    return false;
  }
  return true;
};
    

    //  axios({
    //    method: "post",
    //    url: "http://localhost:3001/api/images/upload",
    //    data: {
    //      image:  getBase64(this.state.fileList[0])
    //    }
    //  })
    //    .then(res => {
    //      console.log("image POST succesfully");
    //      console.log(res);
    //    })
    //    .catch(err => {
    //      console.log(err);
    //    });
  

  render() {
    const { previewImage, previewVisible, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus"></Icon>
        <div className="ant-upload-next">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <input type="file" name="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Submit</button>
      </div>
    );
  }
}

export default DropImage;
