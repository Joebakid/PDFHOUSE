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
import { BookmarkProvider } from "./context/BookmarkContext";
import BookmarksPage from "./Pages/BookmarksPage";
import { ThemeProvider } from "./context/ThemeContext";
import SearchPage from "./Pages/SearchPage";
import IOSInstallPrompt from "./components/IOSInstallPrompt";
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
// Updated LinkCustom to support URL query params
function LinkCustom({ text, className, to, search }) {
  return (
    <Link
      to={search ? { pathname: to, search } : to}
      className={`${className} cursor-pointer hover:scale-105`}
    >
      {text}
    </Link>
  );
}

// Back Button Component
function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end w-full mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 transition bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
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
   <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Nav Btn={Btn} LinkCustom={LinkCustom} />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header Btn={Btn} LinkCustom={LinkCustom} />
                <WhyUs />
                <CreatorsSection />
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
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route
            path="/search"
            element={
              <SearchPage
                Btn={Btn}
                LinkCustom={LinkCustom}
                BackButton={BackButton}
              />
            }
          />
        </Routes>
      </div>

      <Footer Btn={Btn} LinkCustom={LinkCustom} />
       <IOSInstallPrompt />
    </div>
  );
}

// Main App with Router
function App() {
  return (
    <Router>
      <BookmarkProvider>
         <ThemeProvider>
            <AppWrapper />
         </ThemeProvider> 
      </BookmarkProvider>
    </Router>
  );
}

export default App;
