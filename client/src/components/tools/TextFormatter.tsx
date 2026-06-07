'use client';

import { useState } from 'react';
import { Type, Copy } from 'lucide-react';

export default function TextFormatter() {
  const [text, setText] = useState('');

  const formatText = (type: string) => {
    let formatted = text;
    switch (type) {
      case 'uppercase':
        formatted = text.toUpperCase();
        break;
      case 'lowercase':
        formatted = text.toLowerCase();
        break;
      case 'capitalize':
        formatted = text.replace(/\b\w/g, l => l.toUpperCase());
        break;
      case 'sentence':
        formatted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, l => l.toUpperCase());
        break;
      case 'reverse':
        formatted = text.split('').reverse().join('');
        break;
      case 'remove-spaces':
        formatted = text.replace(/\s+/g, '');
        break;
      case 'remove-extra-spaces':
        formatted = text.replace(/\s+/g, ' ').trim();
        break;
      case 'add-line-numbers':
        formatted = text.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
        break;
    }
    setText(formatted);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg">
            <Type className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Text Formatter</h1>
            <p className="text-gray-600 dark:text-gray-400">Format and transform your text</p>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-4"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button onClick={() => formatText('uppercase')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm">
            UPPERCASE
          </button>
          <button onClick={() => formatText('lowercase')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
            lowercase
          </button>
          <button onClick={() => formatText('capitalize')} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm">
            Capitalize
          </button>
          <button onClick={() => formatText('sentence')} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-sm">
            Sentence case
          </button>
          <button onClick={() => formatText('reverse')} className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm">
            Reverse
          </button>
          <button onClick={() => formatText('remove-spaces')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm">
            Remove Spaces
          </button>
          <button onClick={() => formatText('remove-extra-spaces')} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm">
            Trim Spaces
          </button>
          <button onClick={() => formatText('add-line-numbers')} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
            Line Numbers
          </button>
        </div>

        <button
          onClick={copyText}
          disabled={!text}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          <Copy className="w-5 h-5" />
          <span>Copy to Clipboard</span>
        </button>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{text.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Characters</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{text.trim().split(/\s+/).filter(w => w).length}</div>
              <div className="text-gray-600 dark:text-gray-400">Words</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{text.split('\n').length}</div>
              <div className="text-gray-600 dark:text-gray-400">Lines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
