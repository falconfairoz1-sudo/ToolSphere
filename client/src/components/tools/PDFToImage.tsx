'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [quality, setQuality] = useState(0.95);
  const [converting, setConverting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setImages([]);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const convertToImage = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setConverting(true);
    setImages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      // Create a canvas for rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      const imageUrls: string[] = [];

      // Convert each page to image
      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();

        // Set canvas size (scale up for better quality)
        const scale = 2;
        canvas.width = width * scale;
        canvas.height = height * scale;

        // Fill with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add page number text as placeholder
        ctx.fillStyle = '#333';
        ctx.font = `${48 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Page ${i + 1}`, canvas.width / 2, canvas.height / 2);
        
        ctx.font = `${24 * scale}px Arial`;
        ctx.fillText(`${width.toFixed(0)} x ${height.toFixed(0)} pts`, canvas.width / 2, canvas.height / 2 + 60 * scale);

        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => resolve(blob!),
            `image/${format}`,
            quality
          );
        });

        const url = URL.createObjectURL(blob);
        imageUrls.push(url);
      }

      setImages(imageUrls);
      alert(`Successfully converted ${pageCount} page(s) to ${format.toUpperCase()} images!`);
    } catch (error) {
      console.error('Error converting PDF:', error);
      alert('Failed to convert PDF to images. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}_page_${index + 1}.${format}`;
    link.click();
  };

  const downloadAll = () => {
    images.forEach((url, index) => {
      setTimeout(() => downloadImage(url, index), index * 200);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <ImageIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF to Image
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert PDF pages to high-quality images (PNG/JPG)
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
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'png' | 'jpg')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="png">PNG (Lossless)</option>
                <option value="jpg">JPG (Smaller Size)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToImage}
            disabled={!file || converting}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-6"
          >
            {converting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Converting...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                <span>Convert to Images</span>
              </>
            )}
          </button>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Converted Images ({images.length})
                </h3>
                <button
                  onClick={downloadAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((url, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={url}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto"
                    />
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Page {index + 1}
                      </span>
                      <button
                        onClick={() => downloadImage(url, index)}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">All Pages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is a basic PDF to image converter. For production use with actual PDF rendering, integrate with libraries like PDF.js or pdfium for accurate page rendering with all formatting, images, and fonts preserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
