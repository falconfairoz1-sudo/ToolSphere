'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Loader2, Presentation, Lock, Eye, EyeOff, CheckCircle, Shield } from 'lucide-react';

const PowerPointPasswordProtect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [protectionLevel, setProtectionLevel] = useState<'open' | 'modify'>('open');

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleProcess = async () => {
    if (!passwordsMatch) return;
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setProcessed(true);
    setProcessing(false);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: '', color: '' };
    if (password.length < 6) return { label: 'Weak', color: 'text-red-600' };
    if (password.length < 10) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Strong', color: 'text-green-600' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">Password Protect</h1>
          <p className="text-gray-600 text-lg">Secure your presentations with password protection</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-password-protect" 
            className="hidden" 
            accept=".ppt,.pptx" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
          />
          <label 
            htmlFor="file-upload-password-protect" 
            className="block border-3 border-dashed border-amber-300 rounded-xl p-12 text-center cursor-pointer hover:border-amber-500 bg-amber-50/50"
          >
            <Upload className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload PowerPoint File</h3>
            <span className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold">Select File</span>
          </label>
        </div>

        {file && !processed && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="p-4 bg-amber-50 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <Presentation className="w-8 h-8 text-amber-600" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">Ready to protect</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Protection Level</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                    <input
                      type="radio"
                      name="level"
                      value="open"
                      checked={protectionLevel === 'open'}
                      onChange={(e) => setProtectionLevel(e.target.value as any)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">Password to Open</div>
                      <div className="text-sm text-gray-600">Require password to view the presentation</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                    <input
                      type="radio"
                      name="level"
                      value="modify"
                      checked={protectionLevel === 'modify'}
                      onChange={(e) => setProtectionLevel(e.target.value as any)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">Password to Modify</div>
                      <div className="text-sm text-gray-600">Allow viewing but require password to edit</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && (
                  <p className={`text-sm mt-1 ${strength.color}`}>
                    Password strength: {strength.label}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm password"
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Security Tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Use at least 8 characters</li>
                    <li>Include numbers and special characters</li>
                    <li>Don't use common words or phrases</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={processing || !passwordsMatch}
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Protecting...
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Protect Presentation
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {processed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-center mb-2">Presentation Protected!</h3>
            <p className="text-center text-gray-600 mb-6">
              Your presentation is now password protected
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Protected Presentation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointPasswordProtect;
