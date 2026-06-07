'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Video, Download, X, CheckCircle, Loader2, Presentation, Settings } from 'lucide-react';

interface VideoSettings {
  quality: '1080p' | '720p' | '480p';
  fps: '30' | '60';
  format: 'mp4' | 'avi' | 'mov';
  includeTransitions: boolean;
  includeAnimations: boolean;
  duration: 'auto' | 'custom';
  customDuration: number;
}

const PowerPointToVideo: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<VideoSettings>({
    quality: '1080p',
    fps: '30',
    format: 'mp4',
    includeTransitions: true,
    includeAnimations: true,
    duration: 'auto',
    customDuration: 5,
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
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    setConverting(true);
    setProgress(0);
    
    // Simulate conversion progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress(i);
    }
    
    setConverted(files.map((f) => f.name.replace(/\.(pptx?|ppt)$/i, `.${settings.format}`)));
    setConverting(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              PowerPoint to Video
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Convert presentations to high-quality video files
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
            className="border-3 border-dashed border-purple-300 rounded-xl p-12 text-center hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50"
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
              <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drop PowerPoint files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse (.ppt, .pptx)
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                Select Files
              </button>
            </label>
          </div>

          {/* Settings Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {showSettings ? 'Hide' : 'Show'} Video Settings
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
                <h3 className="font-bold text-gray-800 mb-4">Video Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Quality
                    </label>
                    <select
                      value={settings.quality}
                      onChange={(e) => setSettings({ ...settings, quality: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="1080p">1080p (Full HD)</option>
                      <option value="720p">720p (HD)</option>
                      <option value="480p">480p (SD)</option>
                    </select>
                  </div>

                  {/* FPS */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frame Rate
                    </label>
                    <select
                      value={settings.fps}
                      onChange={(e) => setSettings({ ...settings, fps: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="30">30 FPS</option>
                      <option value="60">60 FPS (Smoother)</option>
                    </select>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video Format
                    </label>
                    <select
                      value={settings.format}
                      onChange={(e) => setSettings({ ...settings, format: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="mp4">MP4 (Recommended)</option>
                      <option value="avi">AVI</option>
                      <option value="mov">MOV</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slide Duration
                    </label>
                    <select
                      value={settings.duration}
                      onChange={(e) => setSettings({ ...settings, duration: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="auto">Auto (Use Timings)</option>
                      <option value="custom">Custom Duration</option>
                    </select>
                  </div>

                  {/* Custom Duration */}
                  {settings.duration === 'custom' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seconds per Slide
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={settings.customDuration}
                        onChange={(e) => setSettings({ ...settings, customDuration: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Checkboxes */}
                  <div className="md:col-span-2 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.includeTransitions}
                        onChange={(e) => setSettings({ ...settings, includeTransitions: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Include slide transitions</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.includeAnimations}
                        onChange={(e) => setSettings({ ...settings, includeAnimations: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Include animations</span>
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
                    <Presentation className="w-8 h-8 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  {converted.includes(file.name.replace(/\.(pptx?|ppt)$/i, `.${settings.format}`)) ? (
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
            <div className="mt-6">
              {converting && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Converting to video...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={handleConvert}
                disabled={converting || files.length === 0}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {converting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Video className="w-6 h-6" />
                    Convert to Video
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
                {converted.length} video{converted.length > 1 ? 's' : ''} ready to download
              </p>
            </div>

            <div className="space-y-3">
              {converted.map((filename, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-8 h-8 text-green-600" />
                    <span className="font-medium text-gray-800">{filename}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">HD Quality</h3>
            <p className="text-sm text-gray-600">
              Up to 1080p resolution
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Customizable</h3>
            <p className="text-sm text-gray-600">
              Control quality, FPS, and format
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Preserve Effects</h3>
            <p className="text-sm text-gray-600">
              Keep animations and transitions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerPointToVideo;
