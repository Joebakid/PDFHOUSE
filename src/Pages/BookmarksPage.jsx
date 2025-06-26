import React from "react";
import { useBookmarks } from "../context/BookmarkContext";
import { FileText, Trash2 } from "lucide-react";

function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-2 text-2xl font-bold">Your Bookmarks</h1>
      <p className="py-4 text-red-400">
        warning: If history is cleared, you lose your bookmark!
      </p>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any materials yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((doc, index) => (
            <div
              key={index}
              className="relative p-4 bg-gray-100 rounded-lg shadow"
            >
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FileText size={18} />
                <span className="truncate">{doc.name}</span>
              </a>
              <button
                onClick={() => removeBookmark(doc.href)}
                className="absolute text-sm text-red-500 top-2 right-2 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
