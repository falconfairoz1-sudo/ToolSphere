'use client';

import { useState } from 'react';
import { Link, Copy, Check, ExternalLink, BarChart3 } from 'lucide-react';

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ clicks: 0, created: '' });

  const shortenUrl = async () => {
    if (!longUrl) {
      alert('Please enter a URL to shorten');
      return;
    }

    // Validate URL
    try {
      new URL(longUrl);
    } catch {
      alert('Please enter a valid URL (including http:// or https://)');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate short URL
      const alias = customAlias || Math.random().toString(36).substring(2, 8);
      const shortened = `https://short.link/${alias}`;
      
      setShortUrl(shortened);
      setStats({
        clicks: 0,
        created: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Link className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              URL Shortener
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create short, memorable links with custom aliases and analytics
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long URL
              </label>
              <input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Alias (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 dark:text-gray-400">short.link/</span>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="my-custom-link"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty for random alias
              </p>
            </div>

            <button
              onClick={shortenUrl}
              disabled={loading || !longUrl}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <Link className="w-5 h-5" />
                  <span>Shorten URL</span>
                </>
              )}
            </button>
          </div>

          {/* Result Section */}
          {shortUrl && (
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Your shortened URL is ready!</span>
              </h3>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>Clicks</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.clicks}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    Created
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats.created}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-3 text-sm">
              Features:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-purple-800 dark:text-purple-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Custom aliases</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Click tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>QR code generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Link analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
