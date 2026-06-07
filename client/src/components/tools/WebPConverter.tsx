'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, ArrowLeftRight } from 'lucide-react';

export default function WebPConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [conversionMode, setConversionMode] = useState<'toWebP' | 'fromWebP'>('toWebP');
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!originalImage) return;

    setConverting(true);

    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          const outputFormat = conversionMode === 'toWebP' ? 'image/webp' : 'image/png';
          const dataUrl = canvas.toDataURL(outputFormat, quality / 100);
          setConvertedImage(dataUrl);
        }

        setConverting(false);
      };

      img.src = originalImage;
    }, 300);
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = conversionMode === 'toWebP' ? 'converted-image.webp' : 'converted-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl mb-4">
              <ArrowLeftRight className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              WebP Converter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Convert images to/from WebP format
            </p>
          </div>

          <div className="mb-6 flex justify-center space-x-4">
            <button
              onClick={() => setConversionMode('toWebP')}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                conversionMode === 'toWebP'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              To WebP
            </button>
            <button
              onClick={() => setConversionMode('fromWebP')}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                conversionMode === 'fromWebP'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              From WebP
            </button>
          </div>

          {!originalImage ? (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                  </div>
                  <p className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {conversionMode === 'toWebP' ? 'PNG, JPG, JPEG' : 'WebP files'}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={conversionMode === 'toWebP' ? 'image/png,image/jpeg,image/jpg' : 'image/webp'}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <>
              {conversionMode === 'toWebP' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-teal-600"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Original
                  </h3>
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                    <img src={originalImage} alt="Original" className="w-full h-auto" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Converted
                  </h3>
                  <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                    {convertedImage ? (
                      <img src={convertedImage} alt="Converted" className="w-full h-auto" />
                    ) : (
                      <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500 dark:text-gray-400">
                          Click "Convert" to process
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!convertedImage ? (
                  <button
                    onClick={convertImage}
                    disabled={converting}
                    className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span>{converting ? 'Converting...' : 'Convert Image'}</span>
                  </button>
                ) : (
                  <button
                    onClick={downloadImage}
                    className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setConvertedImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="py-4 px-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  New Image
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
