'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, FileOutput, CheckCircle } from 'lucide-react';

const PowerPointSlideExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [slides] = useState(Array.from({ length: 15 }, (_, i) => ({ id: i + 1 })));
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  const toggleSlide = (id: number) => {
    setSelectedSlides((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectRange = (start: number, end: number) => {
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    setSelectedSlides(range);
  };

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <FileOutput className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Slide Extractor</h1>
          <p className="text-gray-600 text-lg">Extract specific slides into a new presentation</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-extractor" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-extractor" 
            className="block border-3 border-dashed border-indigo-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 bg-indigo-50/50"
          >
            <Upload className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Select Slides to Extract ({selectedSlides.length} selected)</h3>
              <div className="flex gap-2">
                <button onClick={() => setSelectedSlides(slides.map(s => s.id))} className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200">
                  Select All
                </button>
                <button onClick={() => setSelectedSlides([])} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => toggleSlide(slide.id)}
                  className={`aspect-video border-2 rounded-lg flex items-center justify-center font-bold text-2xl transition-all ${
                    selectedSlides.includes(slide.id)
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {slide.id}
                </button>
              ))}
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select Range</label>
              <div className="flex gap-2">
                <button onClick={() => selectRange(1, 5)} className="px-3 py-2 text-sm border rounded hover:bg-gray-100">1-5</button>
                <button onClick={() => selectRange(6, 10)} className="px-3 py-2 text-sm border rounded hover:bg-gray-100">6-10</button>
                <button onClick={() => selectRange(11, 15)} className="px-3 py-2 text-sm border rounded hover:bg-gray-100">11-15</button>
              </div>
            </div>

            <button onClick={handleProcess} disabled={processing || selectedSlides.length === 0} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Extracting Slides...</> : <>Extract {selectedSlides.length} Slide{selectedSlides.length !== 1 ? 's' : ''}</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Slides Extracted!</h3>
            <p className="text-center text-gray-600 mb-6">
              {selectedSlides.length} slide{selectedSlides.length !== 1 ? 's' : ''} extracted into new presentation
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Extracted Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointSlideExtractor;
