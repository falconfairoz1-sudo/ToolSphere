'use client';

import { useState } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';

export default function TextSorter() {
  const [input, setInput] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const sortText = () => {
    const lines = input.split('\n').filter(line => line.trim());
    
    const sorted = lines.sort((a, b) => {
      const compareA = caseSensitive ? a : a.toLowerCase();
      const compareB = caseSensitive ? b : b.toLowerCase();
      
      if (sortOrder === 'asc') {
        return compareA.localeCompare(compareB);
      } else {
        return compareB.localeCompare(compareA);
      }
    });
    
    setOutput(sorted.join('\n'));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl shadow-lg">
              <ArrowUpDown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Text Sorter</h1>
          </div>
          <p className="text-gray-600 text-lg">Sort lines alphabetically</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter lines to sort..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Sorted Output</label>
              <textarea
                value={output}
                readOnly
                placeholder="Sorted lines will appear here..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 resize-none font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={sortOrder === 'asc'}
                onChange={() => setSortOrder('asc')}
                className="w-4 h-4 text-violet-500"
              />
              <span className="text-sm font-medium text-gray-700">Ascending (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={sortOrder === 'desc'}
                onChange={() => setSortOrder('desc')}
                className="w-4 h-4 text-violet-500"
              />
              <span className="text-sm font-medium text-gray-700">Descending (Z-A)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4 text-violet-500 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Case Sensitive</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={sortText}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Sort Lines
            </button>
            {output && (
              <button
                onClick={copyOutput}
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
