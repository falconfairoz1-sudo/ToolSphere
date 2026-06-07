'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Trash2, CheckCircle } from 'lucide-react';

const PowerPointSlideRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [slides] = useState(Array.from({ length: 15 }, (_, i) => ({ id: i + 1, selected: false })));
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  const toggleSlide = (id: number) => {
    setSelectedSlides((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Trash2 className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Slide Remover</h1>
          <p className="text-gray-600 text-lg">Remove unwanted slides from presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-remover" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-remover" 
            className="block border-3 border-dashed border-red-300 rounded-xl p-12 text-center cursor-pointer hover:border-red-500 bg-red-50/50"
          >
            <Upload className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Select Slides to Remove ({selectedSlides.length} selected)</h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => toggleSlide(slide.id)}
                  className={`aspect-video border-2 rounded-lg flex items-center justify-center font-bold transition-all ${
                    selectedSlides.includes(slide.id)
                      ? 'border-red-600 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div>
                    <div className="text-2xl">{slide.id}</div>
                    {selectedSlides.includes(slide.id) && <Trash2 className="w-4 h-4 mx-auto mt-1" />}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handleProcess} disabled={processing || selectedSlides.length === 0} className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Removing Slides...</> : <>Remove {selectedSlides.length} Slide{selectedSlides.length !== 1 ? 's' : ''}</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Slides Removed!</h3>
            <p className="text-center text-gray-600 mb-6">
              {selectedSlides.length} slide{selectedSlides.length !== 1 ? 's' : ''} removed. {slides.length - selectedSlides.length} slides remaining.
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Modified Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointSlideRemover;
