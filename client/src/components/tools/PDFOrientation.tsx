'use client';

import { useState } from 'react';
import { Upload, FileText, Download, RotateCw } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';

type Orientation = 'portrait' | 'landscape' | 'auto';

export default function PDFOrientation() {
  const [file, setFile] = useState<File | null>(null);
  const [orientation, setOrientation] = useState<Orientation>('portrait');
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

  const changeOrientation = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const isPortrait = height > width;
        const isLandscape = width > height;
        
        if (orientation === 'portrait' && isLandscape) {
          // Rotate 90 degrees to make portrait
          page.setRotation(degrees(90));
        } else if (orientation === 'landscape' && isPortrait) {
          // Rotate 90 degrees to make landscape
          page.setRotation(degrees(90));
        } else if (orientation === 'auto') {
          // Keep current orientation
          // No rotation needed
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${orientation}_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`PDF orientation changed to ${orientation} successfully!`);
    } catch (error) {
      console.error('Error changing orientation:', error);
      alert('Failed to change orientation. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <RotateCw className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Change PDF Orientation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Change PDF orientation between Portrait and Landscape
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-teal-500 transition">
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
                <FileText className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Orientation Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Target Orientation
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setOrientation('portrait')}
                className={`p-6 rounded-lg border-2 transition ${
                  orientation === 'portrait'
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-16 mx-auto mb-2 border-2 border-gray-400 rounded"></div>
                  <p className="font-semibold text-gray-900 dark:text-white">Portrait</p>
                  <p className="text-xs text-gray-500 mt-1">Vertical</p>
                </div>
              </button>
              
              <button
                onClick={() => setOrientation('landscape')}
                className={`p-6 rounded-lg border-2 transition ${
                  orientation === 'landscape'
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-12 mx-auto mb-2 border-2 border-gray-400 rounded"></div>
                  <p className="font-semibold text-gray-900 dark:text-white">Landscape</p>
                  <p className="text-xs text-gray-500 mt-1">Horizontal</p>
                </div>
              </button>
              
              <button
                onClick={() => setOrientation('auto')}
                className={`p-6 rounded-lg border-2 transition ${
                  orientation === 'auto'
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🔄</div>
                  <p className="font-semibold text-gray-900 dark:text-white">Auto</p>
                  <p className="text-xs text-gray-500 mt-1">Keep current</p>
                </div>
              </button>
            </div>
          </div>

          {/* Change Button */}
          <button
            onClick={changeOrientation}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Change Orientation & Download</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-teal-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-teal-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
