'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Printer, CheckCircle } from 'lucide-react';

const PowerPointHandoutGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [slidesPerPage, setSlidesPerPage] = useState<'1' | '2' | '3' | '4' | '6' | '9'>('3');
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeDate, setIncludeDate] = useState(true);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Printer className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Handout Generator</h1>
          <p className="text-gray-600 text-lg">Create printable handouts from presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-handout" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-handout" 
            className="block border-3 border-dashed border-purple-300 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 bg-purple-50/50"
          >
            <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Slides Per Page</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['1', '2', '3', '4', '6', '9'] as const).map((num) => (
                    <button
                      key={num}
                      onClick={() => setSlidesPerPage(num)}
                      className={`p-4 border-2 rounded-lg font-bold text-lg ${
                        slidesPerPage === num ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Page Orientation</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setOrientation('portrait')}
                    className={`p-4 border-2 rounded-lg ${
                      orientation === 'portrait' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-16 h-20 bg-gray-200 rounded mx-auto mb-2"></div>
                    <div className="font-medium">Portrait</div>
                  </button>
                  <button
                    onClick={() => setOrientation('landscape')}
                    className={`p-4 border-2 rounded-lg ${
                      orientation === 'landscape' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-20 h-16 bg-gray-200 rounded mx-auto mb-2"></div>
                    <div className="font-medium">Landscape</div>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNotes}
                    onChange={(e) => setIncludeNotes(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="font-medium">Include notes section</div>
                    <div className="text-sm text-gray-600">Add space for taking notes</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDate}
                    onChange={(e) => setIncludeDate(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="font-medium">Include date and page numbers</div>
                    <div className="text-sm text-gray-600">Add header/footer information</div>
                  </div>
                </label>
              </div>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Generating Handout...</> : <>Generate Handout</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Handout Generated!</h3>
            <p className="text-center text-gray-600 mb-6">
              {slidesPerPage} slides per page in {orientation} format
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Handout (PDF)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointHandoutGenerator;
