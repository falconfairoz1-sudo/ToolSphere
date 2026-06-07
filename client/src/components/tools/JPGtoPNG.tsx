'use client';

import { useState, useRef } from 'react';
import { Upload, Download, RefreshCw } from 'lucide-react';

export default function JPGtoPNG() {
  const [image, setImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPG/JPEG image');
    }
  };

  const convertToPNG = () => {
    if (!image) return;
    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const pngDataUrl = canvas.toDataURL('image/png');
      setConvertedImage(pngDataUrl);
      setProcessing(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = 'converted-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <RefreshCw className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              JPG to PNG Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert JPG images to PNG format
            </p>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload JPG Image</span>
            </button>
          </div>

          {image && (
            <div className="space-y-6">
              <button
                onClick={convertToPNG}
                disabled={processing}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Convert to PNG</span>
                  </>
                )}
              </button>

              {convertedImage && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Original (JPG)</h3>
                      <img src={image} alt="Original" className="w-full rounded-lg border-2 border-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Converted (PNG)</h3>
                      <img src={convertedImage} alt="Converted" className="w-full rounded-lg border-2 border-purple-500" />
                    </div>
                  </div>

                  <button
                    onClick={downloadImage}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download PNG</span>
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
