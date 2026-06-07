'use client';

import { useState } from 'react';
import { Upload, FileText, Download, AlignVerticalJustifyCenter } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PDFHeaderFooter() {
  const [file, setFile] = useState<File | null>(null);
  const [headerText, setHeaderText] = useState('');
  const [footerText, setFooterText] = useState('');
  const [addPageNumbers, setAddPageNumbers] = useState(true);
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

  const addHeaderFooter = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    if (!headerText && !footerText && !addPageNumbers) {
      alert('Please enter header or footer text, or enable page numbers');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        
        // Add header
        if (headerText) {
          page.drawText(headerText, {
            x: 50,
            y: height - 30,
            size: 10,
            font: font,
            color: rgb(0.3, 0.3, 0.3),
          });
        }
        
        // Add footer
        if (footerText) {
          page.drawText(footerText, {
            x: 50,
            y: 20,
            size: 10,
            font: font,
            color: rgb(0.3, 0.3, 0.3),
          });
        }
        
        // Add page numbers
        if (addPageNumbers) {
          const pageNumber = `Page ${index + 1} of ${pages.length}`;
          const textWidth = font.widthOfTextAtSize(pageNumber, 10);
          page.drawText(pageNumber, {
            x: width - textWidth - 50,
            y: 20,
            size: 10,
            font: font,
            color: rgb(0.3, 0.3, 0.3),
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `header_footer_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Header and footer added successfully!');
    } catch (error) {
      console.error('Error adding header/footer:', error);
      alert('Failed to add header/footer. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <AlignVerticalJustifyCenter className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add Header/Footer to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add custom headers and footers to your PDF documents
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition">
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
                <FileText className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Header Text (Optional)
            </label>
            <input
              type="text"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              placeholder="Enter header text (e.g., Company Name)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Footer Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Footer Text (Optional)
            </label>
            <input
              type="text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="Enter footer text (e.g., Confidential)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Page Numbers Option */}
          <div className="mb-6">
            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={addPageNumbers}
                onChange={(e) => setAddPageNumbers(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">Add Page Numbers</p>
                <p className="text-sm text-gray-500">Add "Page X of Y" in footer</p>
              </div>
            </label>
          </div>

          {/* Add Button */}
          <button
            onClick={addHeaderFooter}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Add Header/Footer & Download</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Professional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
