import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Nav from "./components/LAYOUT/Nav";
import Header from "./components/LAYOUT/Header";
import PDFs from "./Pages/PDFs";
import DepartmentPage from "./Pages/DepartmentPage";
import PDFViewer from "./Pages/PDFViewer"; // 👈 Make sure this file exists

import "./App.css";

// Reusable Button component
function Btn({ text, className }) {
  return (
    <a
      href="https://t.me/bakid1"
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} cursor-pointer hover:scale-105`}
    >
      {text}
    </a>
  );
}

// Reusable Link component
function LinkCustom({ text, className, to }) {
  return (
    <Link to={to} className={`${className} cursor-pointer hover:scale-105`}>
      {text}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <Nav Btn={Btn} LinkCustom={LinkCustom} />
      <Routes>
        <Route
          path="/"
          element={<Header Btn={Btn} LinkCustom={LinkCustom} />}
        />
        <Route
          path="/pdfs"
          element={<PDFs Btn={Btn} LinkCustom={LinkCustom} />}
        />
        <Route
          path="/department"
          element={<DepartmentPage Btn={Btn} LinkCustom={LinkCustom} />}
        />
        <Route
          path="/pdfs-view"
          element={<PDFViewer Btn={Btn} LinkCustom={LinkCustom} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
