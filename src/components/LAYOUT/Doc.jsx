import { FileText } from "lucide-react";
import { useBookmarks } from "../../context/BookmarkContext";

export default function Doc({ name, href }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(href);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(href);
    } else {
      addBookmark({ name, href });
    }
  };

  return (
    <div className="relative w-full max-w-3xl px-4 mx-auto overflow-hidden">
      <div className="flex items-center justify-between bg-[#00CCFF] text-white px-4 py-3 rounded-xl font-medium shadow hover:bg-[#00b0e6] transition duration-200">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-full gap-2 overflow-hidden"
        >
          <FileText size={18} />
          <span className="w-full truncate">{name}</span>
        </a>

        <button
          onClick={toggleBookmark}
          className={`text-xs px-2 py-1 ml-4 rounded shrink-0 ${
            bookmarked ? "bg-red-500 text-white" : "bg-white text-[#00CCFF]"
          } shadow hover:scale-105 transition`}
        >
          {bookmarked ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}
