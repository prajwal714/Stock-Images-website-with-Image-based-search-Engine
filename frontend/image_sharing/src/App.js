import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import { Route } from "react-router-dom";
import Data from "./data";

class App extends Component {

state = {
  carouselImages: [],
  galleryImages: [],
  modalVisibility: false
};
 

async componentDidMount () {

 await axios
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

  fetchImages = () => { };
  
render() {
    return (
      <div className="App">
        <Navbar handleImageModal={this.handleImageModal}></Navbar>
        <Carousel images={Data.CarouselImages}></Carousel>
        <ImageGallery images={this.state.galleryImages}></ImageGallery>
        <div>
          <Route path="/home" component={LandingPage}></Route>
        </div>

        <PageFooter></PageFooter>
      </div>
    );
  }
}

export default App;
