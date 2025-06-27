import React, { useState, useEffect, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext"; // 🌙 Theme context

function Nav({ Btn, LinkCustom }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null); // ✅ PWA prompt
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext); // ⬅️ Access theme state

  // ✅ Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ✅ Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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
    <nav className="relative flex flex-col items-center justify-between p-4 m-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md custom-container md:flex-row text-black dark:text-white transition duration-300">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-xl font-bold">
          PDFHOUSE
        </Link>
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleTheme} className="p-1" title="Toggle Theme">
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile underline accent */}
      {isOpen && (
        <div className="h-[3px] bg-[#00CCFF] rounded-full mt-2 mb-1 md:hidden"></div>
      )}

      {/* ✅ Mobile Search */}
      {isOpen && (
        <div className="z-20 flex justify-center w-full mt-2 md:hidden">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 w-[90%] max-w-sm items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow-sm"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search PDFs..."
              className="flex-1 px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00CCFF] bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button
              type="submit"
              className="p-2 text-white bg-[#00CCFF] rounded-lg hover:bg-[#00b0e6]"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`absolute md:static top-24 left-0 w-full md:w-auto bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out z-10 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        } md:translate-y-0 md:opacity-100 md:pointer-events-auto`}
      >
        <ul className="flex flex-col gap-2 p-4 text-center md:flex-row md:items-center md:gap-6 md:p-0">
          <a
            href="https://t.me/bakid1"
            target="_blank"
            className="cursor-pointer hover:text-[#00CCFF] custom-transition my-4"
          >
            Request PDF
          </a>
          <a
            href="https://t.me/bakid1"
            target="_blank"
            className="cursor-pointer hover:text-[#00CCFF] custom-transition"
          >
            Add a PDF
          </a>

          <div className="md:hidden">
            <LinkCustom
              to="/bookmarks"
              text="Bookmarks"
              className="text-[#00CCFF] font-medium hover:underline"
            />
          </div>

          <div className="mt-2 md:hidden">
            <LinkCustom
              to="/pdfs"
              text="View PDFs"
              className="bg-[#00CCFF] text-white px-5 py-2 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF]"
            />
          </div>
{/* ✅ Always show Install button on mobile */}
{deferredPrompt && (
  <div className="  md:hidden mt-5">
    <button
      onClick={handleInstall}
      className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
    >
      Install App
    </button>
  </div>
)}



        </ul>
      </div>

      {/* ✅ Desktop Menu */}
      <div className="items-center hidden gap-4 md:flex">
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

        {/* 🌙 Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Toggle Theme"
        >
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        {/* ✅ Install button for desktop */}
      {deferredPrompt && (
  <button
    onClick={handleInstall}
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition hidden md:block"
  >
    Install App
  </button>
)}

      </div>
    </nav>
  );
}

export default Nav;
