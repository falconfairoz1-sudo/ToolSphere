'use client';

import { useState } from 'react';
import { Upload, FileText, Download, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PageInfo {
  index: number;
  originalIndex: number;
}

export default function PDFRearrange() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [rearranging, setRearranging] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        
        // Get page count and create page array
        try {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const pageCount = pdf.getPageCount();
          const pageArray: PageInfo[] = Array.from({ length: pageCount }, (_, i) => ({
            index: i,
            originalIndex: i + 1
          }));
          setPages(pageArray);
        } catch (error) {
          console.error('Error loading PDF:', error);
          alert('Failed to load PDF');
        }
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    const newPages = [...pages];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < pages.length) {
      [newPages[index], newPages[newIndex]] = [newPages[newIndex], newPages[index]];
      setPages(newPages);
    }
  };

  const moveToPosition = (fromIndex: number, toPosition: number) => {
    if (toPosition < 1 || toPosition > pages.length) {
      alert(`Position must be between 1 and ${pages.length}`);
      return;
    }
    
    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toPosition - 1, 0, movedPage);
    setPages(newPages);
  };

  const rearrangePDF = async () => {
    if (!file || pages.length === 0) {
      alert('Please select a PDF file');
      return;
    }

    setRearranging(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const newPdf = await PDFDocument.create();
      const pageIndices = pages.map(p => p.index);
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `rearranged_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('PDF pages rearranged successfully!');
    } catch (error) {
      console.error('Error rearranging pages:', error);
      alert('Failed to rearrange pages. Please try again.');
    } finally {
      setRearranging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <GripVertical className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Rearrange Pages
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Reorder and organize your PDF pages
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
                    Total Pages: {pages.length} | Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Page List */}
          {pages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Rearrange Pages - Use arrows to reorder
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {pages.map((page, index) => (
                  <div
                    key={`${page.originalIndex}-${index}`}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => movePage(index, 'up')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => movePage(index, 'down')}
                          disabled={index === pages.length - 1}
                          className="text-gray-400 hover:text-primary-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-900 dark:text-white block">
                          Position {index + 1} - Original Page {page.originalIndex}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          max={pages.length}
                          placeholder="Move to..."
                          className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const target = parseInt((e.target as HTMLInputElement).value);
                              moveToPosition(index, target);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Use arrow buttons or type a position number and press Enter to move pages
              </p>
            </div>
          )}

          {/* Rearrange Button */}
          <button
            onClick={rearrangePDF}
            disabled={!file || pages.length === 0 || rearranging}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {rearranging ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Rearranged PDF</span>
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
