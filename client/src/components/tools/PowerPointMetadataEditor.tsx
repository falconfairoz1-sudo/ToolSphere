'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Info, CheckCircle } from 'lucide-react';

const PowerPointMetadataEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [metadata, setMetadata] = useState({
    title: 'Q4 Sales Report',
    author: 'John Doe',
    subject: 'Sales Analysis',
    keywords: 'sales, report, Q4, 2024',
    company: 'Acme Corp',
    comments: 'Internal use only',
  });

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Info className="w-12 h-12 text-sky-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Metadata Editor</h1>
          <p className="text-gray-600 text-lg">Edit presentation properties and information</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-metadata" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-metadata" 
            className="block border-3 border-dashed border-sky-300 rounded-xl p-12 text-center cursor-pointer hover:border-sky-500 bg-sky-50/50"
          >
            <Upload className="w-16 h-16 text-sky-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-sky-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-6">Edit Metadata</h3>
            <div className="space-y-4">
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {key === 'comments' ? (
                    <textarea
                      value={value}
                      onChange={(e) => setMetadata({ ...metadata, [key]: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setMetadata({ ...metadata, [key]: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleProcess} disabled={processing} className="w-full mt-6 py-4 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Saving Metadata...</> : <>Save Metadata</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Metadata Updated!</h3>
            <p className="text-center text-gray-600 mb-6">Presentation properties have been updated</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Updated Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointMetadataEditor;
