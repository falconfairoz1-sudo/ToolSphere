'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Droplet, Type } from 'lucide-react';

export default function WatermarkAdder() {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('© Your Watermark');
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [position, setPosition] = useState('bottom-right');
  const [opacity, setOpacity] = useState(50);
  const [fontSize, setFontSize] = useState(24);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const watermarkInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setWatermarkImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addWatermark = () => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity / 100;

      if (watermarkType === 'text') {
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        const textWidth = ctx.measureText(watermarkText).width;
        let x = 10, y = canvas.height - 10;

        if (position === 'top-left') { x = 10; y = fontSize + 10; }
        else if (position === 'top-right') { x = canvas.width - textWidth - 10; y = fontSize + 10; }
        else if (position === 'bottom-left') { x = 10; y = canvas.height - 10; }
        else if (position === 'bottom-right') { x = canvas.width - textWidth - 10; y = canvas.height - 10; }
        else if (position === 'center') { x = (canvas.width - textWidth) / 2; y = canvas.height / 2; }

        ctx.strokeText(watermarkText, x, y);
        ctx.fillText(watermarkText, x, y);
      } else if (watermarkType === 'image' && watermarkImage) {
        const wmImg = new Image();
        wmImg.onload = () => {
          const wmWidth = 150;
          const wmHeight = (wmImg.height / wmImg.width) * wmWidth;
          let x = 10, y = canvas.height - wmHeight - 10;

          if (position === 'top-left') { x = 10; y = 10; }
          else if (position === 'top-right') { x = canvas.width - wmWidth - 10; y = 10; }
          else if (position === 'bottom-left') { x = 10; y = canvas.height - wmHeight - 10; }
          else if (position === 'bottom-right') { x = canvas.width - wmWidth - 10; y = canvas.height - wmHeight - 10; }
          else if (position === 'center') { x = (canvas.width - wmWidth) / 2; y = (canvas.height - wmHeight) / 2; }

          ctx.drawImage(wmImg, x, y, wmWidth, wmHeight);
          setResult(canvas.toDataURL('image/png'));
        };
        wmImg.src = watermarkImage;
        return;
      }

      setResult(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = 'watermarked-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Droplet className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Watermark Adder
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add text or image watermarks to protect your images
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setWatermarkType('text')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    watermarkType === 'text' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Type className="w-4 h-4 inline mr-1" />
                  Text
                </button>
                <button
                  onClick={() => setWatermarkType('image')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    watermarkType === 'image' ? 'bg-cyan-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Droplet className="w-4 h-4 inline mr-1" />
                  Image
                </button>
              </div>

              {watermarkType === 'text' ? (
                <>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Watermark text"
                  />
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Font Size: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <input
                    ref={watermarkInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleWatermarkImageChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => watermarkInputRef.current?.click()}
                    className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 transition"
                  >
                    Upload Watermark Image
                  </button>
                  {watermarkImage && (
                    <img src={watermarkImage} alt="Watermark" className="w-full h-20 object-contain rounded border" />
                  )}
                </>
              )}

              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="center">Center</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300">Opacity: {opacity}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={addWatermark}
                disabled={!image}
                className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition disabled:opacity-50"
              >
                Add Watermark
              </button>
            </div>
          </div>

          {result && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Result</h3>
              <img src={result} alt="Result" className="w-full rounded-lg border-2 border-cyan-500" />
              <button
                onClick={downloadImage}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Image</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
