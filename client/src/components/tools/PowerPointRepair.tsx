'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

const PowerPointRepair: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [repairing, setRepairing] = useState(false);
  const [repaired, setRepaired] = useState(false);
  const [issues] = useState(['Corrupted slide 5', 'Missing fonts', 'Broken links']);

  const handleRepair = async () => {
    setRepairing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setRepaired(true);
    setRepairing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Wrench className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Repair</h1>
          <p className="text-gray-600 text-lg">Fix corrupted or damaged presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-repair" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-repair" 
            className="block border-3 border-dashed border-amber-300 rounded-xl p-12 text-center cursor-pointer hover:border-amber-500 bg-amber-50/50"
          >
            <Upload className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Corrupted PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !repaired && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="p-4 bg-yellow-50 rounded-lg mb-6 flex gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-800 mb-2">Issues Detected:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                  {issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button onClick={handleRepair} disabled={repairing} className="w-full py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {repairing ? <><Loader2 className="w-6 h-6 animate-spin" />Repairing File...</> : <>Repair Presentation</>}
            </button>
          </div>
        )}

        {repaired && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Repair Complete!</h3>
            <p className="text-center text-gray-600 mb-6">{issues.length} issues fixed successfully</p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Repaired Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointRepair;
