'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Highlighter } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

export default function PDFHighlight() {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState('#FFFF00');
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

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 1, g: 1, b: 0 };
  };

  const highlightPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { height } = firstPage.getSize();
      
      const rgbColor = hexToRgb(color);
      
      // Add highlight rectangle
      firstPage.drawRectangle({
        x: 50,
        y: height - 150,
        width: 300,
        height: 25,
        color: rgb(rgbColor.r, rgbColor.g, rgbColor.b),
        opacity: 0.4,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `highlighted_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('PDF highlighted successfully!');
    } catch (error) {
      console.error('Error highlighting PDF:', error);
      alert('Failed to highlight PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const highlightColors = [
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Pink', value: '#FF69B4' },
    { name: 'Orange', value: '#FFA500' },
    { name: 'Blue', value: '#00BFFF' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Highlighter className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Highlight PDF Text
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Highlight and mark important text in your PDF
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition">
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
                <FileText className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Highlight Color
            </label>
            <div className="grid grid-cols-5 gap-3">
              {highlightColors.map((hColor) => (
                <button
                  key={hColor.value}
                  onClick={() => setColor(hColor.value)}
                  className={`p-3 rounded-lg border-2 transition ${
                    color === hColor.value
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: hColor.value }}
                >
                  <span className="text-xs font-medium text-gray-900">{hColor.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Highlight Button */}
          <button
            onClick={highlightPDF}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Add Highlight & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
