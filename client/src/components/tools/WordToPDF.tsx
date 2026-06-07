'use client';

import { useState } from 'react';
import { FileText, Upload, Download, RefreshCw } from 'lucide-react';

export default function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.doc') || selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
        setConverted(false);
      } else {
        alert('Please select a Word document (.doc or .docx)');
      }
    }
  };

  const handleConvert = () => {
    if (!file) return;
    
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setConverted(true);
    }, 2500);
  };

  const handleDownload = () => {
    alert('In production, this would download the converted PDF file.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <FileText className="w-16 h-16 text-blue-600" />
            <RefreshCw className="w-8 h-8 text-gray-400" />
            <FileText className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Word to PDF Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert Word documents (DOC, DOCX) to PDF format
          </p>
        </div>

        <div className="mb-6">
          <label className="block w-full">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 transition cursor-pointer bg-gray-50 dark:bg-gray-700/50">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {file ? file.name : 'Click to upload Word document'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports .doc and .docx files
              </p>
              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {file && !converted && (
          <>
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

            <button
              onClick={handleConvert}
              disabled={converting}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {converting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Converting to PDF...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  <span>Convert to PDF</span>
                </>
              )}
            </button>
          </>
        )}

        {converted && (
          <div className="space-y-4">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Conversion Complete!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your Word document has been converted to PDF
              </p>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setConverted(false);
              }}
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Convert Another File
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is a demo interface. In production, Word to PDF conversion would use services like LibreOffice, Microsoft Office API, or cloud conversion services.
          </p>
        </div>
      </div>
    </div>
  );
}
