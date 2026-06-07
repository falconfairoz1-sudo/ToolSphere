'use client';

import { useState } from 'react';
import { Upload, FileText, Copy, Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFTextExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setExtractedText('');
    }
  };

  const extractText = async () => {
    if (!file) return;

    setProcessing(true);

    try {
      // Note: pdf-lib doesn't support text extraction
      // This is a placeholder - in production, you'd use pdf.js or similar
      setExtractedText('Text extraction requires additional libraries like pdf.js.\n\nFor now, you can use these recommended services:\n\n1. Adobe Acrobat Online\n2. PDFtoText.com\n3. iLovePDF Text Extractor\n\nThis feature will be fully implemented in a future update.');
    } catch (error) {
      console.error('Error extracting text:', error);
      alert('Failed to extract text. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted_text.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Text Extractor
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Extract text content from PDF files
            </p>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload PDF</span>
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {file && (
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-green-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>

              {!extractedText && (
                <button
                  onClick={extractText}
                  disabled={processing}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition mb-4"
                >
                  {processing ? 'Extracting...' : 'Extract Text'}
                </button>
              )}

              {extractedText && (
                <>
                  <textarea
                    value={extractedText}
                    readOnly
                    className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={copyText}
                      className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                    >
                      <Copy className="w-5 h-5" />
                      <span>Copy Text</span>
                    </button>
                    <button
                      onClick={downloadText}
                      className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download TXT</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
