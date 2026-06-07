'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, Download } from 'lucide-react';

const PowerPointViewer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(15);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Eye className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Viewer</h1>
          <p className="text-gray-600 text-lg">View presentations online without PowerPoint</p>
        </motion.div>

        {!file ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <input 
              type="file" 
              id="file-upload-viewer" 
              className="hidden" 
              accept=".ppt,.pptx" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])} 
            />
            <label 
              htmlFor="file-upload-viewer" 
              className="block border-3 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-slate-500 bg-slate-50/50"
            >
              <Upload className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
              <span className="inline-block px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold">
                Select File
              </span>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-400 mb-2">{currentSlide}</div>
                  <div className="text-gray-500">Slide Preview</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                    disabled={currentSlide === 1}
                    className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 bg-slate-100 rounded font-medium">
                    {currentSlide} / {totalSlides}
                  </span>
                  <button
                    onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
                    disabled={currentSlide === totalSlides}
                    className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                    className="p-2 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="px-3 py-2 bg-slate-100 rounded text-sm font-medium">
                    {zoom}%
                  </span>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                    className="p-2 bg-slate-100 rounded hover:bg-slate-200"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-slate-100 rounded hover:bg-slate-200">
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">All Slides</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {Array.from({ length: totalSlides }, (_, i) => i + 1).map((slide) => (
                  <button
                    key={slide}
                    onClick={() => setCurrentSlide(slide)}
                    className={`aspect-video border-2 rounded-lg flex items-center justify-center font-bold transition-all ${
                      currentSlide === slide
                        ? 'border-slate-600 bg-slate-50'
                        : 'border-gray-200 hover:border-slate-400'
                    }`}
                  >
                    {slide}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerPointViewer;
