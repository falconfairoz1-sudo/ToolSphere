'use client';

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useAuth } from '@/contexts/AuthContext';

interface BookmarkButtonProps {
  toolId: string;
  className?: string;
}

export default function BookmarkButton({ toolId, className = '' }: BookmarkButtonProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`p-2 rounded-lg w-9 h-9 ${className}`} />
    );
  }

  return <BookmarkButtonInner toolId={toolId} className={className} />;
}

function BookmarkButtonInner({ toolId, className }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isAuthenticated } = useAuth();
  const bookmarked = isAuthenticated && isBookmarked(toolId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(toolId);
      }}
      className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark
        className={`w-5 h-5 ${
          bookmarked
            ? 'fill-primary-600 text-primary-600'
            : 'text-gray-400 hover:text-primary-600'
        }`}
      />
    </button>
  );
}
