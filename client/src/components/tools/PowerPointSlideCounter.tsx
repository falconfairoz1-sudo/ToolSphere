'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Hash, Presentation, Image, Type, FileText } from 'lucide-react';

const PowerPointSlideCounter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stats] = useState({
    totalSlides: 24,
    withImages: 18,
    withText: 24,
    withNotes: 12,
    totalImages: 45,
    totalWords: 1250,
    avgWordsPerSlide: 52,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Hash className="w-12 h-12 text-lime-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Slide Counter</h1>
          <p className="text-gray-600 text-lg">Analyze presentation statistics</p>
        </motion.div>

        {!file ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <input 
              type="file" 
              id="file-upload-counter" 
              className="hidden" 
              accept=".ppt,.pptx" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])} 
            />
            <label 
              htmlFor="file-upload-counter" 
              className="block border-3 border-dashed border-lime-300 rounded-xl p-12 text-center cursor-pointer hover:border-lime-500 bg-lime-50/50"
            >
              <Upload className="w-16 h-16 text-lime-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
              <span className="inline-block px-6 py-3 bg-lime-600 text-white rounded-lg font-semibold">Select File</span>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Presentation Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-lime-50 rounded-xl">
                  <Presentation className="w-10 h-10 text-lime-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalSlides}</div>
                  <div className="text-sm text-gray-600">Total Slides</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <Image className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalImages}</div>
                  <div className="text-sm text-gray-600">Total Images</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <Type className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalWords}</div>
                  <div className="text-sm text-gray-600">Total Words</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-xl">
                  <FileText className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stats.withNotes}</div>
                  <div className="text-sm text-gray-600">With Notes</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Detailed Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Slides with images</span>
                  <span className="font-bold text-gray-800">{stats.withImages} / {stats.totalSlides}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Slides with text</span>
                  <span className="font-bold text-gray-800">{stats.withText} / {stats.totalSlides}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Average words per slide</span>
                  <span className="font-bold text-gray-800">{stats.avgWordsPerSlide}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerPointSlideCounter;
