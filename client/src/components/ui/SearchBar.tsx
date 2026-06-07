'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { toolIcons } from '@/data/toolIcons';

interface Tool {
  id: string;
  name: string;
  description: string;
  route: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch all tools
    fetch('http://localhost:5000/api/tools')
      .then(res => res.json())
      .then(data => {
        setAllTools(data.data || []);
      })
      .catch(err => console.error('Error fetching tools:', err));
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // Filter tools based on query
    const filtered = allTools.filter(tool =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, allTools]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-8 sm:pl-10 md:pl-12 pr-8 sm:pr-10 md:pr-12 py-2 sm:py-2.5 md:py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-2xl max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto z-50 animate-fade-in">
          <div className="p-1.5 sm:p-2">
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 px-2 sm:px-3 py-1.5 sm:py-2 font-semibold">
              Found {results.length} tool{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((tool) => (
              <Link
                key={tool.id}
                href={tool.route}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition group"
              >
                <div className="text-lg sm:text-xl md:text-2xl flex-shrink-0">{toolIcons[tool.id] || '🔧'}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate">
                    {tool.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                    {tool.description}
                  </p>
                </div>
                <div className="text-[9px] sm:text-xs text-gray-400 dark:text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0 hidden sm:block">
                  {tool.category}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
