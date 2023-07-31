import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Top250 from "./components/Top250";
import TopSeries from "./components/TopSeries";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="popular" element={<Top250 />} />
        <Route path="popularSeries" element={<TopSeries />} />
      </Routes>
    </div>
  );
}

export default App;
