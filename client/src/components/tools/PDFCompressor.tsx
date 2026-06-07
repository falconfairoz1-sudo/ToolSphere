'use client';

import { useState } from 'react';
import { FileText, Upload, Download, Minimize2 } from 'lucide-react';

export default function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [compressing, setCompressing] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setOriginalSize(selectedFile.size);
        setCompressed(false);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleCompress = () => {
    if (!file) return;
    
    setCompressing(true);
    setTimeout(() => {
      // Simulate compression
      const reductionRate = compressionLevel === 'low' ? 0.8 : compressionLevel === 'medium' ? 0.6 : 0.4;
      setCompressedSize(Math.floor(originalSize * reductionRate));
      setCompressing(false);
      setCompressed(true);
    }, 2500);
  };

  const compressionPercentage = compressed ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Minimize2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Compressor
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Reduce PDF file size while maintaining quality
          </p>
        </div>

        <div className="mb-6">
          <label className="block w-full">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 transition cursor-pointer bg-gray-50 dark:bg-gray-700/50">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {file ? file.name : 'Click to upload PDF'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                or drag and drop your PDF file here
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {file && !compressed && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Compression Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setCompressionLevel('low')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'low'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">Low</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Best quality</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">~20% smaller</p>
                </button>
                <button
                  onClick={() => setCompressionLevel('medium')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'medium'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">Medium</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Balanced</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">~40% smaller</p>
                </button>
                <button
                  onClick={() => setCompressionLevel('high')}
                  className={`p-4 rounded-lg border-2 transition ${
                    compressionLevel === 'high'
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <p className="font-semibold text-gray-900 dark:text-white">High</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Smallest size</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">~60% smaller</p>
                </button>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={compressing}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {compressing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compressing PDF...</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-5 h-5" />
                  <span>Compress PDF</span>
                </>
              )}
            </button>
          </>
        )}

        {compressed && (
          <div className="space-y-4">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Compression Complete!
                </h3>
                <p className="text-3xl font-black text-green-600 mb-2">
                  {compressionPercentage}% Smaller
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Size</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(originalSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compressed Size</p>
                  <p className="text-xl font-bold text-green-600">
                    {(compressedSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert('In production, this would download the compressed PDF.')}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition inline-flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Compressed PDF</span>
              </button>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setCompressed(false);
              }}
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Compress Another File
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is a demo interface. In production, PDF compression would use tools like Ghostscript, PyPDF2, or cloud services like Adobe PDF Services.
          </p>
        </div>
      </div>
    </div>
  );
}
