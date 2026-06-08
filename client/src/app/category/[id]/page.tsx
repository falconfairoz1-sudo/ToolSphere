'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import ToolCard from '@/components/ui/ToolCard';
import { categories } from '@/data/categories';
import { categoryGradients, toolIcons } from '@/data/toolIcons';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const category = categories.find(c => c.id === categoryId);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    
    const query = searchQuery.toLowerCase();
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  }, [tools, searchQuery]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/category/${categoryId}`)
      .then(res => res.json())
      .then(data => {
        setTools(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tools:', err);
        setLoading(false);
      });
  }, [categoryId]);

  if (!category) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Category not found</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
            <span className="text-5xl">
              {category.icon === 'FileText' && '📄'}
              {category.icon === 'Image' && '🖼️'}
              {category.icon === 'Video' && '🎥'}
              {category.icon === 'Sparkles' && '✨'}
              {category.icon === 'Code' && '💻'}
              {category.icon === 'DollarSign' && '💰'}
              {category.icon === 'Database' && '📊'}
              {category.icon === 'GraduationCap' && '🎓'}
              {category.icon === 'Globe' && '🌐'}
              {category.icon === 'Shield' && '🔐'}
              {category.icon === 'Wrench' && '🔧'}
              {category.icon === 'Music' && '🎵'}
              {category.icon === 'Gamepad2' && '🎮'}
              {category.icon === 'PenTool' && '✍️'}
              {category.icon === 'Briefcase' && '💼'}
              {category.icon === 'Share2' && '📱'}
              {category.icon === 'RefreshCw' && '🔄'}
              {category.icon === 'Heart' && '❤️'}
              {category.icon === 'Zap' && '⚡'}
            </span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {category.description}
          </p>
          <p className="text-lg font-semibold text-primary-600">
            {tools.length} tools available
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${category.name.toLowerCase()} tools...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery 
                ? `No tools match "${searchQuery}". Try a different search term.`
                : 'No tools available in this category.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                icon={toolIcons[tool.id] || '🔧'}
                route={tool.route}
                gradient={categoryGradients[tool.category] || 'from-gray-500 to-gray-600'}
                trending={tool.trending}
                new={tool.new}
                toolId={tool.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
