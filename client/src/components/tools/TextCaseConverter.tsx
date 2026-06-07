'use client';

import { useState } from 'react';
import { Type, Copy } from 'lucide-react';

export default function TextCaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const convert = (type: string) => {
    let result = '';
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        break;
      case 'camel':
        result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');
        break;
      case 'snake':
        result = input.toLowerCase().replace(/\s+/g, '_');
        break;
      case 'kebab':
        result = input.toLowerCase().replace(/\s+/g, '-');
        break;
    }
    return result;
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const cases = [
    { id: 'upper', name: 'UPPERCASE', example: 'HELLO WORLD' },
    { id: 'lower', name: 'lowercase', example: 'hello world' },
    { id: 'title', name: 'Title Case', example: 'Hello World' },
    { id: 'sentence', name: 'Sentence case', example: 'Hello world' },
    { id: 'camel', name: 'camelCase', example: 'helloWorld' },
    { id: 'snake', name: 'snake_case', example: 'hello_world' },
    { id: 'kebab', name: 'kebab-case', example: 'hello-world' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Type className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Text Case Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert text to different cases
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          />
        </div>

        {/* Results */}
        <div className="space-y-3">
          {cases.map((caseType) => {
            const result = convert(caseType.id);
            return (
              <div
                key={caseType.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {caseType.name}
                  </p>
                  <p className="text-gray-900 dark:text-white font-mono">
                    {result || caseType.example}
                  </p>
                </div>
                {result && (
                  <button
                    onClick={() => copyText(result, caseType.id)}
                    className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied === caseType.id ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
