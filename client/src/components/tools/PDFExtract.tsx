'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Scissors } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFExtract() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [extracting, setExtracting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        
        // Get page count
        try {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdf.getPageCount());
        } catch (error) {
          console.error('Error loading PDF:', error);
          alert('Failed to load PDF');
        }
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const parsePageRange = (range: string, total: number): number[] => {
    const pages: Set<number> = new Set();
    const parts = range.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
        if (start && end && start <= end && start > 0 && end <= total) {
          for (let i = start; i <= end; i++) {
            pages.add(i - 1); // Convert to 0-indexed
          }
        }
      } else {
        const pageNum = parseInt(trimmed);
        if (pageNum > 0 && pageNum <= total) {
          pages.add(pageNum - 1); // Convert to 0-indexed
        }
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  const extractPages = async () => {
    if (!file || !pageRange) {
      alert('Please select a file and specify page range');
      return;
    }

    setExtracting(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pagesToExtract = parsePageRange(pageRange, totalPages);
      
      if (pagesToExtract.length === 0) {
        alert('No valid pages specified');
        setExtracting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `extracted_pages_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Pages extracted successfully!');
    } catch (error) {
      console.error('Error extracting pages:', error);
      alert('Failed to extract pages. Please check your page range.');
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Scissors className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Extract Pages
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Extract specific pages from your PDF document
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF file only
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
                <FileText className="w-6 h-6 text-primary-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Total Pages: {totalPages} | Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Page Range Input */}
          {file && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Page Range
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g., 1-3, 5, 7-9"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Enter page numbers separated by commas. Use hyphens for ranges (e.g., 1-3, 5, 7-9)
              </p>
            </div>
          )}

          {/* Extract Button */}
          <button
            onClick={extractPages}
            disabled={!file || !pageRange || extracting}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {extracting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Extracting...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Extract Pages</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">No Limits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
