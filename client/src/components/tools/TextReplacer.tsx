'use client';

import { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';

export default function TextReplacer() {
  const [input, setInput] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [output, setOutput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  const replaceAll = () => {
    if (!findText) {
      alert('Please enter text to find');
      return;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const result = input.replace(regex, replaceText);
    const matches = input.match(regex);
    
    setOutput(result);
    setCount(matches ? matches.length : 0);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Text Find & Replace</h1>
          </div>
          <p className="text-gray-600 text-lg">Find and replace text in bulk</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Find Text</label>
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Enter text to find..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Replace With</label>
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Enter replacement text..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4 text-indigo-500 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Case Sensitive</span>
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text..."
                className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Output</label>
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={replaceAll}
              disabled={!input || !findText}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Replace All
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

          {count > 0 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Replaced <span className="font-bold text-indigo-600">{count}</span> occurrence{count !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
