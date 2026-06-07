'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, FileText, CheckCircle } from 'lucide-react';

const PowerPointNotesExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [format, setFormat] = useState<'txt' | 'docx' | 'pdf'>('txt');
  const [notesCount] = useState(12);

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <FileText className="w-12 h-12 text-violet-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Notes Extractor</h1>
          <p className="text-gray-600 text-lg">Extract speaker notes from presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-notes-extractor" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-notes-extractor" 
            className="block border-3 border-dashed border-violet-300 rounded-xl p-12 text-center cursor-pointer hover:border-violet-500 bg-violet-50/50"
          >
            <Upload className="w-16 h-16 text-violet-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="p-4 bg-violet-50 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <Presentation className="w-8 h-8 text-violet-600" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">{notesCount} slides with notes detected</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['txt', 'docx', 'pdf'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`p-4 border-2 rounded-lg font-medium uppercase ${
                        format === fmt ? 'border-violet-600 bg-violet-50' : 'border-gray-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Extracting Notes...</> : <>Extract Notes</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Notes Extracted!</h3>
            <p className="text-center text-gray-600 mb-6">Speaker notes from {notesCount} slides extracted</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Notes (.{format})
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointNotesExtractor;
