'use client';

import { useState } from 'react';
import { QrCode, Download } from 'lucide-react';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);

  const qrCodeUrl = text
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
    : '';

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <QrCode className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create QR codes for URLs, text, or any data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com or any text..."
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">
              Size: {size}x{size}
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />

            <button
              onClick={downloadQR}
              disabled={!text}
              className="w-full mt-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download QR Code</span>
            </button>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 w-full flex items-center justify-center min-h-[300px]">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <QrCode className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p>Enter text to generate QR code</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Instant</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">HD Quality</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary-600">✓</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">No Limits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
