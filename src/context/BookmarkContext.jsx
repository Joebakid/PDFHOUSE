// src/context/BookmarkContext.jsx
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
    if (!bookmarks.some((b) => b.href === doc.href)) {
      setBookmarks((prev) => [...prev, doc]);
    }
  };

  const removeBookmark = (href) => {
    setBookmarks((prev) => prev.filter((b) => b.href !== href));
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
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
