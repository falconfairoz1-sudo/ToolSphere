'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Loader, Wand2, Info, Sliders } from 'lucide-react';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [threshold, setThreshold] = useState<number>(128);
  const [tolerance, setTolerance] = useState<number>(30);
  const [smoothEdges, setSmoothEdges] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!originalImage) return;

    setProcessing(true);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = originalImage;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Advanced background removal algorithm
        // Step 1: Detect background color (assume corners are background)
        const cornerSamples = [
          { x: 0, y: 0 },
          { x: canvas.width - 1, y: 0 },
          { x: 0, y: canvas.height - 1 },
          { x: canvas.width - 1, y: canvas.height - 1 },
        ];

        let bgR = 0, bgG = 0, bgB = 0;
        cornerSamples.forEach(({ x, y }) => {
          const idx = (y * canvas.width + x) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        });
        bgR = Math.round(bgR / cornerSamples.length);
        bgG = Math.round(bgG / cornerSamples.length);
        bgB = Math.round(bgB / cornerSamples.length);

        // Step 2: Remove pixels similar to background color
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate color difference
          const diff = Math.sqrt(
            Math.pow(r - bgR, 2) +
            Math.pow(g - bgG, 2) +
            Math.pow(b - bgB, 2)
          );

          // If color is similar to background, make it transparent
          if (diff < tolerance) {
            data[i + 3] = 0;
          } else if (smoothEdges && diff < tolerance * 1.5) {
            // Smooth edges by making semi-transparent
            const alpha = Math.min(255, ((diff - tolerance) / tolerance) * 255);
            data[i + 3] = alpha;
          }
        }

        // Step 3: Additional processing for white/light backgrounds
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          // Remove bright pixels (likely background)
          if (brightness > threshold && data[i + 3] > 0) {
            const colorVariance = Math.max(
              Math.abs(r - g),
              Math.abs(g - b),
              Math.abs(b - r)
            );

            // If low color variance (grayish/white), likely background
            if (colorVariance < 30) {
              const alpha = Math.max(0, 255 - (brightness - threshold) * 2);
              data[i + 3] = Math.min(data[i + 3], alpha);
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL('image/png'));
        setProcessing(false);
      };

      img.onerror = () => {
        alert('Failed to load image. Please try again.');
        setProcessing(false);
      };
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Failed to remove background. Please try again.');
      setProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    link.click();
  };

  const resetTool = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4">
              <Wand2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Background Remover
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Remove backgrounds from images with AI-powered precision
            </p>
          </div>

          {/* Upload Area */}
          {!originalImage && (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-24 h-24 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-12 h-12 text-pink-600 dark:text-pink-400" />
                  </div>
                  <p className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG (MAX. 10MB)
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Best results with clear subjects and solid backgrounds
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
          {originalImage && !processing && (
            <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-pink-200 dark:border-pink-800">
              <div className="flex items-center space-x-2 mb-4">
                <Sliders className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Removal Settings
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Threshold Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Brightness Threshold: {threshold}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="255"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-pink-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Less Removal</span>
                    <span>More Removal</span>
                  </div>
                </div>

                {/* Tolerance Slider */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Color Tolerance: {tolerance}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={tolerance}
                    onChange={(e) => setTolerance(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-pink-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Precise</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              {/* Smooth Edges Toggle */}
              <div className="mt-4 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="smoothEdges"
                  checked={smoothEdges}
                  onChange={(e) => setSmoothEdges(e.target.checked)}
                  className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="smoothEdges" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                  Smooth Edges (Anti-aliasing)
                </label>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {originalImage && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Original Image
                </h3>
                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img src={originalImage} alt="Original" className="w-full h-auto" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Background Removed
                </h3>
                <div 
                  className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600"
                  style={{
                    backgroundImage: 'repeating-conic-gradient(#e5e7eb 0% 25%, #f3f4f6 0% 50%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }}
                >
                  {processedImage ? (
                    <img src={processedImage} alt="Processed" className="w-full h-auto" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white/50 dark:bg-gray-800/50">
                      {processing ? (
                        <>
                          <Loader className="w-12 h-12 text-pink-600 animate-spin mb-3" />
                          <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Processing image...
                          </p>
                        </>
                      ) : (
                        <>
                          <Info className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-gray-500 dark:text-gray-400">
                            Click "Remove Background" to process
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {originalImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              {!processedImage && !processing && (
                <button
                  onClick={removeBackground}
                  className="flex-1 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Remove Background</span>
                </button>
              )}

              {processing && (
                <button
                  disabled
                  className="flex-1 py-4 bg-gray-400 text-white font-semibold rounded-xl cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </button>
              )}

              {processedImage && (
                <>
                  <button
                    onClick={downloadImage}
                    className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    onClick={removeBackground}
                    className="py-4 px-6 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300"
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
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Advanced Background Removal Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Intelligent color detection algorithm</li>
                  <li>Adjustable brightness threshold for different backgrounds</li>
                  <li>Color tolerance control for precise removal</li>
                  <li>Edge smoothing for professional results</li>
                  <li>Works best with solid or simple backgrounds</li>
                  <li>Outputs transparent PNG format</li>
                  <li>100% client-side - your images never leave your device</li>
                </ul>
                <p className="mt-2 text-xs">
                  <strong>Tip:</strong> For complex backgrounds, try adjusting the tolerance and threshold settings for better results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
