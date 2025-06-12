import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// JSON import for marine offshore 500 level first semester
import marineoffshore1 from "../JSON/marineoffshore1.json";

function PDFViewer() {
  const location = useLocation();
  const { level, college, department, semester } = location.state || {};
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    if (!department || !level || !semester) {
      setPdfs([]);
      return;
    }

    const dept = department.toLowerCase().trim();
    const sem = semester.toLowerCase().trim();

    let matchedPDFs = [];

    if (level === "500" && sem === "first") {
      if (dept.includes("offshore")) {
        matchedPDFs = Object.values(marineoffshore1).flat();
      }
      // You can add more conditions here for naval and powerplant:
      // else if (dept.includes("naval")) { import and use corresponding JSON }
      // else if (dept.includes("powerplant")) { import and use corresponding JSON }
    }

    setPdfs(matchedPDFs);
  }, [department, level, semester]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow text-left">
      <h2 className="text-2xl font-bold mb-4 text-center">
        PDFs for {department || "Unknown Department"}
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
