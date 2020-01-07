import React, { Component } from "react";
import { Modal } from "antd";
import Navbar from "./navbar";
import Carousel from "./carousel";
import axios from "axios";
import "antd/dist/antd.css";
import "./CSS/navbar.css";
import ImageGallery from "./imageGallery";
import PageFooter from "./page_footer";
import AddImage from "./addImageForm";



  
const LandingPage = (props) => {
  const {modalVisibility,handleCancel}=props;


  return ( 
    <div>
    <h1>Welcome to landing page</h1>
    </div>
   );
}
 
export default LandingPage;
  
  
    
  
