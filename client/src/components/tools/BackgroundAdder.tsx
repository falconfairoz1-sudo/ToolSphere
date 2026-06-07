'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Layers } from 'lucide-react';

export default function BackgroundAdder() {
  const [foregroundImage, setForegroundImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [backgroundType, setBackgroundType] = useState<'solid' | 'gradient'>('solid');
  const [gradientColor2, setGradientColor2] = useState('#000000');
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForegroundImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBackground = () => {
    if (!foregroundImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (backgroundType === 'solid') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, backgroundColor);
        gradient.addColorStop(1, gradientColor2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      setResult(canvas.toDataURL('image/png'));
    };
    img.src = foregroundImage;
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = 'image-with-background.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Layers className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Background Adder
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add custom backgrounds to your images
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image (PNG with transparency works best)</span>
              </button>
            </div>

            {foregroundImage && (
              <>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setBackgroundType('solid')}
                    className={`flex-1 py-2 rounded-lg font-semibold transition ${
                      backgroundType === 'solid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Solid Color
                  </button>
                  <button
                    onClick={() => setBackgroundType('gradient')}
                    className={`flex-1 py-2 rounded-lg font-semibold transition ${
                      backgroundType === 'gradient' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Gradient
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {backgroundType === 'solid' ? 'Background Color' : 'Gradient Color 1'}
                    </label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>

                  {backgroundType === 'gradient' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gradient Color 2
                      </label>
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="w-full h-12 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={addBackground}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition flex items-center justify-center space-x-2"
                >
                  <Layers className="w-5 h-5" />
                  <span>Add Background</span>
                </button>

                {result && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Result</h3>
                    <img src={result} alt="Result" className="w-full rounded-lg border-2 border-indigo-500" />
                    <button
                      onClick={downloadImage}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Image</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
