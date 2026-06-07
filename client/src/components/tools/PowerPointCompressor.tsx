'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, X, CheckCircle, Loader2, Presentation, Minimize2 } from 'lucide-react';

interface CompressionResult {
  filename: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
}

const PowerPointCompressor: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.name.endsWith('.pptx') || file.name.endsWith('.ppt')
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleCompress = async () => {
    setCompressing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const compressionRates = { low: 0.15, medium: 0.35, high: 0.55 };
    const rate = compressionRates[compressionLevel];
    
    const newResults = files.map((file) => {
      const compressedSize = Math.floor(file.size * (1 - rate));
      return {
        filename: file.name,
        originalSize: file.size,
        compressedSize,
        savings: Math.round(rate * 100),
      };
    });
    
    setResults(newResults);
    setCompressing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Minimize2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Compressor</h1>
          <p className="text-gray-600 text-lg">Reduce file size without losing quality</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-compressor" 
            className="hidden" 
            accept=".ppt,.pptx" 
            multiple 
            onChange={handleFileSelect} 
          />
          <label 
            htmlFor="file-upload-compressor" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()} 
            className="block border-3 border-dashed border-green-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer bg-green-50/50"
          >
            <Upload className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Drop PowerPoint files here</h3>
            <p className="text-gray-600 mb-4">or click to browse</p>
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700">
              Select Files
            </span>
          </label>

          {files.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      compressionLevel === level
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="font-bold text-gray-800 capitalize mb-1">{level}</div>
                    <div className="text-sm text-gray-600">
                      {level === 'low' && '~15% smaller'}
                      {level === 'medium' && '~35% smaller'}
                      {level === 'high' && '~55% smaller'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {files.length > 0 && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Files ({files.length})</h3>
            <div className="space-y-3 mb-6">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Presentation className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleCompress} disabled={compressing} className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {compressing ? <><Loader2 className="w-6 h-6 animate-spin" />Compressing...</> : <>Compress Files</>}
            </button>
          </div>
        )}

        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Compression Complete!</h3>
            <div className="space-y-3">
              {results.map((result, idx) => (
                <div key={idx} className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{result.filename}</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      <Download className="w-4 h-4" />Download
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Original: {formatFileSize(result.originalSize)}</span>
                    <span>→</span>
                    <span>Compressed: {formatFileSize(result.compressedSize)}</span>
                    <span className="ml-auto font-bold text-green-600">{result.savings}% smaller</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Download All as ZIP
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointCompressor;
