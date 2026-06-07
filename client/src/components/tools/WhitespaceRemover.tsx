'use client';

import { useState } from 'react';
import { Space, Copy, Check } from 'lucide-react';

export default function WhitespaceRemover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [removeType, setRemoveType] = useState<'extra' | 'all' | 'leading' | 'trailing'>('extra');

  const removeWhitespace = () => {
    let result = input;
    
    switch (removeType) {
      case 'extra':
        result = input.replace(/\s+/g, ' ').trim();
        break;
      case 'all':
        result = input.replace(/\s/g, '');
        break;
      case 'leading':
        result = input.replace(/^\s+/gm, '');
        break;
      case 'trailing':
        result = input.replace(/\s+$/gm, '');
        break;
    }
    
    setOutput(result);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-slate-500 to-gray-500 rounded-2xl shadow-lg">
              <Space className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">Whitespace Remover</h1>
          </div>
          <p className="text-gray-600 text-lg">Remove extra whitespace from text</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text with whitespace..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all resize-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Output</label>
              <textarea
                value={output}
                readOnly
                placeholder="Cleaned text will appear here..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 resize-none font-mono text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Remove Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setRemoveType('extra')}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  removeType === 'extra'
                    ? 'border-slate-500 bg-slate-50 text-slate-700'
                    : 'border-gray-200 text-gray-600 hover:border-slate-300'
                }`}
              >
                Extra Spaces
              </button>
              <button
                onClick={() => setRemoveType('all')}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  removeType === 'all'
                    ? 'border-slate-500 bg-slate-50 text-slate-700'
                    : 'border-gray-200 text-gray-600 hover:border-slate-300'
                }`}
              >
                All Spaces
              </button>
              <button
                onClick={() => setRemoveType('leading')}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  removeType === 'leading'
                    ? 'border-slate-500 bg-slate-50 text-slate-700'
                    : 'border-gray-200 text-gray-600 hover:border-slate-300'
                }`}
              >
                Leading
              </button>
              <button
                onClick={() => setRemoveType('trailing')}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  removeType === 'trailing'
                    ? 'border-slate-500 bg-slate-50 text-slate-700'
                    : 'border-gray-200 text-gray-600 hover:border-slate-300'
                }`}
              >
                Trailing
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={removeWhitespace}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-slate-500 to-gray-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Remove Whitespace
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
