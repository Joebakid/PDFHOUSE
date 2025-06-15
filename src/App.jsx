import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Nav from "./components/LAYOUT/Nav";
import Header from "./components/LAYOUT/Header";
import PDFs from "./Pages/PDFs";
import DepartmentPage from "./Pages/DepartmentPage";
import PDFViewer from "./Pages/PDFViewer";
import WhyUs from "./components/LAYOUT/WhyUs";
import { ArrowLeft } from "lucide-react";
import CreatorsSection from "./components/LAYOUT/CreatorsSection";
import Footer from "./components/LAYOUT/Footer";
import "./App.css";

// Telegram Button
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

// React Router Link
function LinkCustom({ text, className, to }) {
  return (
    <Link to={to} className={`${className} cursor-pointer hover:scale-105`}>
      {text}
    </Link>
  );
}

// Back Button Component
function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>
    </div>
  );
}

// App Wrapper to handle GA4 Route Tracking
function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-VQ0HCBZ327", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <>
      <Nav Btn={Btn} LinkCustom={LinkCustom} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header Btn={Btn} LinkCustom={LinkCustom} />
              <WhyUs />
              <CreatorsSection />
              <Footer Btn={Btn} LinkCustom={LinkCustom} />
            </>
          }
        />
        <Route
          path="/pdfs"
          element={
            <PDFs Btn={Btn} LinkCustom={LinkCustom} BackButton={BackButton} />
          }
        />
        <Route
          path="/department"
          element={
            <DepartmentPage
              Btn={Btn}
              LinkCustom={LinkCustom}
              BackButton={BackButton}
            />
          }
        />
        <Route
          path="/pdfs-view"
          element={
            <PDFViewer
              Btn={Btn}
              LinkCustom={LinkCustom}
              BackButton={BackButton}
            />
          }
        />
      </Routes>
    </>
  );
}

// Main App with Router
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
