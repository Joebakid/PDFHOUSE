import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Minimize2, Maximize2, FileText } from "lucide-react";
import marineoffshore1 from "../JSON/marineoffshore1.json";

function Doc({ name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#00CCFF] text-white px-4 py-3 rounded-xl font-medium shadow hover:bg-[#00b0e6] transition flex items-center gap-2 max-w-xs break-words custom-transition"
    >
      <FileText size={18} />
      {name}
    </a>
  );
}

function CourseSection({ title, docs }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 text-left">
      <h2
        className="text-lg font-semibold cursor-pointer flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </h2>

      {isOpen && (
        <div className="flex flex-wrap gap-4 mt-4 items-center  ">
          {docs.map((doc, index) => (
            <Doc key={index} name={doc.name} href={doc.href} />
          ))}
        </div>
      )}
    </div>
  );
}

function PDFViewer({ BackButton }) {
  const location = useLocation();
  const { level, college, department, semester, subdivision } =
    location.state || {};
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (
      !department ||
      !level ||
      !semester ||
      department.toLowerCase().trim() !== "marine engineering" ||
      level.trim() !== "500" ||
      semester.toLowerCase().trim() !== "first" ||
      subdivision?.toLowerCase().trim() !== "offshore"
    ) {
      setSections([]);
      return;
    }

    const data = marineoffshore1;

    const keyMapping = {
      MAR517: "mar517",
      MAR511: "mar511Docs",
      EEE516: "eee516Docs",
      MAR532: "mar532",
      GET511: "get511",
      MAR512: "mar512",
      MEE512: "mee512",
      "PAST QUESTION": "PQ",
      MAR518: "mar518",
    };

    const courseOrder = [
      "MAR517",
      "MAR511",
      "EEE516",
      "MAR532",
      "GET511",
      "MAR512",
      "MEE512",
      "PAST QUESTION",
      "MAR518",
    ];

    const orderedSections = courseOrder
      .map((course) => {
        const key = keyMapping[course];
        const docs = data[key];
        return docs ? { title: course, docs } : null;
      })
      .filter(Boolean);

    setSections(orderedSections);
  }, [department, level, semester, subdivision]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center  ">
      <header className="mb-8">
        <BackButton />
        <h1 className="text-md text-gray-700 mt-1 font-bold">
          Access and download course materials for {subdivision || "N/A"}{" "}
          subdivision
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          College: {college || "N/A"} | Level: {level || "N/A"} | Semester:{" "}
          {semester || "N/A"}
        </p>
      </header>

      {sections.length > 0 ? (
        sections.map(({ title, docs }, index) => (
          <CourseSection key={index} title={title} docs={docs} />
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No PDFs found for this department, level, or semester.
        </p>
      )}
    </div>
  );
}

export default PDFViewer;
