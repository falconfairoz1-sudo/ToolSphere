'use client';

import { useState } from 'react';
import { Barcode, Download, Copy, Check } from 'lucide-react';

type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC' | 'CODE39';

export default function BarcodeGenerator() {
  const [text, setText] = useState('');
  const [format, setFormat] = useState<BarcodeFormat>('CODE128');
  const [barcode, setBarcode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateBarcode = () => {
    if (!text.trim()) {
      alert('Please enter text to generate barcode');
      return;
    }
    // Simulate barcode generation
    setBarcode(`data:image/svg+xml,${encodeURIComponent(generateBarcodeSVG(text, format))}`);
  };

  const generateBarcodeSVG = (data: string, format: string) => {
    const width = 300;
    const height = 100;
    const bars = data.split('').map((_, i) => i % 2 === 0 ? 'black' : 'white');
    
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="white"/>
      ${bars.map((color, i) => `<rect x="${i * 10}" y="10" width="10" height="60" fill="${color}"/>`).join('')}
      <text x="${width / 2}" y="85" text-anchor="middle" font-family="monospace" font-size="12">${data}</text>
      <text x="${width / 2}" y="95" text-anchor="middle" font-family="Arial" font-size="10" fill="gray">${format}</text>
    </svg>`;
  };

  const downloadBarcode = () => {
    const link = document.createElement('a');
    link.href = barcode;
    link.download = `barcode-${text}.svg`;
    link.click();
  };

  const copyBarcode = () => {
    navigator.clipboard.writeText(barcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <Barcode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Barcode Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate barcodes in multiple formats</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Barcode Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or numbers..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Barcode Format</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['CODE128', 'EAN13', 'UPC', 'CODE39'] as BarcodeFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                      format === fmt
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateBarcode}
              disabled={!text.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Generate Barcode
            </button>
          </div>
        </div>

        {barcode && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Generated Barcode</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyBarcode}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                </button>
                <button
                  onClick={downloadBarcode}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex justify-center p-8 bg-gray-50 rounded-xl">
              <img src={barcode} alt="Generated Barcode" className="max-w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
