'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Unlock, CheckCircle, AlertCircle } from 'lucide-react';

const PowerPointPasswordRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleProcess = async () => {
    setProcessing(true);
    setError('');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate password verification
    if (password.length < 3) {
      setError('Incorrect password. Please try again.');
      setProcessing(false);
      return;
    }
    
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Unlock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Password Remover</h1>
          <p className="text-gray-600 text-lg">Remove password protection from presentations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-password-remove" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-password-remove" 
            className="block border-3 border-dashed border-emerald-300 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-500 bg-emerald-50/50"
          >
            <Upload className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Protected PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="p-4 bg-emerald-50 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <Presentation className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">Password protected</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
                {error && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Important:</p>
                  <p>You must know the current password to remove protection. This tool cannot crack or bypass passwords.</p>
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={processing || !password}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Removing Protection...
                  </>
                ) : (
                  <>
                    <Unlock className="w-6 h-6" />
                    Remove Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Password Removed!</h3>
            <p className="text-center text-gray-600 mb-6">
              Your presentation is now unprotected and can be opened without a password
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Unprotected Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointPasswordRemover;
