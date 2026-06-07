'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, X, CheckCircle, Loader2, Presentation } from 'lucide-react';

const PDFToPowerPoint: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState<string[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.pdf'));
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleConvert = async () => {
    setConverting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConverted(files.map(f => f.name.replace('.pdf', '.pptx')));
    setConverting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Presentation className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PDF to PowerPoint</h1>
          <p className="text-gray-600 text-lg">Convert PDF to editable PPTX presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="border-3 border-dashed border-red-300 rounded-xl p-12 text-center hover:border-red-500 transition-colors cursor-pointer bg-red-50/50">
            <input type="file" id="file-upload" className="hidden" accept=".pdf" multiple onChange={handleFileSelect} />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Drop PDF files here</h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-700">
                Select Files
              </button>
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Files ({files.length})</h3>
            <div className="space-y-3">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-600" />
                    <span className="font-medium text-gray-800">{file.name}</span>
                  </div>
                  <button onClick={() => setFiles(files.filter((_, i) => i !== idx))} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleConvert} disabled={converting} className="w-full mt-6 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {converting ? <><Loader2 className="w-6 h-6 animate-spin" />Converting...</> : <>Convert to PowerPoint</>}
            </button>
          </div>
        )}

        {converted.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Conversion Complete!</h3>
            {converted.map((name, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-green-50 rounded-lg mb-3">
                <span className="font-medium">{name}</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Download className="w-5 h-5" />Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFToPowerPoint;
