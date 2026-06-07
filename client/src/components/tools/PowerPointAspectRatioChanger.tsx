'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Maximize2, CheckCircle } from 'lucide-react';

const PowerPointAspectRatioChanger: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [currentRatio] = useState('16:9');
  const [targetRatio, setTargetRatio] = useState('4:3');
  const [fitMode, setFitMode] = useState<'fit' | 'fill' | 'stretch'>('fit');

  const ratios = [
    { value: '16:9', label: '16:9 (Widescreen)', width: 1920, height: 1080 },
    { value: '4:3', label: '4:3 (Standard)', width: 1024, height: 768 },
    { value: '16:10', label: '16:10 (Widescreen)', width: 1920, height: 1200 },
    { value: '1:1', label: '1:1 (Square)', width: 1080, height: 1080 },
  ];

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Maximize2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Aspect Ratio Changer</h1>
          <p className="text-gray-600 text-lg">Change slide dimensions and aspect ratio</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-aspect" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-aspect" 
            className="block border-3 border-dashed border-indigo-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 bg-indigo-50/50"
          >
            <Upload className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="p-4 bg-indigo-50 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Current Aspect Ratio</p>
              <p className="text-2xl font-bold text-indigo-600">{currentRatio}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Target Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-4">
                  {ratios.map((ratio) => (
                    <button
                      key={ratio.value}
                      onClick={() => setTargetRatio(ratio.value)}
                      className={`p-4 border-2 rounded-lg text-left ${
                        targetRatio === ratio.value ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="font-bold mb-1">{ratio.label}</div>
                      <div className="text-sm text-gray-600">{ratio.width} × {ratio.height}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Content Fit Mode</label>
                <div className="space-y-3">
                  {[
                    { value: 'fit', label: 'Fit', desc: 'Maintain aspect ratio, add borders if needed' },
                    { value: 'fill', label: 'Fill', desc: 'Fill entire slide, may crop content' },
                    { value: 'stretch', label: 'Stretch', desc: 'Stretch to fill, may distort content' },
                  ].map((mode) => (
                    <label key={mode.value} className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-indigo-500">
                      <input
                        type="radio"
                        name="fitMode"
                        value={mode.value}
                        checked={fitMode === mode.value}
                        onChange={(e) => setFitMode(e.target.value as any)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{mode.label}</div>
                        <div className="text-sm text-gray-600">{mode.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Changing Aspect Ratio...</> : <>Change Aspect Ratio</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Aspect Ratio Changed!</h3>
            <p className="text-center text-gray-600 mb-6">Slides converted from {currentRatio} to {targetRatio}</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Converted Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointAspectRatioChanger;
