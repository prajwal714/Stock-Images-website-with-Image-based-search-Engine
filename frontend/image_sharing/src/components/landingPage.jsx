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

const Data = {
  CarouselImages: [
    {
      downloadUrl:
        "https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    {
      downloadUrl:
        "https://images.unsplash.com/photo-1533230050368-fbf55584f7d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    {
      downloadUrl: "https://wallpapercave.com/wp/wp2822939.jpg"
    },
    {
      downloadUrl: "https://wallpaperbro.com/img/144488.jpg"
    }
  ],
  galleryImages: [
    {
      id: 1,
      title: "Mountian View",
      tags: ["nature", "morning", "mountains"],
      location: "Darjeeling",
      imageUrl:
        "https://media2.trover.com/T/58989d99761f9f521b0189a2/fixedw_large_4x.jpg"
    },
    {
      id: 2,
      title: "Forest View",
      tags: ["nature", "forest", "trees"],
      location: "Sundarban",
      imageUrl:
        "https://www.forest-trends.org/wp-content/uploads/2017/04/acadia_np_622419-High-Res.jpg"
    },
    {
      id: 3,
      title: "Lake Side view",
      tags: ["nature", "water", "lake"],
      location: "kolkata",
      imageUrl:
        "https://dayhikesneardenver.com/wp-content/uploads/2017/09/lost-lake-near-nederland-cc-bfagan-831x530.jpg"
    },
    {
      id: 4,
      title: "Tiger Action",
      tags: ["wildlife", "tiger", "forest"],
      location: "Jim Corbet",
      imageUrl:
        "https://www.rd.com/wp-content/uploads/2019/07/Close-up-profile-portrait-of-one-Indochinese-tiger-yawning-or-roaring-mouth-wide-open-and-showing-teeth-low-angle-view.jpg"
    },
    {
      id: 5,
      title: "Street Food",
      tags: ["food", "street", "city"],
      location: "varanasi",
      imageUrl:
        "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/05/shutterstock_540536074-1200x900.jpg"
    }
  ]
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselImages: [],
      galleryImages: []
    };
  }
  state = {
    modalVisibility: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/images/")
      .then(images => {
        this.setState({ galleryImages: images.data });
      })
      .catch(err => console.log(err));

  }
  componentDidUpdate() {
    axios
      .get("http://localhost:3001/api/images/")
      .then(images => {
        this.setState({ galleryImages: images.data });
      })
      .catch(err => console.log(err));
    }
    
  handleImageModal = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  handleCancel = () => {
    this.setState({ modalVisibility: false });
  };

  fetchImages = () => {};
  render() {
      
    return (
      <div>
        <Navbar handleImageModal={this.handleImageModal}></Navbar>
        <Carousel images={Data.CarouselImages}></Carousel>
        <ImageGallery images={this.state.galleryImages}></ImageGallery>
        <PageFooter></PageFooter>
        {/* <Footer></Footer> */}
        <Modal
          centered
          title="Add New Image"
          width="60%"
          visible={this.state.modalVisibility}
          onCancel={this.handleCancel}
        >
          <AddImage></AddImage>
        </Modal>
      </div>
    );
  }
}

export default LandingPage;
