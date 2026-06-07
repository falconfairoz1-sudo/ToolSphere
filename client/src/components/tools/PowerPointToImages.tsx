'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Download, Loader2, Presentation } from 'lucide-react';

const PowerPointToImages: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleConvert = async () => {
    setConverting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConverted(true);
    setConverting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <Image className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint to Images</h1>
          <p className="text-gray-600">Convert slides to PNG or JPG images</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <input 
            type="file" 
            id="file-upload-to-images" 
            className="hidden" 
            accept=".ppt,.pptx" 
            multiple 
            onChange={e => e.target.files && setFiles(Array.from(e.target.files))} 
          />
          <label 
            htmlFor="file-upload-to-images" 
            className="block border-3 border-dashed border-purple-300 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500"
          >
            <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint Files</h3>
            <span className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold">Select Files</span>
          </label>

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <select value={format} onChange={e => setFormat(e.target.value as any)} className="w-full px-4 py-2 border rounded-lg">
                    <option value="png">PNG (High Quality)</option>
                    <option value="jpg">JPG (Smaller Size)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Quality</label>
                  <select value={quality} onChange={e => setQuality(e.target.value as any)} className="w-full px-4 py-2 border rounded-lg">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <button onClick={handleConvert} disabled={converting} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {converting ? <><Loader2 className="w-6 h-6 animate-spin" />Converting...</> : <>Convert to Images</>}
              </button>

              {converted && (
                <div className="p-6 bg-green-50 rounded-xl text-center">
                  <h3 className="font-bold text-green-800 mb-4">Conversion Complete!</h3>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center gap-2 mx-auto">
                    <Download className="w-5 h-5" />Download All Images
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerPointToImages;
