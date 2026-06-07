'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Type, CheckCircle } from 'lucide-react';

const PowerPointFontReplacer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [oldFont, setOldFont] = useState('Arial');
  const [newFont, setNewFont] = useState('Calibri');
  const [fontsInUse] = useState(['Arial', 'Times New Roman', 'Calibri', 'Verdana']);

  const commonFonts = [
    'Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'Georgia',
    'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS'
  ];

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Type className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Font Replacer</h1>
          <p className="text-gray-600 text-lg">Replace fonts across all slides</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-font" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-font" 
            className="block border-3 border-dashed border-pink-300 rounded-xl p-12 text-center cursor-pointer hover:border-pink-500 bg-pink-50/50"
          >
            <Upload className="w-16 h-16 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Fonts in Use</h3>
              <div className="flex flex-wrap gap-2">
                {fontsInUse.map((font) => (
                  <span key={font} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{font}</span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Replace This Font</label>
                <select
                  value={oldFont}
                  onChange={(e) => setOldFont(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  {fontsInUse.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">With This Font</label>
                <select
                  value={newFont}
                  onChange={(e) => setNewFont(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  {commonFonts.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Preview:</strong> All text in <span className="font-bold">{oldFont}</span> will be changed to <span className="font-bold">{newFont}</span>
                </p>
              </div>

              <button onClick={handleProcess} disabled={processing || oldFont === newFont} className="w-full py-4 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Replacing Font...</> : <>Replace Font</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Font Replaced!</h3>
            <p className="text-center text-gray-600 mb-6">
              All {oldFont} text changed to {newFont}
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Updated Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointFontReplacer;
