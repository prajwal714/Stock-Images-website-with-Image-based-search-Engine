import React, { Component } from "react";
import { Modal } from "antd";
import Navbar from "./navbar";
import Carousel from "./carousel";
import axios from "axios";
import "antd/dist/antd.css";
import "./CSS/navbar.css";
import ImageGallery from "./imageGallery";
import PageFooter from "./page_footer";
import AddImage from "./addImage";



  
const LandingPage = (props) => {
  const {modalVisibility,handleCancel}=props;


  return ( 
    <div>

      <Modal
        centered
        title="Add New Image"
        width="60%"
        visible={modalVisibility}
        onCancel={handleCancel}
      >
        <AddImage></AddImage>
      </Modal>
    </div>
   );
}
 
export default LandingPage;
  
  
    
  
