import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryContainer from "./containers/GalleryContainer";
import ImageContainer from "./components/ImageContainer";
import Card from "@mui/material/Card";

class Main extends Component {
  render() {
    return (
      <Router>
        <Card raised>
          <div className="gallery-container">
            <Routes>
              <Route
                path="/aqua-gallery"
                element={<GalleryContainer />}
              ></Route>
              <Route path="/details" element={<ImageContainer />}></Route>
              <Route path="/" element={<GalleryContainer />}></Route>
            </Routes>
          </div>
        </Card>
      </Router>
    );
  }
}

export default Main;
