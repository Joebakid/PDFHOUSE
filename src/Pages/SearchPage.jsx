import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Doc from "../components/LAYOUT/Doc";

// Import all JSON files eagerly
const allJSONFiles = import.meta.glob("/src/JSON/**/*.json", { eager: true });

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchPage() {
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";

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
        const data = fileData.default || fileData;
        const sections = Object.entries(data);

        for (const [sectionKey, docs] of sections) {
          const keyMatches = sectionKey.toLowerCase().includes(searchTerm);

          if (Array.isArray(docs)) {
            for (const doc of docs) {
              const nameMatch =
                doc?.name &&
                typeof doc.name === "string" &&
                doc.name.toLowerCase().includes(searchTerm);

              // Include if name OR section key matches
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
  }, [searchTerm]);

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
      <h1 className="mb-4 text-2xl font-bold text-center">
        Search Results for{" "}
        <span className="text-[#00CCFF]">"{searchTerm}"</span>
      </h1>

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
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-[#00CCFF] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
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
