'use client';

import { useState } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const reverseText = () => input.split('').reverse().join('');
  const reverseWords = () => input.split(' ').reverse().join(' ');
  const reverseLines = () => input.split('\n').reverse().join('\n');
  const reverseEachWord = () => input.split(' ').map(word => word.split('').reverse().join('')).join(' ');

  const results = [
    { id: 'text', name: 'Reverse Text', result: reverseText(), icon: '🔄' },
    { id: 'words', name: 'Reverse Words', result: reverseWords(), icon: '🔀' },
    { id: 'lines', name: 'Reverse Lines', result: reverseLines(), icon: '↕️' },
    { id: 'each', name: 'Reverse Each Word', result: reverseEachWord(), icon: '🔃' },
  ];

  const copyResult = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Text Reverser</h1>
          </div>
          <p className="text-gray-600 text-lg">Reverse text, words, or lines instantly</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to reverse..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-4">
          {results.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                </div>
                {item.result && (
                  <button
                    onClick={() => copyResult(item.result, item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {copied === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === item.id ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4 font-mono text-gray-800 whitespace-pre-wrap break-words">
                {item.result || 'Result will appear here...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
