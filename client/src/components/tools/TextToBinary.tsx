'use client';

import { useState } from 'react';
import { Binary, Copy, Check } from 'lucide-react';

export default function TextToBinary() {
  const [input, setInput] = useState('');
  const [binary, setBinary] = useState('');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const textToBinary = () => {
    const result = input
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
    setBinary(result);
  };

  const binaryToText = () => {
    try {
      const result = input
        .split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
      setText(result);
    } catch (error) {
      setText('Invalid binary input');
    }
  };

  const copyResult = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
              <Binary className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Text to Binary Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert text to binary and vice versa</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or binary (space-separated)..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none font-mono text-sm"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={textToBinary}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Text → Binary
            </button>
            <button
              onClick={binaryToText}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Binary → Text
            </button>
          </div>
        </div>

        {binary && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Binary Output</h3>
              <button
                onClick={() => copyResult(binary, 'binary')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all flex items-center gap-2"
              >
                {copied === 'binary' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'binary' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800 break-all">
              {binary}
            </div>
          </div>
        )}

        {text && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Text Output</h3>
              <button
                onClick={() => copyResult(text, 'text')}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all flex items-center gap-2"
              >
                {copied === 'text' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'text' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800 break-all">
              {text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
