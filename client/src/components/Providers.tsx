'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { BookmarkProvider } from '@/contexts/BookmarkContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          {children}
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
