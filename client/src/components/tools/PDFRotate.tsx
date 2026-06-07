'use client';

import { useState } from 'react';
import { Upload, FileText, RotateCw, Download, X } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';

export default function PDFRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setRotations({});
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdf.getPageCount());
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Failed to load PDF. Please try again.');
      }
    }
  };

  const rotatePage = (pageNum: number) => {
    setRotations(prev => ({
      ...prev,
      [pageNum]: ((prev[pageNum] || 0) + 90) % 360
    }));
  };

  const rotateAll = () => {
    const newRotations: Record<number, number> = {};
    for (let i = 1; i <= totalPages; i++) {
      newRotations[i] = ((rotations[i] || 0) + 90) % 360;
    }
    setRotations(newRotations);
  };

  const resetRotations = () => {
    setRotations({});
  };

  const applyRotations = async () => {
    if (!file) return;

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const pageNum = index + 1;
        const rotation = rotations[pageNum] || 0;
        if (rotation > 0) {
          page.setRotation(degrees(rotation));
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_rotated.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      alert('PDF rotated successfully!');
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Failed to rotate PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setTotalPages(0);
    setRotations({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <RotateCw className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Rotate
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Rotate PDF pages individually or all at once
            </p>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
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
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {totalPages} pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button onClick={reset} className="text-red-500 hover:text-red-700 transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click on pages to rotate them 90° clockwise
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={rotateAll}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Rotate All
                  </button>
                  <button
                    onClick={resetRotations}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-6 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => rotatePage(pageNum)}
                    className="relative p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-all"
                  >
                    <div
                      className="text-center transition-transform duration-300"
                      style={{ transform: `rotate(${rotations[pageNum] || 0}deg)` }}
                    >
                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Page {pageNum}
                      </p>
                    </div>
                    {rotations[pageNum] > 0 && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {rotations[pageNum]}°
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={applyRotations}
                  disabled={processing || Object.keys(rotations).length === 0}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Rotated PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">No Limits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
