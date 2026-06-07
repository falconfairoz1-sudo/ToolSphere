'use client';

import { useState } from 'react';
import { Braces, Copy, Download } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Braces className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            JSON Formatter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Format, validate, and minify JSON data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input JSON
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "John", "age": 30}'
              className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
            />
            <div className="flex space-x-3 mt-3">
              <button
                onClick={formatJSON}
                className="flex-1 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition"
              >
                Format
              </button>
              <button
                onClick={minifyJSON}
                className="flex-1 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Minify
              </button>
            </div>
          </div>

          {/* Output */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Output
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="w-full h-96 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
            {output && (
              <div className="flex space-x-3 mt-3">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={downloadJSON}
                  className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Validate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Format</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Minify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
