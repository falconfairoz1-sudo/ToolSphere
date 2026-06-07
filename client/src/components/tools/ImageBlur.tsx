'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Eye } from 'lucide-react';

export default function ImageBlur() {
  const [image, setImage] = useState<string | null>(null);
  const [blurAmount, setBlurAmount] = useState(10);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyBlur = () => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      setResult(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = 'blurred-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Image Blur Tool
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Blur images for privacy or artistic effect
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
                className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </button>
            </div>

            {image && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blur Amount: {blurAmount}px
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <button
                  onClick={applyBlur}
                  className="w-full py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-lg hover:from-gray-700 hover:to-slate-700 transition flex items-center justify-center space-x-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>Apply Blur</span>
                </button>

                {result && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
                        <img src={image} alt="Original" className="w-full rounded-lg border-2 border-gray-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blurred</h3>
                        <img src={result} alt="Blurred" className="w-full rounded-lg border-2 border-gray-500" />
                      </div>
                    </div>

                    <button
                      onClick={downloadImage}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Blurred Image</span>
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
