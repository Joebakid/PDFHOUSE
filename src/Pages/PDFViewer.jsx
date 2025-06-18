"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Minimize2, Maximize2, FileText } from "lucide-react";

// ✅ Preload all JSON files from your src/JSON directory
const allJSONFiles = import.meta.glob("/src/JSON/**/*.json");

function Doc({ name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#00CCFF] text-white px-4 py-3 rounded-xl font-medium shadow hover:bg-[#00b0e6] transition flex items-center gap-2 max-w-xs break-words duration-200"
    >
      <FileText size={18} />
      <span className="truncate">{name}</span>
    </a>
  );
}

function CourseSection({ title, docs }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 text-left">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">({docs.length} files)</span>
          {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docs.map((doc, index) => (
              <Doc key={index} name={doc.name} href={doc.href} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PDFViewer({ BackButton }) {
  const location = useLocation();
  const { level, college, department, semester } = location.state || {};
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPDFs = async () => {
      setLoading(true);
      setError(null);

      if (!level || !college || !semester || !department) {
        setSections([]);
        setLoading(false);
        return;
      }

      // ✅ Build the dynamic path
      const relativePath = `/src/JSON/${level}/${college.toLowerCase()}/${semester.toLowerCase()}/${department
        .toLowerCase()
        .replace(/\s+/g, "")}.json`;

      try {
        console.log("Trying to load:", relativePath);
        if (allJSONFiles[relativePath]) {
          const module = await allJSONFiles[relativePath]();
          const data = module.default;

          const courseSections = Object.entries(data).map(
            ([courseCode, docs]) => ({
              title: courseCode.toUpperCase(),
              docs,
            })
          );

          setSections(courseSections);
        } else {
          throw new Error("JSON path not found in preloaded files.");
        }
      } catch (err) {
        console.error("Load error:", err.message);
        setError(
          `Failed to load course materials. Could not find: ${relativePath}`
        );
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPDFs();
  }, [level, college, department, semester]);

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <header className="mb-8">
        <BackButton />
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Course Materials
          </h1>
          <p className="text-gray-600 mb-1">
            Access and download course materials for {department || "N/A"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>College: {college || "N/A"}</span>
            <span>|</span>
            <span>Level: {level || "N/A"}</span>
            <span>|</span>
            <span>Semester: {semester || "N/A"}</span>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CCFF] mb-4"></div>
            <p className="text-gray-500">Loading course materials...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-sm text-gray-500">
                Make sure the JSON file exists in the correct location.
              </p>
            </div>
          </div>
        ) : sections.length > 0 ? (
          <div className="space-y-4">
            {sections.map(({ title, docs }, index) => (
              <CourseSection key={index} title={title} docs={docs} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg mb-2">No materials found</p>
              <p className="text-gray-400 text-sm">
                No PDFs found for this department, level, or semester.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default PDFViewer;
