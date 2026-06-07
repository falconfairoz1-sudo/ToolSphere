'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Scissors } from 'lucide-react';

const PowerPointSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitting, setSplitting] = useState(false);
  const [split, setSplit] = useState(false);
  const [splitMode, setSplitMode] = useState<'each' | 'range' | 'count'>('each');
  const [slideCount, setSlideCount] = useState(5);
  const [totalSlides] = useState(20); // Simulated

  const handleSplit = async () => {
    setSplitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSplit(true);
    setSplitting(false);
  };

  const getOutputCount = () => {
    if (splitMode === 'each') return totalSlides;
    if (splitMode === 'count') return Math.ceil(totalSlides / slideCount);
    return 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Scissors className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Splitter</h1>
          <p className="text-gray-600 text-lg">Split presentations into separate files</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-splitter" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-splitter" 
            className="block border-3 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 bg-blue-50/50"
          >
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">Select File</span>
          </label>

          {file && (
            <div className="mt-6 space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Presentation className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-600">{totalSlides} slides detected</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Split Mode</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input type="radio" name="mode" value="each" checked={splitMode === 'each'} onChange={(e) => setSplitMode(e.target.value as any)} className="mt-1" />
                    <div>
                      <div className="font-medium">Each slide separately</div>
                      <div className="text-sm text-gray-600">Create {totalSlides} files (1 slide each)</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input type="radio" name="mode" value="count" checked={splitMode === 'count'} onChange={(e) => setSplitMode(e.target.value as any)} className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium mb-2">Split by slide count</div>
                      <input
                        type="number"
                        min="1"
                        max={totalSlides}
                        value={slideCount}
                        onChange={(e) => setSlideCount(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Slides per file"
                      />
                      <div className="text-sm text-gray-600 mt-1">Create {Math.ceil(totalSlides / slideCount)} files</div>
                    </div>
                  </label>
                </div>
              </div>

              <button onClick={handleSplit} disabled={splitting} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {splitting ? <><Loader2 className="w-6 h-6 animate-spin" />Splitting...</> : <>Split Presentation</>}
              </button>
            </div>
          )}
        </div>

        {split && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-center mb-6">Split Complete!</h3>
            <p className="text-center text-gray-600 mb-6">{getOutputCount()} files created</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download All Files
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointSplitter;
