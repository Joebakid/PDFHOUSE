import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// JSON imports
import marineoffshore1 from "../JSON/marineoffshore1.json";
// import marinenaval1 from "../JSON/marinenaval1.json";
// import marinepowerplant1 from "../JSON/marinepowerplant1.json";

function PDFViewer() {
  const location = useLocation();
  const { level, college, department, semester, subdivision } =
    location.state || {};
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    if (!department || !level || !semester) {
      setPdfs([]);
      return;
    }

    const dept = department.toLowerCase().trim();
    const sub = subdivision?.toLowerCase().trim(); // may be undefined
    const sem = semester.toLowerCase().trim();
    const lvl = level.trim();

    let matchedPDFs = [];

    // Marine Engineering 500 Level PDFs - Based on Subdivision and Semester
    if (dept === "marine engineering" && lvl === "500" && sem === "first") {
      if (sub === "offshore") {
        matchedPDFs = Object.values(marineoffshore1).flat();
      }
      // Add more when you have the other JSONs:
      // else if (sub === "naval") matchedPDFs = Object.values(marinenaval1).flat();
      // else if (sub === "powerplant") matchedPDFs = Object.values(marinepowerplant1).flat();
    }

    // You can later add similar conditional blocks for Mechanical or others here

    setPdfs(matchedPDFs);
  }, [department, level, semester, subdivision]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow text-left">
      <h2 className="text-2xl font-bold mb-4 text-center">
        PDFs for{" "}
        {subdivision
          ? `${subdivision} - ${department}`
          : department || "Unknown Department"}
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        College: {college || "N/A"} | Level: {level || "N/A"} | Semester:{" "}
        {semester || "N/A"}
      </p>

      {pdfs.length > 0 ? (
        <ul className="space-y-3">
          {pdfs.map((pdf, i) => (
            <li key={i}>
              <a
                href={pdf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {pdf.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No PDFs found for this department, level, or semester.
        </p>
      )}
    </div>
  );
}

export default PDFViewer;
