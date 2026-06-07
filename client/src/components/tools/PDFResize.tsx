'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Maximize2 } from 'lucide-react';
import { PDFDocument, PageSizes } from 'pdf-lib';

type PageSize = 'A4' | 'Letter' | 'Legal' | 'A3' | 'A5' | 'Custom';

export default function PDFResize() {
  const [file, setFile] = useState<File | null>(null);
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [customWidth, setCustomWidth] = useState(595);
  const [customHeight, setCustomHeight] = useState(842);
  const [processing, setProcessing] = useState(false);

  const pageSizes = {
    A4: PageSizes.A4,
    Letter: PageSizes.Letter,
    Legal: PageSizes.Legal,
    A3: PageSizes.A3,
    A5: PageSizes.A5,
  };

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

  const resizePDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdfDoc = await PDFDocument.create();
      
      const pages = pdfDoc.getPages();
      const targetSize = pageSize === 'Custom' 
        ? [customWidth, customHeight] as [number, number]
        : pageSizes[pageSize];
      
      for (const page of pages) {
        const [embeddedPage] = await newPdfDoc.embedPdf(pdfDoc, [pages.indexOf(page)]);
        const newPage = newPdfDoc.addPage(targetSize);
        
        const { width: oldWidth, height: oldHeight } = page.getSize();
        const [newWidth, newHeight] = targetSize;
        
        // Calculate scaling to fit
        const scaleX = newWidth / oldWidth;
        const scaleY = newHeight / oldHeight;
        const scale = Math.min(scaleX, scaleY);
        
        const scaledWidth = oldWidth * scale;
        const scaledHeight = oldHeight * scale;
        
        // Center the content
        const x = (newWidth - scaledWidth) / 2;
        const y = (newHeight - scaledHeight) / 2;
        
        newPage.drawPage(embeddedPage, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `resized_${pageSize}_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`PDF resized to ${pageSize} successfully!`);
    } catch (error) {
      console.error('Error resizing PDF:', error);
      alert('Failed to resize PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Maximize2 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Resize PDF Pages
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Resize PDF pages to different dimensions
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
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

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Page Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Target Page Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(['A4', 'Letter', 'Legal', 'A3', 'A5', 'Custom'] as PageSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setPageSize(size)}
                  className={`p-4 rounded-lg border-2 transition ${
                    pageSize === size
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{size}</p>
                  {size !== 'Custom' && (
                    <p className="text-xs text-gray-500 mt-1">
                      {size === 'A4' && '210 × 297 mm'}
                      {size === 'Letter' && '8.5 × 11 in'}
                      {size === 'Legal' && '8.5 × 14 in'}
                      {size === 'A3' && '297 × 420 mm'}
                      {size === 'A5' && '148 × 210 mm'}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          {pageSize === 'Custom' && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Width (points)
                </label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (points)
                </label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Resize Button */}
          <button
            onClick={resizePDF}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Resizing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Resize & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
