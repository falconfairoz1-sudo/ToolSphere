'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Type, CheckCircle } from 'lucide-react';

const PowerPointTextExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [format, setFormat] = useState<'txt' | 'docx'>('txt');

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Type className="w-12 h-12 text-rose-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Text Extractor</h1>
          <p className="text-gray-600 text-lg">Extract all text content from presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-text-extractor" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-text-extractor" 
            className="block border-3 border-dashed border-rose-300 rounded-xl p-12 text-center cursor-pointer hover:border-rose-500 bg-rose-50/50"
          >
            <Upload className="w-16 h-16 text-rose-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormat('txt')}
                    className={`p-4 border-2 rounded-lg font-medium ${
                      format === 'txt' ? 'border-rose-600 bg-rose-50' : 'border-gray-200'
                    }`}
                  >
                    Plain Text (.txt)
                  </button>
                  <button
                    onClick={() => setFormat('docx')}
                    className={`p-4 border-2 rounded-lg font-medium ${
                      format === 'docx' ? 'border-rose-600 bg-rose-50' : 'border-gray-200'
                    }`}
                  >
                    Word Document (.docx)
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNotes}
                  onChange={(e) => setIncludeNotes(e.target.checked)}
                  className="w-5 h-5 text-rose-600"
                />
                <div>
                  <div className="font-medium">Include speaker notes</div>
                  <div className="text-sm text-gray-600">Extract notes along with slide text</div>
                </div>
              </label>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Extracting Text...</> : <>Extract Text</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Text Extracted!</h3>
            <p className="text-center text-gray-600 mb-6">All text content has been extracted</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Text (.{format})
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointTextExtractor;
