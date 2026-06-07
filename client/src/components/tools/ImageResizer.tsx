'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Maximize2, Info, Lock, Unlock } from 'lucide-react';

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [resizing, setResizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          setOriginalImage(img.src);
          setOriginalDimensions({ width: img.width, height: img.height });
          setNewWidth(img.width);
          setNewHeight(img.height);
          setResizedImage(null);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (width: number) => {
    setNewWidth(width);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setNewHeight(Math.round(width * aspectRatio));
    }
  };

  const handleHeightChange = (height: number) => {
    setNewHeight(height);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setNewWidth(Math.round(height * aspectRatio));
    }
  };

  const resizeImage = async () => {
    if (!originalImage) return;

    setResizing(true);

    try {
      const img = new Image();
      img.src = originalImage;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        setResizedImage(canvas.toDataURL('image/png'));
        setResizing(false);
      };
    } catch (error) {
      console.error('Error resizing image:', error);
      alert('Failed to resize image. Please try again.');
      setResizing(false);
    }
  };

  const downloadImage = () => {
    if (!resizedImage) return;

    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = `resized-${newWidth}x${newHeight}.png`;
    link.click();
  };

  const setPresetSize = (width: number, height: number) => {
    setNewWidth(width);
    setNewHeight(height);
  };

  const resetTool = () => {
    setOriginalImage(null);
    setResizedImage(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setNewWidth(0);
    setNewHeight(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const presets = [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Portrait', width: 1080, height: 1350 },
    { name: 'Facebook Cover', width: 820, height: 312 },
    { name: 'Twitter Header', width: 1500, height: 500 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'HD (1080p)', width: 1920, height: 1080 },
    { name: '4K', width: 3840, height: 2160 },
    { name: 'Profile Picture', width: 400, height: 400 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <Maximize2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Image Resizer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Resize images to any dimension with high quality
            </p>
          </div>

          {/* Upload Area */}
          {!originalImage && (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG, WEBP (MAX. 10MB)
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
          {originalImage && (
            <>
              {/* Dimension Controls */}
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Dimensions
                  </h3>
                  <button
                    onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                      maintainAspectRatio
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {maintainAspectRatio ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <Unlock className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {maintainAspectRatio ? 'Locked' : 'Unlocked'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={newWidth}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold"
                      min="1"
                      max="10000"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Original: {originalDimensions.width}px
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={newHeight}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold"
                      min="1"
                      max="10000"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Original: {originalDimensions.height}px
                    </p>
                  </div>
                </div>
              </div>

              {/* Preset Sizes */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Quick Presets
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => setPresetSize(preset.width, preset.height)}
                      className="px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {preset.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {preset.width} × {preset.height}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Preview */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Original ({originalDimensions.width} × {originalDimensions.height})
                  </h3>
                  <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Resized ({newWidth} × {newHeight})
                  </h3>
                  <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                    {resizedImage ? (
                      <img src={resizedImage} alt="Resized" className="w-full h-auto" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64">
                        <Info className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Click "Resize Image" to process
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!resizedImage && !resizing && (
                  <button
                    onClick={resizeImage}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Maximize2 className="w-5 h-5" />
                    <span>Resize Image</span>
                  </button>
                )}

                {resizedImage && (
                  <>
                    <button
                      onClick={downloadImage}
                      className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Resized</span>
                    </button>

                    <button
                      onClick={resizeImage}
                      className="py-4 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
                    >
                      Reprocess
                    </button>
                  </>
                )}

                <button
                  onClick={resetTool}
                  className="py-4 px-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  New Image
                </button>
              </div>
            </>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Image Resizer Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>High-quality image smoothing for professional results</li>
                  <li>Maintain aspect ratio or resize freely</li>
                  <li>Quick presets for social media and common sizes</li>
                  <li>Support for all major image formats</li>
                  <li>100% client-side processing - secure and private</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
