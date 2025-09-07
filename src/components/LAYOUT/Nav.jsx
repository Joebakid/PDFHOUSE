import React, { useState, useEffect, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

function Nav({ Btn, LinkCustom }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showDesignDropdown, setShowDesignDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // === Use lg (1024px) as the breakpoint for hamburger ===
  const getIsBelowLg = () =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : true;
  const [isMobile, setIsMobile] = useState(getIsBelowLg());

  useEffect(() => {
    const onResize = () => setIsMobile(getIsBelowLg());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDesignDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <nav className="relative flex flex-col items-center justify-between 
    w-[calc(100%-2rem)] mx-auto my-4 px-6 py-4 
    lg:mx-auto text-xs text-black transition duration-300 
    bg-gray-100 rounded-lg shadow-md dark:bg-gray-800 
    max-w-7xl lg:flex-row dark:text-white lg:mt-6">
      {/* Logo + Mobile Icons */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Link to="/" className="text-xl font-bold">
          PDFHOUSE
        </Link>
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={toggleTheme} className="p-1" title="Toggle Theme">
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Dropdown and Nav Links */}
      <div
        className={`absolute lg:static top-24 left-0 w-full lg:w-auto bg-gray-100 dark:bg-gray-800 transition-all duration-300 z-10 rounded-md shadow-md lg:shadow-none ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
        }`}
      >
        <ul className="flex flex-col gap-3 px-4 py-4 text-center lg:flex-row lg:items-center lg:gap-6 lg:py-0 lg:px-0">
          {/* Search Input (Mobile Only) */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 px-2 mt-2 lg:hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search PDFs..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00CCFF] bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              type="submit"
              className="p-2 text-white bg-[#00CCFF] rounded-md hover:bg-[#00b0e6]"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>
          </form>

          {/* External Link */}
          <a
            href="https://t.me/bakid1"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer hover:text-[#00CCFF] custom-transition"
          >
            Add a PDF
          </a>

          {/* Design Dropdown (Mobile + Desktop) */}
          <div className="relative">
            <button
              onClick={() => setShowDesignDropdown((prev) => !prev)}
              className="flex items-center justify-center w-full gap-1 text-[#00CCFF] font-medium focus:outline-none"
            >
              Design <FiChevronDown size={14} />
            </button>

            {showDesignDropdown && (
              <div className="absolute z-30 w-40 mt-2 -translate-x-1/2 bg-white border rounded-lg shadow-lg left-1/2 lg:left-auto lg:right-0 lg:translate-x-0 dark:bg-gray-900 dark:border-gray-700">
                <Link
                  to="/fyb"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  FYB Page
                </Link>
                <Link
                  to="/cv-generator"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  CV generator
                </Link>
                <Link
                  to="/timetable"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                >
                  timetable
                </Link>
              </div>
            )}
          </div>

          {/* Bookmarks + View PDFs (Mobile Only) */}
          <div className="lg:hidden">
            <LinkCustom
              to="/bookmarks"
              text="Bookmarks"
              className="text-[#00CCFF] font-medium hover:underline"
            />
          </div>

          <div className="mt-2 lg:hidden">
            <LinkCustom
              to="/pdfs"
              text="View PDFs"
              className="bg-[#00CCFF] text-white px-5 py-2 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF]"
            />
          </div>

          {/* Install App Button (Mobile Only) */}
          {isMobile && deferredPrompt && (
            <div className="my-4 lg:hidden">
              <button
                onClick={handleInstall}
                className="px-5 py-2 text-white transition bg-green-500 rounded-lg shadow-lg hover:bg-green-600"
              >
                Install App
              </button>
            </div>
          )}
        </ul>
      </div>

      {/* Right Side Buttons (Desktop Only) */}
      <div className="items-center hidden gap-4 lg:flex">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search PDFs..."
            className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00CCFF] bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            type="submit"
            className="p-2 text-white bg-[#00CCFF] rounded-md hover:bg-[#00b0e6]"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>
        </form>

        <LinkCustom
          to="/bookmarks"
          text="Bookmarks"
          className="text-[#00CCFF] font-medium hover:underline"
        />
        <LinkCustom
          to="/pdfs"
          text="View PDFs"
          className="bg-[#00CCFF] text-white px-5 py-2 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF]"
        />

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Toggle Theme"
        >
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        {/* Install App Button (Desktop Only) */}
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="hidden px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600 lg:block"
          >
            Install App
          </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
