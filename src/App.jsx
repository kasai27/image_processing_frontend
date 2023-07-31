import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Header } from "./components/Header";
import Grayscale from "./components/Grayscale";
import Laplacian from "./components/Laplacian";
import Watermark from "./components/Watermark";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/grayscale" element={ <Grayscale /> }/>
          <Route path="/laplacian" element={ <Laplacian /> }/>
          <Route path="/watermark" element={ <Watermark /> }/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
