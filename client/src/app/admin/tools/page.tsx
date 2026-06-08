'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wrench, Search, TrendingUp, Star, Edit, Trash2, Plus, X, Check } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { toolIcons } from '@/data/toolIcons';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  trending: boolean;
  new: boolean;
}

export default function AdminToolsPage() {
  const router = useRouter();
  const { isAdmin, loading: authLoading, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTrending, setFilterTrending] = useState('all');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        alert('Access denied. Admin only.');
        router.push('/');
        return;
      }
      fetchTools();
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    filterTools();
  }, [searchQuery, filterCategory, filterTrending, tools]);

  const fetchTools = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools`);
      const data = await response.json();
      if (data.success) {
        setTools(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTools = () => {
    let filtered = [...tools];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === filterCategory);
    }

    // Trending filter
    if (filterTrending === 'trending') {
      filtered = filtered.filter(tool => tool.trending);
    } else if (filterTrending === 'not-trending') {
      filtered = filtered.filter(tool => !tool.trending);
    }

    setFilteredTools(filtered);
  };

  const toggleTrending = async (toolId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${toolId}/trending`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trending: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setTools(tools.map(tool =>
          tool.id === toolId ? { ...tool, trending: !currentStatus } : tool
        ));
      }
    } catch (error) {
      console.error('Error updating trending status:', error);
      alert('Error updating trending status');
    }
  };

  const toggleNew = async (toolId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${toolId}/new`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setTools(tools.map(tool =>
          tool.id === toolId ? { ...tool, new: !currentStatus } : tool
        ));
      }
    } catch (error) {
      console.error('Error updating new status:', error);
      alert('Error updating new status');
    }
  };

  const handleSelectTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTools.length === filteredTools.length) {
      setSelectedTools([]);
    } else {
      setSelectedTools(filteredTools.map(tool => tool.id));
    }
  };

  const bulkSetTrending = async (trending: boolean) => {
    if (selectedTools.length === 0) {
      alert('Please select tools first');
      return;
    }

    try {
      const promises = selectedTools.map(toolId =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${toolId}/trending`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ trending }),
        })
      );

      await Promise.all(promises);
      
      setTools(tools.map(tool =>
        selectedTools.includes(tool.id) ? { ...tool, trending } : tool
      ));
      
      setSelectedTools([]);
      alert(`${selectedTools.length} tools updated successfully!`);
    } catch (error) {
      console.error('Error bulk updating trending:', error);
      alert('Error updating tools');
    }
  };

  const bulkSetNew = async (isNew: boolean) => {
    if (selectedTools.length === 0) {
      alert('Please select tools first');
      return;
    }

    try {
      const promises = selectedTools.map(toolId =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools/${toolId}/new`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ new: isNew }),
        })
      );

      await Promise.all(promises);
      
      setTools(tools.map(tool =>
        selectedTools.includes(tool.id) ? { ...tool, new: isNew } : tool
      ));
      
      setSelectedTools([]);
      alert(`${selectedTools.length} tools updated successfully!`);
    } catch (error) {
      console.error('Error bulk updating new status:', error);
      alert('Error updating tools');
    }
  };

  const categories = [...new Set(tools.map(tool => tool.category))];
  const trendingCount = tools.filter(t => t.trending).length;
  const newCount = tools.filter(t => t.new).length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tools...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wrench className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tools Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage {tools.length} tools • {trendingCount} trending • {newCount} new
                </p>
              </div>
            </div>
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 rounded-lg hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tools</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{tools.length}</p>
              </div>
              <Wrench className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{trendingCount}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">New Tools</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{newCount}</p>
              </div>
              <Star className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Categories</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Tools
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, description, or ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filterTrending}
                onChange={(e) => setFilterTrending(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Tools</option>
                <option value="trending">Trending Only</option>
                <option value="not-trending">Not Trending</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedTools.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                  {selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => setSelectedTools([])}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear selection
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => bulkSetTrending(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium"
                >
                  Set Trending
                </button>
                <button
                  onClick={() => bulkSetTrending(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium"
                >
                  Remove Trending
                </button>
                <button
                  onClick={() => bulkSetNew(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                >
                  Mark as New
                </button>
                <button
                  onClick={() => bulkSetNew(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium"
                >
                  Remove New
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tools Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Tools ({filteredTools.length})
            </h2>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {selectedTools.length === filteredTools.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTools.length === filteredTools.length && filteredTools.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Tool Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTools.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <Wrench className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No tools found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTools.includes(tool.id)}
                          onChange={() => handleSelectTool(tool.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-3xl">{toolIcons[tool.id] || '🔧'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tool.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                          {tool.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500 dark:text-gray-400">
                        {tool.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {tool.trending && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                              🔥 Trending
                            </span>
                          )}
                          {tool.new && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                              ✨ New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTrending(tool.id, tool.trending)}
                            className={`p-2 rounded-lg transition ${
                              tool.trending
                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 hover:bg-orange-200'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                            }`}
                            title={tool.trending ? 'Remove from trending' : 'Set as trending'}
                          >
                            <TrendingUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleNew(tool.id, tool.new)}
                            className={`p-2 rounded-lg transition ${
                              tool.new
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                            }`}
                            title={tool.new ? 'Remove new badge' : 'Mark as new'}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
