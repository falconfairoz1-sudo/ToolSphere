'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, Search, Grid, List, Trash2, ExternalLink } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

interface Tool {
  _id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  slug: string;
  lastUsed?: string;
}

export default function RecentPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    
    fetchRecentTools();
  }, [isAuthenticated, router, user]);

  const fetchRecentTools = async () => {
    try {
      if (!user?.recentTools || user.recentTools.length === 0) {
        setTools([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools`);
      const allTools = await response.json();
      
      // Filter tools that are in recent history
      const recentTools = allTools.filter((tool: Tool) => 
        user.recentTools?.includes(tool._id)
      );
      
      setTools(recentTools);
    } catch (error) {
      console.error('Error fetching recent tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setTools([]);
  };

  const handleRemoveItem = (toolId: string) => {
    setTools(tools.filter(tool => tool._id !== toolId));
  };

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} min ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
                <Clock className="w-10 h-10 mr-3 text-purple-600" />
                Recent Tools
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {tools.length} {tools.length === 1 ? 'tool' : 'tools'} recently used
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Clear History Button */}
              {tools.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear History</span>
                </button>
              )}
              
              {/* View Toggle */}
              <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recent tools..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        {/* Empty State */}
        {tools.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Recent Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Tools you use will appear here for quick access
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
            >
              <span>Browse Tools</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Results Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search query
            </p>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool._id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{tool.icon}</div>
                      <button
                        onClick={() => handleRemoveItem(tool._id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition opacity-0 group-hover:opacity-100"
                        title="Remove from history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium w-fit">
                          {tool.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getTimeAgo(tool.lastUsed || new Date().toISOString())}
                        </span>
                      </div>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm flex items-center space-x-1"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredTools.map((tool) => (
                  <div
                    key={tool._id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="text-4xl">{tool.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {tool.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {tool.description}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 inline-block">
                            Used {getTimeAgo(tool.lastUsed || new Date().toISOString())}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-xs px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                          {tool.category}
                        </span>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(tool._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Remove from history"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
