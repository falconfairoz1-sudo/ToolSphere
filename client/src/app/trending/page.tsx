'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Search, Grid3x3, List, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ToolCard from '@/components/ui/ToolCard';
import { toolIcons, categoryGradients } from '@/data/toolIcons';
import { categories } from '@/data/categories';

export default function TrendingToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [filteredTools, setFilteredTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetch('http://localhost:5000/api/tools')
      .then(res => res.json())
      .then(data => {
        const toolsData = data.data || [];
        const trending = toolsData.filter((t: any) => t.trending);
        setTools(trending);
        setFilteredTools(trending);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tools:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = tools;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  }, [selectedCategory, searchQuery, tools]);

  const trendingCategories = [...new Set(tools.map(tool => tool.category))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 shadow-sm hover:shadow-md font-medium group"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                Trending Tools
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover the most popular tools used by professionals
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trending tools..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Trending ({tools.length})
            </button>
            {trendingCategories.map((category) => {
              const categoryData = categories.find(c => c.id === category);
              const count = tools.filter(t => t.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {categoryData?.name || category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading trending tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No trending tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Showing</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {filteredTools.length} Trending Tool{filteredTools.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Most Popular Right Now
                </span>
              </div>
            </div>

            {/* Tools Display */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
              : 'space-y-4'
            }>
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

            {/* Bottom CTA */}
            <div className="mt-16 text-center p-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Want to see more tools?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore all {tools.length}+ tools available on our platform
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition shadow-lg"
              >
                <span>Browse All Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
