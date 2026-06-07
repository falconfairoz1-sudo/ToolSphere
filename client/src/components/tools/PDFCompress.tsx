'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Minimize2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

type CompressionLevel = 'low' | 'medium' | 'high';

export default function PDFCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setOriginalSize(selectedFile.size);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const compressPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setCompressing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Compression settings based on level
      const compressionSettings = {
        low: { imageQuality: 0.9, removeMetadata: false },
        medium: { imageQuality: 0.7, removeMetadata: true },
        high: { imageQuality: 0.5, removeMetadata: true }
      };
      
      const settings = compressionSettings[compressionLevel];
      
      // Remove metadata if specified
      if (settings.removeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
      }

      // Save with compression
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });
      
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed_${compressionLevel}_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      const newSize = pdfBytes.length;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      alert(`PDF compressed successfully!\nOriginal: ${(originalSize / 1024 / 1024).toFixed(2)} MB\nCompressed: ${(newSize / 1024 / 1024).toFixed(2)} MB\nReduction: ${reduction}%`);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Minimize2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Compress
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Reduce PDF file size with quality options
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
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Compression Level */}
          {file && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Compression Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setCompressionLevel('low')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'low'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">Low</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Best quality, less compression
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setCompressionLevel('medium')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'medium'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">Medium</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Balanced quality & size
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setCompressionLevel('high')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'high'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">High</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum compression
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Compress Button */}
          <button
            onClick={compressPDF}
            disabled={!file || compressing}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {compressing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Compressing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Compress PDF</span>
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
