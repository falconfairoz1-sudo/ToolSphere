'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Layout, CheckCircle } from 'lucide-react';

const PowerPointTemplateCreator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [templateName, setTemplateName] = useState('My Custom Template');
  const [includeLayouts, setIncludeLayouts] = useState(true);
  const [includeTheme, setIncludeTheme] = useState(true);
  const [includeMaster, setIncludeMaster] = useState(true);

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Layout className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Template Creator</h1>
          <p className="text-gray-600 text-lg">Create reusable PowerPoint templates</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-template" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-template" 
            className="block border-3 border-dashed border-teal-300 rounded-xl p-12 text-center cursor-pointer hover:border-teal-500 bg-teal-50/50"
          >
            <Upload className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <p className="text-sm text-gray-600 mb-4">Use as base for template</p>
            <span className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Template Components</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeMaster}
                      onChange={(e) => setIncludeMaster(e.target.checked)}
                      className="mt-1 w-5 h-5"
                    />
                    <div>
                      <div className="font-medium">Master Slides</div>
                      <div className="text-sm text-gray-600">Include slide master and layouts</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTheme}
                      onChange={(e) => setIncludeTheme(e.target.checked)}
                      className="mt-1 w-5 h-5"
                    />
                    <div>
                      <div className="font-medium">Theme Colors & Fonts</div>
                      <div className="text-sm text-gray-600">Include color scheme and font settings</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLayouts}
                      onChange={(e) => setIncludeLayouts(e.target.checked)}
                      className="mt-1 w-5 h-5"
                    />
                    <div>
                      <div className="font-medium">Custom Layouts</div>
                      <div className="text-sm text-gray-600">Include all custom slide layouts</div>
                    </div>
                  </label>
                </div>
              </div>

              <button onClick={handleProcess} disabled={processing} className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Creating Template...</> : <>Create Template</>}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Template Created!</h3>
            <p className="text-center text-gray-600 mb-6">
              "{templateName}" is ready to use
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Template (.potx)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointTemplateCreator;
