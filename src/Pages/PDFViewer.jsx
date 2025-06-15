import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Minimize2, Maximize2, FileText } from "lucide-react";

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
        className="flex items-center gap-2 px-4 py-2 text-lg font-semibold bg-gray-100 rounded-md shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </h2>

      {isOpen && (
        <div className="flex flex-wrap items-center gap-4 mt-4">
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPDFs = async () => {
      setLoading(true);

      if (!level || !college || !semester || !department) {
        setSections([]);
        setLoading(false);
        return;
      }

      const normalizedPath = `../JSON/${level}/${college.toLowerCase()}/${semester.toLowerCase()}/${department
        .toLowerCase()
        .replace(/\s+/g, "")}.json`;

      try {
        const module = await import(/* @vite-ignore */ normalizedPath);
        const data = module.default;

        const courseSections = Object.entries(data).map(
          ([courseCode, docs]) => ({
            title: courseCode.toUpperCase(),
            docs,
          })
        );

        setSections(courseSections);
      } catch (error) {
        console.error("Could not load JSON:", normalizedPath, error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPDFs();
  }, [level, college, department, semester]);

  return (
    <div className="max-w-5xl px-4 py-8 mx-auto text-center">
      <header className="mb-8">
        <BackButton />
        <h1 className="mt-1 font-bold text-gray-700 text-md">
          Access and download course materials for {department || "N/A"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          College: {college || "N/A"} | Level: {level || "N/A"} | Semester:{" "}
          {semester || "N/A"}
        </p>
      </header>

      {loading ? (
        <p className="mt-10 text-gray-500">Loading PDFs...</p>
      ) : sections.length > 0 ? (
        sections.map(({ title, docs }, index) => (
          <CourseSection key={index} title={title} docs={docs} />
        ))
      ) : (
        <p className="mt-10 text-center text-gray-500">
          No PDFs found for this department, level, or semester.
        </p>
      )}
    </div>
  );
}

export default PDFViewer;
