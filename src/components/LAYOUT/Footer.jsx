import React from "react";

function Footer({ Btn, LinkCustom }) {
  return (
    <div className="bg-slate-400 py-5">
      <div className="custom-container">
        <div className="py-5">
          <h2>PDF HOME</h2>
          <span className="flex flex-col py-5 gap-5 sm:flex-row">
            <LinkCustom
              to="/pdfs"
              text="View PDFs"
              className="bg-[#00CCFF] text-white py-3 px-10 sm:px-14 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF] hover:scale-105"
            />
            <Btn
              text="Add PDFs"
              className="bg-white text-[#00CCFF] py-3 px-10 sm:px-14 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-[#00CCFF] hover:text-white hover:scale-105"
            />
          </span>
        </div>
        <div>
          <h2>© 2025 The PDF House</h2>
          <p>
            Sponsored by{" "}
            <a
              className="underline hover:decoration-[#00CCFF] custom-transition"
              href="https://chronolite.com.ng/"
            >
              ChronoliteNG
            </a>{" "}
            – Affordable Watches & Bags for Students
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
