import React, { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Nav({ Btn, LinkCustom }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const mobileInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  useEffect(() => {
    // Blur the input when the mobile menu opens to prevent auto-focus
    if (isOpen && mobileInputRef.current) {
      mobileInputRef.current.blur();
    }
  }, [isOpen]);

  return (
    <nav className="relative flex flex-col items-center justify-between p-4 m-2 bg-gray-100 rounded-lg shadow-md custom-container md:flex-row">
      {/* Logo and Hamburger */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-xl font-bold">
          PDFHOUSE
        </Link>
        <div className="md:hidden">
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
        <div className="z-20 w-full px-4 mt-2 bg-gray-100 md:hidden">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <input
              type="text"
              ref={mobileInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search PDFs..."
              className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm"
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
        className={`absolute md:static top-24 left-0 w-full md:w-auto bg-gray-100 md:bg-transparent transition-transform duration-300 ease-in-out z-10 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        } md:translate-y-0 md:opacity-100 md:pointer-events-auto`}
      >
        <ul className="flex flex-col gap-2 p-4 text-center md:flex-row md:items-center md:gap-6 md:p-0">
          <a
            href="https://t.me/bakid1"
            target="_blank"
            className="cursor-pointer hover:text-[#00CCFF] custom-transition"
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
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00CCFF]"
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
      </div>
    </nav>
  );
}

export default Nav;
