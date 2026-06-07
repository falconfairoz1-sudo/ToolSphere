'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Bookmark, Search, Tag, ExternalLink, Folder } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  folder: string;
  createdAt: Date;
  favicon?: string;
}

export default function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [folders, setFolders] = useState<string[]>(['General', 'Work', 'Personal', 'Learning']);
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: '',
    folder: 'General',
  });

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      const parsed = JSON.parse(saved);
      setBookmarks(parsed.map((b: any) => ({
        ...b,
        createdAt: new Date(b.createdAt),
      })));
    }

    const savedFolders = localStorage.getItem('bookmark-folders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  const saveBookmarks = (updatedBookmarks: BookmarkItem[]) => {
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const addBookmark = () => {
    if (!formData.title || !formData.url) return;

    const newBookmark: BookmarkItem = {
      id: Date.now().toString(),
      title: formData.title,
      url: formData.url,
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      folder: formData.folder,
      createdAt: new Date(),
      favicon: getFavicon(formData.url) || undefined,
    };

    saveBookmarks([newBookmark, ...bookmarks]);
    resetForm();
  };

  const updateBookmark = () => {
    if (!editingId) return;

    const updatedBookmarks = bookmarks.map(b => {
      if (b.id === editingId) {
        return {
          ...b,
          title: formData.title,
          url: formData.url,
          description: formData.description,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
          folder: formData.folder,
          favicon: getFavicon(formData.url) || undefined,
        };
      }
      return b;
    });

    saveBookmarks(updatedBookmarks);
    resetForm();
  };

  const deleteBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const startEdit = (bookmark: BookmarkItem) => {
    setEditingId(bookmark.id);
    setFormData({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      tags: bookmark.tags.join(', '),
      folder: bookmark.folder,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      tags: '',
      folder: 'General',
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const addFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && !folders.includes(folderName)) {
      const updatedFolders = [...folders, folderName];
      setFolders(updatedFolders);
      localStorage.setItem('bookmark-folders', JSON.stringify(updatedFolders));
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFolder = selectedFolder === 'All' || bookmark.folder === selectedFolder;

    return matchesSearch && matchesFolder;
  });

  const getBookmarksByFolder = (folder: string) => {
    return bookmarks.filter(b => b.folder === folder).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-12 h-[calc(100vh-8rem)]">
            {/* Sidebar */}
            <div className="col-span-3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <Bookmark className="w-8 h-8 text-blue-600" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bookmarks
                  </h1>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Bookmark</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Folders
                  </h3>
                  <button
                    onClick={() => setSelectedFolder('All')}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition ${
                      selectedFolder === 'All'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Bookmarks</span>
                      <span className="text-sm">{bookmarks.length}</span>
                    </div>
                  </button>
                  {folders.map(folder => (
                    <button
                      key={folder}
                      onClick={() => setSelectedFolder(folder)}
                      className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition ${
                        selectedFolder === folder
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Folder className="w-4 h-4" />
                          <span>{folder}</span>
                        </div>
                        <span className="text-sm">{getBookmarksByFolder(folder)}</span>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={addFolder}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
                  >
                    + Add Folder
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9 flex flex-col">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Add/Edit Form */}
              {showAddForm && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {editingId ? 'Edit Bookmark' : 'Add New Bookmark'}
                    </h3>
                    <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <textarea
                      placeholder="Description (optional)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      rows={2}
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <select
                      value={formData.folder}
                      onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {folders.map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                    <button
                      onClick={editingId ? updateBookmark : addBookmark}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingId ? 'Update' : 'Save'} Bookmark</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bookmarks Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBookmarks.map(bookmark => (
                    <div
                      key={bookmark.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          {bookmark.favicon && (
                            <img src={bookmark.favicon} alt="" className="w-6 h-6 mt-1" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {bookmark.title}
                            </h3>
                            <a
                              href={bookmark.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline truncate block"
                            >
                              {bookmark.url}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => startEdit(bookmark)}
                            className="text-gray-500 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBookmark(bookmark.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {bookmark.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {bookmark.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {bookmark.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded flex items-center space-x-1"
                            >
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {bookmark.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredBookmarks.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Bookmark className="w-16 h-16 mx-auto mb-4" />
                    <p>No bookmarks found. Add your first bookmark to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
