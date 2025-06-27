import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Doc from "../components/LAYOUT/Doc";

// Eagerly import all JSON files
const allJSONFiles = import.meta.glob("/src/JSON/**/*.json", { eager: true });

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const initialQuery = query.get("query") || "";
  const initialLevel = query.get("level") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const loadAndSearch = async () => {
      if (!searchTerm) return;

      setLoading(true);
      const matches = [];

      const entries = Object.entries(allJSONFiles);

      for (const [path, fileData] of entries) {
        // ✅ Filter by selected level
        if (selectedLevel && !path.includes(`/${selectedLevel}/`)) continue;

        const data = fileData.default || fileData;
        const sections = Object.entries(data);

        for (const [sectionKey, docs] of sections) {
          const keyMatches = sectionKey
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          if (Array.isArray(docs)) {
            for (const doc of docs) {
              const nameMatch =
                doc?.name &&
                typeof doc.name === "string" &&
                doc.name.toLowerCase().includes(searchTerm.toLowerCase());

              if (keyMatches || nameMatch) {
                matches.push({
                  name: doc.name,
                  href: doc.href,
                  section: sectionKey,
                  source: path.split("/src/JSON/")[1],
                });
              }
            }
          }
        }
      }

      setResults(matches);
      setCurrentPage(1);
      setLoading(false);
    };

    loadAndSearch();
  }, [searchTerm, selectedLevel]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}&level=${selectedLevel}`);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Search PDFs</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 mb-6 sm:flex-row sm:justify-center"
      >
        <input
          type="text"
          placeholder="Enter keyword..."
          value={searchTerm}
          onChange={handleSearchInput}
          className="w-full max-w-xs px-4 py-2 border rounded shadow focus:outline-none"
        />
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="px-4 py-2 border rounded shadow focus:outline-none"
        >
          <option value="">All Levels</option>
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
          <option value="500">500 Level</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-[#00CCFF] rounded hover:bg-[#00b5e6]"
        >
          Search
        </button>
      </form>

      <h2 className="mb-4 text-lg text-center text-gray-700">
        Results for <span className="font-semibold">"{searchTerm}"</span>{" "}
        {selectedLevel && <span>({selectedLevel} Level)</span>}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Searching...</p>
      ) : results.length > 0 ? (
        <>
          <div className="gap-6 py-3">
            {currentResults.map((pdf, index) => (
              <div key={index} className="w-[80%] mx-auto">
                <Doc name={pdf.name} href={pdf.href} />
                <p className="mt-1 text-xs text-center text-gray-500">
                  {pdf.section} ({pdf.source})
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center mt-6 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm transition-colors bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const isActive = currentPage === i + 1;
              return (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    isActive
                      ? "bg-[#00CCFF] text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm transition-colors bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
}
