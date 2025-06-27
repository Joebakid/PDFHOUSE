import React from "react";

function Header({ Btn, LinkCustom }) {
  return (
    <div className="custom-container flex flex-col justify-center items-center text-center px-4  initial-spacing">
      {/* Responsive heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold py-3">
        PDF HOUSE
      </h2>

      {/* Responsive paragraph */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl py-3 max-w-4xl">
        Your one-stop academic hub for textbooks, notes, handouts & past
        questions — organized, accessible, and free.
      </p>

      {/* Responsive buttons */}
     <div className="flex flex-col sm:flex-row items-center gap-4 py-5 my-10">

        <LinkCustom
          to="/pdfs"
          text="View PDFs"
          className="bg-[#00CCFF] text-white py-3 px-10 sm:px-14 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF] hover:scale-105"
        />
        <Btn
          text="Add PDFs"
          className="bg-white text-[#00CCFF] py-3 px-10 sm:px-14 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-[#00CCFF] hover:text-white hover:scale-105"
        />
      </div>
    </div>
  );
}

export default Header;
