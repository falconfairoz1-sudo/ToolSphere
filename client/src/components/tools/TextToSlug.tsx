'use client';

import { useState } from 'react';
import { Link2, Copy, Check } from 'lucide-react';

export default function TextToSlug() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    let result = input.trim();
    
    // Convert to lowercase if needed
    if (lowercase) {
      result = result.toLowerCase();
    }
    
    // Remove special characters and replace spaces
    result = result
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, separator) // Replace spaces with separator
      .replace(new RegExp(`${separator}+`, 'g'), separator) // Remove duplicate separators
      .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // Trim separators
    
    setSlug(result);
  };

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl shadow-lg">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Text to Slug Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert text to URL-friendly slugs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert to slug..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all mb-6"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Separator</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={separator === '-'}
                    onChange={() => setSeparator('-')}
                    className="w-4 h-4 text-sky-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Hyphen (-)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={separator === '_'}
                    onChange={() => setSeparator('_')}
                    className="w-4 h-4 text-sky-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Underscore (_)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Options</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 text-sky-500 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Convert to lowercase</span>
              </label>
            </div>
          </div>

          <button
            onClick={generateSlug}
            disabled={!input}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Generate Slug
          </button>
        </div>

        {slug && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Generated Slug</h3>
              <button
                onClick={copySlug}
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 font-mono text-2xl text-sky-700 text-center break-all">
              {slug}
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Example URL: <span className="font-mono text-sky-600">https://example.com/{slug}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
