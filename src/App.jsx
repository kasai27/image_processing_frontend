import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Header } from "./components/Header";
import Grayscale from "./components/Grayscale";
import Edge from "./components/Edge";
import Watermark from "./components/Watermark";
import Detection from "./components/Detection";
import Home from "./components/Home";
import FaceDetection from "./components/FaceDetection";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/watermark" element={ <Watermark /> }/>
          <Route path="/detection" element={ <Detection /> }/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
