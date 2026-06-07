'use client';

import { useState } from 'react';
import { Trash2, Copy } from 'lucide-react';

export default function RemoveDuplicates() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const unique = [...new Set(lines)];
    const removed = lines.length - unique.length;
    
    setOutput(unique.join('\n'));
    setStats({
      original: lines.length,
      unique: unique.length,
      removed,
    });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Trash2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Remove Duplicate Lines
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Remove duplicate lines from text
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text with duplicate lines..."
              className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none font-mono text-sm"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </label>
              {output && (
                <button
                  onClick={copyOutput}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Unique lines will appear here..."
              className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none font-mono text-sm"
            />
          </div>
        </div>

        <button
          onClick={removeDuplicates}
          disabled={!input}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition mb-6"
        >
          Remove Duplicates
        </button>

        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.original}</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">Original Lines</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">{stats.unique}</p>
              <p className="text-sm text-green-800 dark:text-green-200">Unique Lines</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-600">{stats.removed}</p>
              <p className="text-sm text-red-800 dark:text-red-200">Removed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
