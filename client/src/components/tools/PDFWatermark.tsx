'use client';

import { useState } from 'react';
import { Droplet, Upload, Download, Type, Image as ImageIcon } from 'lucide-react';

export default function PDFWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState('');
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'top' | 'bottom'>('diagonal');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setProcessed(false);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleProcess = () => {
    if (!file || (watermarkType === 'text' && !watermarkText)) return;
    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Droplet className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Watermark
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add text or image watermarks to your PDF
          </p>
        </div>

        <div className="mb-6">
          <label className="block w-full">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 transition cursor-pointer bg-gray-50 dark:bg-gray-700/50">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {file ? file.name : 'Click to upload PDF'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload PDF to add watermark
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {file && !processed && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Watermark Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setWatermarkType('text')}
                  className={`p-4 rounded-lg border-2 transition ${
                    watermarkType === 'text'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Type className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">Text</p>
                </button>
                <button
                  onClick={() => setWatermarkType('image')}
                  className={`p-4 rounded-lg border-2 transition ${
                    watermarkType === 'image'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <ImageIcon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">Image</p>
                </button>
              </div>
            </div>

            {watermarkType === 'text' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="diagonal">Diagonal</option>
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opacity: {opacity}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Light</span>
                <span>Dark</span>
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={processing || (watermarkType === 'text' && !watermarkText)}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding Watermark...</span>
                </>
              ) : (
                <>
                  <Droplet className="w-5 h-5" />
                  <span>Add Watermark</span>
                </>
              )}
            </button>
          </>
        )}

        {processed && (
          <div className="space-y-4">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Watermark Added!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your PDF now has a watermark
              </p>
              <button
                onClick={() => alert('In production, this would download the watermarked PDF.')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setWatermarkText('');
                setProcessed(false);
              }}
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Add Watermark to Another File
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> This is a demo interface. In production, watermarking would use libraries like PyPDF2, ReportLab, or pdf-lib.
          </p>
        </div>
      </div>
    </div>
  );
}
