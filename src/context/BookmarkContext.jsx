import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export function useBookmarks() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem("bookmarkedPDFs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedPDFs", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (doc) => {
    // If it's a PDF with href
    if (doc.href) {
      if (!bookmarks.some((b) => b.href === doc.href)) {
        setBookmarks((prev) => [...prev, doc]);
      }
    }
    // If it's a non-PDF bookmark (e.g. timetable)
    else if (doc.type && doc.name) {
      if (!bookmarks.some((b) => b.name === doc.name && b.type === doc.type)) {
        setBookmarks((prev) => [...prev, doc]);
      }
    }
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) =>
      prev.filter((b) => (b.href ? b.href !== id : b.name !== id))
    );
  };

  const isBookmarked = (href) => {
    return bookmarks.some((b) => b.href === href);
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("bookmarkedPDFs");
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        clearBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
