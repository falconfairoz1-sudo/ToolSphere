'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Droplet, CheckCircle, Type, Image as ImageIcon } from 'lucide-react';

const PowerPointWatermark: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(30);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'corner'>('diagonal');

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Droplet className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Watermark</h1>
          <p className="text-gray-600 text-lg">Add watermarks to protect your presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-watermark" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-watermark" 
            className="block border-3 border-dashed border-cyan-300 rounded-xl p-12 text-center cursor-pointer hover:border-cyan-500 bg-cyan-50/50"
          >
            <Upload className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Watermark Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setWatermarkType('text')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                      watermarkType === 'text' ? 'border-cyan-600 bg-cyan-50' : 'border-gray-200'
                    }`}
                  >
                    <Type className="w-6 h-6" />
                    <span className="font-medium">Text Watermark</span>
                  </button>
                  <button
                    onClick={() => setWatermarkType('image')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
                      watermarkType === 'image' ? 'border-cyan-600 bg-cyan-50' : 'border-gray-200'
                    }`}
                  >
                    <ImageIcon className="w-6 h-6" />
                    <span className="font-medium">Image Watermark</span>
                  </button>
                </div>
              </div>

              {watermarkType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text</label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="Enter watermark text"
                  />
                </div>
              )}

              {watermarkType === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Image</label>
                  <input type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="center">Center</option>
                  <option value="diagonal">Diagonal</option>
                  <option value="corner">Bottom Right Corner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity: {opacity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Adding Watermark...</> : <>Add Watermark</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Watermark Added!</h3>
            <p className="text-center text-gray-600 mb-6">Your presentation now has a watermark on all slides</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Watermarked Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointWatermark;
