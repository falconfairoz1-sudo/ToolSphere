'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Sparkles, Wand2 } from 'lucide-react';

export default function AIImageEnhancer() {
  const [image, setImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const autoEnhance = () => {
    setBrightness(110);
    setContrast(115);
    setSaturation(120);
    setSharpness(5);
    setTimeout(() => enhanceImage(), 100);
  };

  const enhanceImage = () => {
    if (!image) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${sharpness > 0 ? 0 : Math.abs(sharpness)}px)`;
      ctx.drawImage(img, 0, 0);

      if (sharpness > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const factor = sharpness / 10;

        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * (1 + factor));
          data[i + 1] = Math.min(255, data[i + 1] * (1 + factor));
          data[i + 2] = Math.min(255, data[i + 2] * (1 + factor));
        }

        ctx.putImageData(imageData, 0, 0);
      }

      setEnhancedImage(canvas.toDataURL('image/png'));
      setProcessing(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    const link = document.createElement('a');
    link.href = enhancedImage;
    link.download = 'enhanced-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI Image Enhancer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance image quality with advanced filters
            </p>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </button>
          </div>

          {image && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Brightness: {brightness}%</label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Contrast: {contrast}%</label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Saturation: {saturation}%</label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Sharpness: {sharpness}</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={sharpness}
                      onChange={(e) => setSharpness(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={autoEnhance}
                    className="w-full py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition flex items-center justify-center space-x-2"
                  >
                    <Wand2 className="w-5 h-5" />
                    <span>Auto Enhance</span>
                  </button>
                  <button
                    onClick={enhanceImage}
                    disabled={processing}
                    className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Apply Enhancement</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {enhancedImage && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
                      <img src={image} alt="Original" className="w-full rounded-lg border-2 border-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enhanced</h3>
                      <img src={enhancedImage} alt="Enhanced" className="w-full rounded-lg border-2 border-pink-500" />
                    </div>
                  </div>

                  <button
                    onClick={downloadImage}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Enhanced Image</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
