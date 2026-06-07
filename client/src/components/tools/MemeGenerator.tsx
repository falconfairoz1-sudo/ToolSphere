'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Smile, Type } from 'lucide-react';

export default function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const templates = [
    { name: 'Drake', url: 'https://i.imgflip.com/30b1gx.jpg' },
    { name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
    { name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateMeme = () => {
    if (!image) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      ctx.font = 'bold 48px Impact';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';

      if (topText) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 60);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, 60);
      }

      if (bottomText) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }

      setResult(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const downloadMeme = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = 'meme.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Smile className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Meme Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create hilarious memes with custom text
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
                className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition flex items-center justify-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Type className="w-4 h-4 inline mr-1" />
                Top Text
              </label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter top text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Type className="w-4 h-4 inline mr-1" />
                Bottom Text
              </label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter bottom text"
              />
            </div>

            <button
              onClick={generateMeme}
              disabled={!image}
              className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Smile className="w-5 h-5" />
              <span>Generate Meme</span>
            </button>

            {result && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Your Meme</h3>
                <img src={result} alt="Meme" className="w-full rounded-lg border-2 border-yellow-500" />
                <button
                  onClick={downloadMeme}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Meme</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
