import "./App.css";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Data from "./data";
import { axios } from "axios";
import { Carousel} from "antd";
import PageFooter from "./components/page_footer";
import ImageGallery from "./components/imageGallery";
import AddImageForm from "./components/addImageForm";
import SignupForm from './components/signupForm';
class App extends Component {
  state = {
    carouselImages: [],
    galleryImages: [],
    modalVisibility: false
  };

  async componentDidMount() {
    try {
      const images = await axios.get("http://localhost:3001/api/images/");
      this.setState({ galleryImages: images });
    } catch (ex) {
      console.log("Error:", ex);
      this.setState({ galleryImages: Data.galleryImages });
    }
  }

  handleImageModal = value => {
    if (value === false) this.setState({ modalVisibility: false });
    else this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  render() {
    return (
      <div className="App">
        <Navbar handleImageModal={this.handleImageModal}></Navbar>
        <Carousel images={Data.CarouselImages}></Carousel>
       < ToastContainer></ToastContainer>
        <Switch>
          <Route
            path="/all"
            render={() => (
              <ImageGallery images={this.state.galleryImages}></ImageGallery>
            )}
          ></Route>
          <Route path="/home" component={LandingPage}></Route>
          <Route path="/signup" component={SignupForm}></Route>
        </Switch>

        <AddImageForm
          modalVisibility={this.state.modalVisibility}
          handleImageModal={this.handleImageModal}
        ></AddImageForm>

        <PageFooter></PageFooter>
      </div>
    );
  }
}

export default App;
