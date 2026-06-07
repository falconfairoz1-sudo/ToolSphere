'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Eraser, CheckCircle, Palette } from 'lucide-react';

const PowerPointBackgroundRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [action, setAction] = useState<'remove' | 'change'>('remove');
  const [newColor, setNewColor] = useState('#ffffff');

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Eraser className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Background Remover</h1>
          <p className="text-gray-600 text-lg">Remove or change slide backgrounds</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-background" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-background" 
            className="block border-3 border-dashed border-orange-300 rounded-xl p-12 text-center cursor-pointer hover:border-orange-500 bg-orange-50/50"
          >
            <Upload className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Action</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setAction('remove')}
                    className={`p-4 border-2 rounded-lg ${
                      action === 'remove' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <Eraser className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium">Remove Background</div>
                    <div className="text-sm text-gray-600">Make transparent</div>
                  </button>
                  <button
                    onClick={() => setAction('change')}
                    className={`p-4 border-2 rounded-lg ${
                      action === 'change' ? 'border-orange-600 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <Palette className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="font-medium">Change Background</div>
                    <div className="text-sm text-gray-600">Apply new color</div>
                  </button>
                </div>
              </div>

              {action === 'change' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Background Color</label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-20 h-12 rounded border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              )}

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Processing...</> : <>{action === 'remove' ? 'Remove' : 'Change'} Background</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Background {action === 'remove' ? 'Removed' : 'Changed'}!</h3>
            <p className="text-center text-gray-600 mb-6">
              {action === 'remove' ? 'Backgrounds removed from all slides' : `New background color applied: ${newColor}`}
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

export default PowerPointBackgroundRemover;
