'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, ArrowUpDown, CheckCircle, GripVertical } from 'lucide-react';

interface Slide {
  id: number;
  order: number;
}

const PowerPointSlideReorder: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, order: i }))
  );

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < slides.length) {
      [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
      setSlides(newSlides);
    }
  };

  const reverseOrder = () => {
    setSlides([...slides].reverse());
  };

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <ArrowUpDown className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Slide Reorder</h1>
          <p className="text-gray-600 text-lg">Rearrange slides in any order</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-reorder" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-reorder" 
            className="block border-3 border-dashed border-teal-300 rounded-xl p-12 text-center cursor-pointer hover:border-teal-500 bg-teal-50/50"
          >
            <Upload className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Reorder Slides</h3>
              <button onClick={reverseOrder} className="px-4 py-2 text-sm bg-teal-100 text-teal-600 rounded hover:bg-teal-200">
                Reverse Order
              </button>
            </div>

            <div className="space-y-2 mb-6">
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  layout
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <GripVertical className="w-5 h-5 text-gray-400" />
                  <div className="w-10 h-10 bg-teal-100 rounded flex items-center justify-center font-bold text-teal-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <Presentation className="w-6 h-6 text-teal-600" />
                    <span className="font-medium">Slide {slide.id}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveSlide(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30 rounded"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveSlide(index, 'down')}
                      disabled={index === slides.length - 1}
                      className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30 rounded"
                    >
                      ↓
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Applying New Order...</> : <>Apply New Order</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Slides Reordered!</h3>
            <p className="text-center text-gray-600 mb-6">Your presentation has been reorganized</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Reordered Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointSlideReorder;
