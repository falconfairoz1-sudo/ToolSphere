'use client';

import { useState, useRef } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';

export default function PNGtoJPG() {
  const [image, setImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PNG image');
    }
  };

  const convertToJPG = () => {
    if (!image) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const jpgDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setConvertedImage(jpgDataUrl);
      setProcessing(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = 'converted-image.jpg';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <RefreshCw className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PNG to JPG Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert PNG images to JPG format
            </p>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload PNG Image</span>
            </button>
          </div>

          {image && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={convertToJPG}
                disabled={processing}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Convert to JPG</span>
                  </>
                )}
              </button>

              {convertedImage && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original (PNG)</h3>
                      <img src={image} alt="Original" className="w-full rounded-lg border-2 border-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Converted (JPG)</h3>
                      <img src={convertedImage} alt="Converted" className="w-full rounded-lg border-2 border-blue-500" />
                    </div>
                  </div>

                  <button
                    onClick={downloadImage}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download JPG</span>
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
