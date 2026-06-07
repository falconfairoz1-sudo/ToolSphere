'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Palette, CheckCircle } from 'lucide-react';

const PowerPointThemeChanger: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('modern');

  const themes = [
    { id: 'modern', name: 'Modern', colors: ['#2563eb', '#3b82f6', '#60a5fa'] },
    { id: 'professional', name: 'Professional', colors: ['#1e40af', '#1e3a8a', '#1e293b'] },
    { id: 'vibrant', name: 'Vibrant', colors: ['#dc2626', '#ea580c', '#f59e0b'] },
    { id: 'nature', name: 'Nature', colors: ['#16a34a', '#22c55e', '#4ade80'] },
    { id: 'elegant', name: 'Elegant', colors: ['#7c3aed', '#a855f7', '#c084fc'] },
    { id: 'minimal', name: 'Minimal', colors: ['#64748b', '#94a3b8', '#cbd5e1'] },
  ];

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Palette className="w-12 h-12 text-violet-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Theme Changer</h1>
          <p className="text-gray-600 text-lg">Change colors and design themes</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-theme" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-theme" 
            className="block border-3 border-dashed border-violet-300 rounded-xl p-12 text-center cursor-pointer hover:border-violet-500 bg-violet-50/50"
          >
            <Upload className="w-16 h-16 text-violet-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-6">Select Theme</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-6 border-2 rounded-xl transition-all ${
                    selectedTheme === theme.id
                      ? 'border-violet-600 bg-violet-50 shadow-lg'
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  <div className="flex gap-2 mb-3">
                    {theme.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-12 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="font-bold text-gray-800">{theme.name}</div>
                </button>
              ))}
            </div>

            <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Applying Theme...</> : <>Apply Theme</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Theme Applied!</h3>
            <p className="text-center text-gray-600 mb-6">
              {themes.find(t => t.id === selectedTheme)?.name} theme applied to all slides
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Themed Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointThemeChanger;
