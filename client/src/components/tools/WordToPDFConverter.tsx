'use client';

import { useState } from 'react';
import { Upload, FileText, Download, X, Info } from 'lucide-react';

export default function WordToPDFConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || selectedFile.type === 'application/msword')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid Word document (.docx or .doc)');
    }
  };

  const convertToPDF = () => {
    if (!file) return;
    
    setConverting(true);
    
    // Simulate conversion (in production, you'd use a library or API)
    setTimeout(() => {
      alert('Word to PDF conversion requires a backend service or library like docx-pdf, pdf-lib with docx parsing, or cloud APIs like CloudConvert.\n\nFor now, you can:\n1. Open the Word file\n2. Use "Save As" or "Export"\n3. Choose PDF format\n\nOr use online services like:\n- smallpdf.com\n- ilovepdf.com\n- adobe.com');
      setConverting(false);
    }, 1000);
  };

  const reset = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Word to PDF Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert DOCX files to PDF format
            </p>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start space-x-3">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">Note:</p>
              <p>Full Word to PDF conversion requires backend processing. For now, use Microsoft Word's "Save As PDF" feature or online converters like smallpdf.com or ilovepdf.com</p>
            </div>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Word documents (.docx, .doc)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {file && (
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button onClick={reset} className="text-red-500 hover:text-red-700 transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={convertToPDF}
                disabled={converting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
              >
                {converting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
              <strong>💡 Recommended Free Converters:</strong>
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li><a href="https://www.ilovepdf.com/word_to_pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">iLovePDF - Word to PDF</a></li>
              <li><a href="https://smallpdf.com/word-to-pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Smallpdf - Word to PDF</a></li>
              <li><a href="https://www.adobe.com/acrobat/online/word-to-pdf.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Adobe - Word to PDF</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
