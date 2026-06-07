'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface BookmarkContextType {
  bookmarks: string[];
  addBookmark: (toolId: string) => void;
  removeBookmark: (toolId: string) => void;
  isBookmarked: (toolId: string) => boolean;
  toggleBookmark: (toolId: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load bookmarks from localStorage
    const saved = localStorage.getItem('bookmarked_tools');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookmarks:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save bookmarks to localStorage
      localStorage.setItem('bookmarked_tools', JSON.stringify(bookmarks));
    }
  }, [bookmarks, mounted]);

  const addBookmark = (toolId: string) => {
    setBookmarks(prev => {
      if (prev.includes(toolId)) return prev;
      return [...prev, toolId];
    });
  };

  const removeBookmark = (toolId: string) => {
    setBookmarks(prev => prev.filter(id => id !== toolId));
  };

  const isBookmarked = (toolId: string) => {
    return bookmarks.includes(toolId);
  };

  const toggleBookmark = (toolId: string) => {
    if (isBookmarked(toolId)) {
      removeBookmark(toolId);
    } else {
      addBookmark(toolId);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
