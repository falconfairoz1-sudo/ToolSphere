'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Download, X, CheckCircle, Loader2, Settings, Presentation } from 'lucide-react';

interface ConversionSettings {
  quality: 'high' | 'medium' | 'low';
  includeNotes: boolean;
  includeHiddenSlides: boolean;
  pageRange: 'all' | 'custom';
  customRange: string;
}

const PowerPointToPDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConversionSettings>({
    quality: 'high',
    includeNotes: false,
    includeHiddenSlides: false,
    pageRange: 'all',
    customRange: '',
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.name.endsWith('.pptx') || file.name.endsWith('.ppt')
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    setConverting(true);
    // Simulate conversion
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConverted(files.map((f) => f.name.replace(/\.(pptx?|ppt)$/i, '.pdf')));
    setConverting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Presentation className="w-12 h-12 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              PowerPoint to PDF
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Convert PowerPoint presentations to PDF format
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-3 border-dashed border-orange-300 rounded-xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer bg-orange-50/50"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".ppt,.pptx"
              multiple
              onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drop PowerPoint files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse (.ppt, .pptx)
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all">
                Select Files
              </button>
            </label>
          </div>

          {/* Settings Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {showSettings ? 'Hide' : 'Show'} Settings
            </button>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gray-50 rounded-xl"
              >
                <h3 className="font-bold text-gray-800 mb-4">Conversion Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF Quality
                    </label>
                    <select
                      value={settings.quality}
                      onChange={(e) => setSettings({ ...settings, quality: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="high">High Quality</option>
                      <option value="medium">Medium Quality</option>
                      <option value="low">Low Quality (Smaller File)</option>
                    </select>
                  </div>

                  {/* Page Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slides to Convert
                    </label>
                    <select
                      value={settings.pageRange}
                      onChange={(e) => setSettings({ ...settings, pageRange: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="all">All Slides</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  {/* Custom Range */}
                  {settings.pageRange === 'custom' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slide Range (e.g., 1-5, 8, 10-12)
                      </label>
                      <input
                        type="text"
                        value={settings.customRange}
                        onChange={(e) => setSettings({ ...settings, customRange: e.target.value })}
                        placeholder="1-5, 8, 10-12"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Checkboxes */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.includeNotes}
                        onChange={(e) => setSettings({ ...settings, includeNotes: e.target.checked })}
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">Include speaker notes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.includeHiddenSlides}
                        onChange={(e) => setSettings({ ...settings, includeHiddenSlides: e.target.checked })}
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">Include hidden slides</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* File List */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Files to Convert ({files.length})
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-8 h-8 text-orange-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  {converted.includes(file.name.replace(/\.(pptx?|ppt)$/i, '.pdf')) ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Convert Button */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleConvert}
                disabled={converting || files.length === 0}
                className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {converting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <FileText className="w-6 h-6" />
                    Convert to PDF
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Download Section */}
        {converted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Conversion Complete!
              </h3>
              <p className="text-gray-600">
                {converted.length} file{converted.length > 1 ? 's' : ''} converted successfully
              </p>
            </div>

            <div className="space-y-3">
              {converted.map((filename, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <span className="font-medium text-gray-800">{filename}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Download All as ZIP
            </button>
          </motion.div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">High Quality</h3>
            <p className="text-sm text-gray-600">
              Preserve formatting and quality
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Customizable</h3>
            <p className="text-sm text-gray-600">
              Control quality and slide range
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Fast Conversion</h3>
            <p className="text-sm text-gray-600">
              Convert multiple files quickly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerPointToPDF;
