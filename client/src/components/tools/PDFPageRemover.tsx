'use client';

import { useState } from 'react';
import { Upload, FileText, X, Download, Trash2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFPageRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesToRemove, setPagesToRemove] = useState<Set<number>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPagesToRemove(new Set());
      
      // Load PDF to get page count
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
        
        // Create preview URL
        const url = URL.createObjectURL(selectedFile);
        setPdfPreview(url);
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF. Please try again.');
      }
    }
  };

  const togglePage = (pageNum: number) => {
    const newSet = new Set(pagesToRemove);
    if (newSet.has(pageNum)) {
      newSet.delete(pageNum);
    } else {
      newSet.add(pageNum);
    }
    setPagesToRemove(newSet);
  };

  const selectAll = () => {
    const allPages = new Set<number>();
    for (let i = 1; i <= totalPages; i++) {
      allPages.add(i);
    }
    setPagesToRemove(allPages);
  };

  const deselectAll = () => {
    setPagesToRemove(new Set());
  };

  const removePages = async () => {
    if (!file || pagesToRemove.size === 0) {
      alert('Please select pages to remove');
      return;
    }

    if (pagesToRemove.size === totalPages) {
      alert('Cannot remove all pages. At least one page must remain.');
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Copy pages that are NOT in the remove list
      for (let i = 0; i < totalPages; i++) {
        const pageNum = i + 1;
        if (!pagesToRemove.has(pageNum)) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_removed_pages.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      alert(`Successfully removed ${pagesToRemove.size} page(s)!`);
    } catch (error) {
      console.error('Error removing pages:', error);
      alert('Failed to remove pages. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setTotalPages(0);
    setPagesToRemove(new Set());
    if (pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
      setPdfPreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Trash2 className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Page Remover
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Remove specific pages from your PDF document
            </p>
          </div>

          {/* Upload Area */}
          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF files only
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

          {/* File Info */}
          {file && (
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {totalPages} pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Page Selection Info */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected: <span className="font-bold text-red-600">{pagesToRemove.size}</span> page(s) to remove
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={selectAll}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAll}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              {/* Page Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 mb-6 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => togglePage(pageNum)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      pagesToRemove.has(pageNum)
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-center">
                      <FileText className={`w-8 h-8 mx-auto mb-1 ${
                        pagesToRemove.has(pageNum) ? 'text-red-600' : 'text-gray-400'
                      }`} />
                      <p className={`text-xs font-semibold ${
                        pagesToRemove.has(pageNum) ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        Page {pageNum}
                      </p>
                    </div>
                    {pagesToRemove.has(pageNum) && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={removePages}
                  disabled={processing || pagesToRemove.size === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      <span>Remove Selected Pages</span>
                    </>
                  )}
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Upload New PDF
                </button>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">No Limits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
