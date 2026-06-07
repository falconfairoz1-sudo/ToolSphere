'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Settings, Info } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [maxHeight, setMaxHeight] = useState<number>(1080);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setOriginalSize(file.size);
      setCompressedImage(null);
      setCompressedPreview(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImageFile = async () => {
    if (!originalImage) return;

    setCompressing(true);
    setProgress(0);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        quality: quality / 100,
        onProgress: (progress: number) => {
          setProgress(Math.round(progress));
        },
      };

      const compressed = await imageCompression(originalImage, options);
      setCompressedImage(compressed);
      setCompressedSize(compressed.size);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressed);

      setCompressing(false);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Failed to compress image. Please try again.');
      setCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const url = URL.createObjectURL(compressedImage);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${originalImage?.name || 'image.jpg'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionRatio = originalSize && compressedSize
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  const resetTool = () => {
    setOriginalImage(null);
    setOriginalPreview(null);
    setCompressedImage(null);
    setCompressedPreview(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Image Compressor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Reduce image file size while maintaining quality
            </p>
          </div>

          {/* Upload Area */}
          {!originalImage && (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG, WEBP, GIF (MAX. 50MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {/* Settings */}
          {originalImage && !compressing && (
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Compression Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quality Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Smaller</span>
                    <span>Better</span>
                  </div>
                </div>

                {/* Max Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Max Width (px)
                  </label>
                  <input
                    type="number"
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    min="100"
                    max="10000"
                  />
                </div>

                {/* Max Height */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Max Height (px)
                  </label>
                  <input
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    min="100"
                    max="10000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {compressing && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Compressing...
                </span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Image Preview */}
          {originalPreview && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Original
                  </h3>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {formatSize(originalSize)}
                  </span>
                </div>
                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img src={originalPreview} alt="Original" className="w-full h-auto" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Compressed
                  </h3>
                  {compressedSize > 0 && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                      {formatSize(compressedSize)}
                    </span>
                  )}
                </div>
                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  {compressedPreview ? (
                    <img src={compressedPreview} alt="Compressed" className="w-full h-auto" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Info className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Click "Compress Image" to process
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Compression Stats */}
          {compressedSize > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original Size</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatSize(originalSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Compressed Size</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatSize(compressedSize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Saved</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {compressionRatio}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {originalImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              {!compressedImage && !compressing && (
                <button
                  onClick={compressImageFile}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Compress Image</span>
                </button>
              )}

              {compressedImage && (
                <button
                  onClick={downloadImage}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Compressed</span>
                </button>
              )}

              <button
                onClick={resetTool}
                className="py-4 px-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                New Image
              </button>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Advanced Compression Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Uses browser-image-compression library for optimal results</li>
                  <li>Maintains image quality while reducing file size</li>
                  <li>Supports all major image formats (PNG, JPG, WEBP, GIF)</li>
                  <li>Adjustable quality and dimensions</li>
                  <li>Client-side processing - your images never leave your device</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
