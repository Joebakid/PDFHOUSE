import React, { useRef } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import { FileText, Trash2, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const refs = useRef({});

  const handleClearAll = () => {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      clearBookmarks();
    }
  };

  const downloadPDF = async (doc, index) => {
    const node = refs.current[index];
    if (!node) return;

    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${doc.name}.pdf`);
  };

  const downloadImage = async (doc, index) => {
    const node = refs.current[index];
    if (!node) return;

    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${doc.name}.png`;
    link.click();
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-2 text-2xl font-bold">Your Bookmarks</h1>
      <p className="py-4 text-red-400">
        Warning: If history is cleared, you lose your bookmarks!
      </p>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any materials yet.</p>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((doc, index) => (
              <div
                key={index}
                className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow overflow-auto"
              >
                {doc.type !== "Timetable" ? (
                  <>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <FileText size={18} />
                      <span className="truncate">{doc.name}</span>
                    </a>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      <FileText size={18} />
                      <span className="font-semibold truncate">{doc.name}</span>
                    </div>

                    {/* Hidden exportable node with dark mode class */}
                    <div
                      className={isDarkMode ? "dark" : ""}
                      style={{
                        position: "absolute",
                        left: "-10000px",
                        top: "0",
                        padding: "20px",
                        background: isDarkMode ? "#1f2937" : "#ffffff", // Tailwind gray-800 or white
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    >
                      <div
                        ref={(el) => (refs.current[index] = el)}
                        className="text-black dark:text-white bg-white dark:bg-gray-800"
                      >
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr>
                              <th className="border px-2 py-1 text-left">Day / Time</th>
                              {doc.data.hours.map((hour, i) => (
                                <th key={i} className="border px-2 py-1">
                                  {hour}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {doc.data.days.map((day) => (
                              <tr key={day}>
                                <td className="border px-2 py-1 font-semibold">{day}</td>
                                {doc.data.timetable[day]?.map((course, i) => (
                                  <td key={i} className="border px-2 py-1">
                                    {course || "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Visible Table */}
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-2 py-1 text-left">Day / Time</th>
                            {doc.data.hours.map((hour, i) => (
                              <th key={i} className="border px-2 py-1">
                                {hour}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {doc.data.days.map((day) => (
                            <tr key={day}>
                              <td className="border px-2 py-1 font-semibold">{day}</td>
                              {doc.data.timetable[day]?.map((course, i) => (
                                <td key={i} className="border px-2 py-1">
                                  {course || "—"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex gap-3 mt-2 text-sm">
                      <button
                        onClick={() => downloadPDF(doc, index)}
                        className="flex items-center gap-1 text-green-600 hover:underline"
                      >
                        <Download size={14} /> PDF
                      </button>
                      <button
                        onClick={() => downloadImage(doc, index)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Download size={14} /> Image
                      </button>
                    </div>
                  </>
                )}

                <button
                  onClick={() => removeBookmark(doc.href || doc.name)}
                  className="absolute text-sm text-red-500 top-2 right-2 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BookmarksPage;
