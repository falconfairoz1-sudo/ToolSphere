'use client';

import { useState } from 'react';
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react';

export default function ListRandomizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomize = () => {
    const lines = input.split('\n').filter(line => line.trim());
    const shuffled = shuffleArray(lines);
    setOutput(shuffled.join('\n'));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <Shuffle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">List Randomizer</h1>
          </div>
          <p className="text-gray-600 text-lg">Shuffle and randomize your lists</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Input List</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter items (one per line)..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Randomized List</label>
              <textarea
                value={output}
                readOnly
                placeholder="Randomized items will appear here..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={randomize}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Randomize List
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
