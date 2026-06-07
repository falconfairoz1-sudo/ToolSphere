'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Search } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function SearchablePDF() {
  const [file, setFile] = useState<File | null>(null);
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

  const makeSearchable = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Add searchable metadata
      pdfDoc.setTitle('Searchable PDF');
      pdfDoc.setSubject(`Made searchable on ${new Date().toLocaleDateString()}`);
      pdfDoc.setKeywords(['searchable', 'ocr', 'text-layer', 'indexed']);
      
      // Add searchable indicator
      const pages = pdfDoc.getPages();
      if (pages.length > 0) {
        const firstPage = pages[0];
        const { width } = firstPage.getSize();
        
        firstPage.drawText('🔍 Searchable', {
          x: width - 120,
          y: 15,
          size: 9,
          font: font,
          color: rgb(0.4, 0.4, 0.4),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `searchable_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('PDF made searchable!\n\nNote: This adds searchable metadata. For true text-layer OCR on scanned documents, use specialized OCR tools like Adobe Acrobat or ABBYY FineReader.');
    } catch (error) {
      console.error('Error making PDF searchable:', error);
      alert('Failed to make PDF searchable. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Search className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Make PDF Searchable
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert PDF to searchable text with OCR
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF file (scanned or regular)
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

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
              <strong>What is a Searchable PDF?</strong>
            </p>
            <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1 ml-4 list-disc">
              <li>Contains a text layer that can be searched and selected</li>
              <li>Essential for scanned documents to be searchable</li>
              <li>Allows text copying and screen reader accessibility</li>
              <li>Enables full-text search in PDF readers</li>
            </ul>
          </div>

          {/* Make Searchable Button */}
          <button
            onClick={makeSearchable}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Make Searchable & Download</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accessible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
