'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Pause, CheckCircle } from 'lucide-react';

const PowerPointAnimationRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [removeTransitions, setRemoveTransitions] = useState(true);
  const [removeAnimations, setRemoveAnimations] = useState(true);
  const [animationCount] = useState(45);
  const [transitionCount] = useState(23);

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Pause className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Animation Remover</h1>
          <p className="text-gray-600 text-lg">Remove animations and transitions from slides</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-animation" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-animation" 
            className="block border-3 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-gray-500 bg-gray-50/50"
          >
            <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{animationCount}</div>
                <div className="text-sm text-gray-600">Animations Found</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{transitionCount}</div>
                <div className="text-sm text-gray-600">Transitions Found</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeAnimations}
                  onChange={(e) => setRemoveAnimations(e.target.checked)}
                  className="mt-1 w-5 h-5"
                />
                <div>
                  <div className="font-medium">Remove Object Animations</div>
                  <div className="text-sm text-gray-600">Remove entrance, exit, and emphasis effects</div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeTransitions}
                  onChange={(e) => setRemoveTransitions(e.target.checked)}
                  className="mt-1 w-5 h-5"
                />
                <div>
                  <div className="font-medium">Remove Slide Transitions</div>
                  <div className="text-sm text-gray-600">Remove transitions between slides</div>
                </div>
              </label>
            </div>

            <button
              onClick={handleProcess}
              disabled={processing || (!removeAnimations && !removeTransitions)}
              className="w-full py-4 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? <><Loader2 className="w-6 h-6 animate-spin" />Removing...</> : <>Remove Selected Effects</>}
            </button>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Effects Removed!</h3>
            <p className="text-center text-gray-600 mb-6">
              {removeAnimations && `${animationCount} animations`}
              {removeAnimations && removeTransitions && ' and '}
              {removeTransitions && `${transitionCount} transitions`} removed
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />Download Clean Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointAnimationRemover;
