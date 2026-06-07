'use client';

import { useState } from 'react';
import { Code, Copy, Check, Download, Upload, FileCode } from 'lucide-react';

export default function XMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatXML = (xml: string): string => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;

    xml = xml.replace(reg, '$1\n$2$3');
    xml.split('\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      formatted += PADDING.repeat(pad) + node + '\n';
      pad += indent;
    });

    return formatted.trim();
  };

  const handleFormat = () => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter XML to format');
        return;
      }

      // Basic XML validation
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      const parseError = xmlDoc.querySelector('parsererror');

      if (parseError) {
        setError('Invalid XML: ' + parseError.textContent);
        return;
      }

      const formatted = formatXML(input);
      setOutput(formatted);
    } catch (err: any) {
      setError('Error formatting XML: ' + err.message);
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      const minified = input.replace(/>\s+</g, '><').trim();
      setOutput(minified);
    } catch (err: any) {
      setError('Error minifying XML: ' + err.message);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInput(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileCode className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">XML Formatter</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Format, validate, and beautify your XML data</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Input XML</h2>
              <label className="cursor-pointer px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload</span>
                <input type="file" accept=".xml" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your XML here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleFormat}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Code className="w-5 h-5" />
                Format
              </button>
              <button
                onClick={handleMinify}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Minify
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Formatted XML</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <textarea
              value={output}
              readOnly
              placeholder="Formatted XML will appear here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Format & Beautify</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically indent and format XML for better readability
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCode className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Validate XML</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check for syntax errors and validate XML structure
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Minify & Export</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compress XML and download formatted files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
