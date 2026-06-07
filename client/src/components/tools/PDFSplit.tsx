'use client';

import { useState } from 'react';
import { FileText, Upload, Scissors, Download } from 'lucide-react';

export default function PDFSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages');
  const [pageNumbers, setPageNumbers] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleSplit = () => {
    if (!file) return;
    
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      alert('PDF split successfully! In production, this would download the split files.');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Scissors className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Split
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Split PDF into separate pages or ranges
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-6">
          <label className="block w-full">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 transition cursor-pointer bg-gray-50 dark:bg-gray-700/50">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {file ? file.name : 'Click to upload PDF'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                or drag and drop your PDF file here
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {file && (
          <>
            {/* Split Mode */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Split Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSplitMode('pages')}
                  className={`p-4 rounded-lg border-2 transition ${
                    splitMode === 'pages'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <FileText className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">All Pages</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Split into individual pages</p>
                </button>
                <button
                  onClick={() => setSplitMode('range')}
                  className={`p-4 rounded-lg border-2 transition ${
                    splitMode === 'range'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Scissors className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">Page Range</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Split by specific pages</p>
                </button>
              </div>
            </div>

            {/* Page Range Input */}
            {splitMode === 'range' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Numbers (e.g., 1,3,5-7)
                </label>
                <input
                  type="text"
                  value={pageNumbers}
                  onChange={(e) => setPageNumbers(e.target.value)}
                  placeholder="1,3,5-7"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Enter page numbers separated by commas, or use ranges (e.g., 1-5)
                </p>
              </div>
            )}

            {/* File Info */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Split Button */}
            <button
              onClick={handleSplit}
              disabled={processing || (splitMode === 'range' && !pageNumbers)}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Splitting PDF...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>Split PDF</span>
                </>
              )}
            </button>
          </>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl mb-1">🔒</p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Secure</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl mb-1">⚡</p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Fast</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-2xl mb-1">🆓</p>
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Free</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is a demo interface. In production, PDF splitting would be processed server-side using libraries like pdf-lib or PyPDF2.
          </p>
        </div>
      </div>
    </div>
  );
}
