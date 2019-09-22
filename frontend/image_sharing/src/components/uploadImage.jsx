import React, { Component } from "react";
import { Icon, Card } from "antd";
import { Progress } from 'antd';
import axios from "axios";
import {storage} from '../firebase-config';
import DefaultImg from '../assets/default-image.jpg';
class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      percent: 0,
      uploading: true,
      selectedFile: null,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      imageName: "default",
      firebaseImage:DefaultImg
    };
  }

  setDefaultImage(uploadType) {
    if (uploadType === "firebase") {
      this.setState({
        firebaseImage: DefaultImg
      });
    }
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async file => {
    
  

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  uploadImage=(e)=>{

    const {handleImageUrl}=this.props;
    this.setState({error: null});
    const Type=['image/jpeg','image/png','image/jpg'];
    if(Type.every((type)=>type!==e.target.files[0].type))
    {
      console.log("error");
      this.setState({error: "File Type not supported"});
      return;
    }


    let currentImageName = "firebase-image-" + Date.now();
    let uploadImage = storage.ref(`images/${currentImageName}`).put(e.target.files[0]);

    uploadImage.on(
      "state_changed",
      snapshot => {
        let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        progress=Math.round(progress);
        this.setState({percent: progress});
      },
      err => {
        alert(err);
        
      },
      () => {
        storage
          .ref("images")
          .child(currentImageName)
          .getDownloadURL()
          .then(url => {
            this.setState({
              uploading: false,
              firebaseImage: url,
              imageName: currentImageName
            });
            handleImageUrl(url);
          });
          // console.log(uploadImage.snapshot.downloadURL);
      }
    );
    
  };

  


  render() {
    const { previewImage, previewVisible, fileList } = this.state;
    
    const uploadButton = (
      <div>
        <Icon type="plus"></Icon>
        <div className="ant-upload-next">Upload</div>
      </div>
    );
    return (
      <div>
        <input type="file" name="imageUrl"  onChange={(e)=>this.uploadImage(e)} />
        {!this.state.error? 
        <>
        <Progress type="circle" percent={this.state.percent} width={80} />
        <img src={this.state.firebaseImage} alt="upload-img" style={{width: 200, height: "auto"}}/>
        </>
        :
       <div>{this.state.error}</div>
        
        
        }
       
      </div>
    );
  }
}

export default UploadImage;
