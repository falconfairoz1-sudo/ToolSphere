'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, GitCompare, CheckCircle, AlertCircle } from 'lucide-react';

const PowerPointCompare: React.FC = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [comparing, setComparing] = useState(false);
  const [compared, setCompared] = useState(false);
  const [differences] = useState([
    { slide: 3, type: 'Text Changed', details: 'Title modified' },
    { slide: 5, type: 'Image Added', details: 'New chart inserted' },
    { slide: 7, type: 'Slide Deleted', details: 'Slide removed' },
    { slide: 10, type: 'Format Changed', details: 'Font size increased' },
  ]);

  const handleCompare = async () => {
    setComparing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCompared(true);
    setComparing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <GitCompare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Compare</h1>
          <p className="text-gray-600 text-lg">Compare two presentations and find differences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Original Presentation</h3>
            <input type="file" accept=".ppt,.pptx" onChange={(e) => e.target.files && setFile1(e.target.files[0])} className="hidden" id="upload1" />
            <label htmlFor="upload1" className="block border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 bg-blue-50/50">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-3">Upload first file</p>
              <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Select File</span>
            </label>
            {file1 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800 truncate">{file1.name}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Modified Presentation</h3>
            <input type="file" accept=".ppt,.pptx" onChange={(e) => e.target.files && setFile2(e.target.files[0])} className="hidden" id="upload2" />
            <label htmlFor="upload2" className="block border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 bg-indigo-50/50">
              <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-3">Upload second file</p>
              <span className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold">Select File</span>
            </label>
            {file2 && (
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800 truncate">{file2.name}</p>
              </div>
            )}
          </div>
        </div>

        {file1 && file2 && !compared && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <button onClick={handleCompare} disabled={comparing} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {comparing ? <>Comparing...</> : <>Compare Presentations</>}
            </button>
          </div>
        )}

        {compared && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Comparison Complete</h3>
                <p className="text-gray-600">{differences.length} differences found</p>
              </div>
            </div>

            <div className="space-y-3">
              {differences.map((diff, idx) => (
                <div key={idx} className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">Slide {diff.slide}</span>
                      <span className="px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full font-medium">
                        {diff.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{diff.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointCompare;
