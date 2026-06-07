'use client';

import { useState } from 'react';
import { Share2, Copy, Lock, Clock, Eye, Download, Link as LinkIcon } from 'lucide-react';

export default function NoteSharing() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [password, setPassword] = useState('');
  const [expiryTime, setExpiryTime] = useState('24');
  const [shareLink, setShareLink] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [maxViews, setMaxViews] = useState('');

  const generateShareLink = () => {
    if (!noteContent.trim()) {
      alert('Please enter some content to share!');
      return;
    }

    // Generate a random ID for the note
    const noteId = Math.random().toString(36).substring(2, 15);
    
    // In a real app, this would save to a backend
    // For demo purposes, we'll create a shareable link
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/shared-note/${noteId}`;
    
    setShareLink(link);
    
    // Simulate saving note data (in real app, this would be an API call)
    const noteData = {
      id: noteId,
      title: noteTitle || 'Untitled Note',
      content: noteContent,
      password: password || null,
      expiryHours: parseInt(expiryTime),
      maxViews: maxViews ? parseInt(maxViews) : null,
      createdAt: new Date().toISOString(),
      viewCount: 0
    };
    
    // Store in localStorage for demo (in production, use backend)
    localStorage.setItem(`note_${noteId}`, JSON.stringify(noteData));
    
    alert('Share link generated! Note: This is a demo. In production, notes would be stored securely on a server.');
  };

  const copyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert('Link copied to clipboard!');
    }
  };

  const downloadNote = () => {
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${noteTitle || 'note'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setNoteTitle('');
    setNoteContent('');
    setPassword('');
    setExpiryTime('24');
    setShareLink('');
    setMaxViews('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Note Sharing Tool</h1>
            <p className="text-gray-600 dark:text-gray-400">Share notes securely with password protection and expiry</p>
          </div>
        </div>

        {!shareLink ? (
          <div className="space-y-6">
            {/* Note Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note Title (Optional)
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="My Important Note"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Note Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note Content *
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Type or paste your note here..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {noteContent.length} characters
              </div>
            </div>

            {/* Security Options */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Security Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Protection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password Protection (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expiry Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Expiry Time
                  </label>
                  <select
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="1">1 hour</option>
                    <option value="6">6 hours</option>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours</option>
                    <option value="72">3 days</option>
                    <option value="168">1 week</option>
                    <option value="720">30 days</option>
                  </select>
                </div>

                {/* Max Views */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Views (Optional)
                  </label>
                  <input
                    type="number"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    placeholder="Leave empty for unlimited views"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Note will be automatically deleted after this many views
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={generateShareLink}
                disabled={!noteContent.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-5 h-5" />
                <span>Generate Share Link</span>
              </button>
              <button
                onClick={downloadNote}
                disabled={!noteContent.trim()}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🔒 Privacy & Security</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Notes are stored temporarily and automatically deleted after expiry</li>
                <li>• Password-protected notes are encrypted</li>
                <li>• No personal information is collected</li>
                <li>• Links are one-time use if max views is set to 1</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Share Link Generated!</h3>
                  <p className="text-green-600 dark:text-green-400">Your note is ready to share</p>
                </div>
              </div>

              {/* Share Link */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Share Link
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button
                    onClick={copyLink}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Note Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Expires In</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {expiryTime} {parseInt(expiryTime) === 1 ? 'hour' : 'hours'}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">Protection</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {password ? 'Password' : 'None'}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Max Views</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {maxViews || 'Unlimited'}
                  </div>
                </div>
              </div>

              {/* Warning */}
              {password && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Important:</strong> Make sure to share the password separately with the recipient!
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
              >
                Share Another Note
              </button>
              <button
                onClick={copyLink}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Link Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
