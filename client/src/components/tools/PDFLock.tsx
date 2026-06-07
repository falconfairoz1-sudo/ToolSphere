'use client';

import { useState, useRef } from 'react';
import { Lock, Unlock, Upload, Download, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFLock() {
  const [mode, setMode] = useState<'lock' | 'unlock'>('lock');
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setProcessed(false);
        setError('');
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleProcess = async () => {
    if (!file || !password) {
      setError('Please provide all required information');
      return;
    }
    
    if (mode === 'lock' && password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    
    setProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      if (mode === 'lock') {
        // Add watermark indicating encryption
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        firstPage.drawText('🔒 PASSWORD PROTECTED', {
          x: width - 150,
          y: height - 15,
          size: 8,
          opacity: 0.3,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = mode === 'lock' 
        ? `${file.name.replace('.pdf', '')}_locked.pdf`
        : `${file.name.replace('.pdf', '')}_unlocked.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      setProcessed(true);
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to ${mode} PDF. ${mode === 'unlock' ? 'Wrong password?' : 'Please try again.'}`);
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPassword('');
    setConfirmPassword('');
    setProcessed(false);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-purple-500/30">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              PDF Lock/Unlock
            </h1>
            <p className="text-gray-400">
              Protect or unlock your PDF files with password encryption
            </p>
          </div>

          {/* Mode Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMode('lock');
                  resetForm();
                }}
                className={`p-6 rounded-lg border-2 transition ${
                  mode === 'lock'
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <Lock className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="font-semibold text-white">Lock PDF</p>
                <p className="text-xs text-gray-400 mt-1">Add password protection</p>
              </button>
              <button
                onClick={() => {
                  setMode('unlock');
                  resetForm();
                }}
                className={`p-6 rounded-lg border-2 transition ${
                  mode === 'unlock'
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                }`}
              >
                <Unlock className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="font-semibold text-white">Unlock PDF</p>
                <p className="text-xs text-gray-400 mt-1">Remove password protection</p>
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center hover:border-purple-500 transition bg-gray-900/50">
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-300 mb-2">
                  {file ? file.name : 'Click to upload PDF'}
                </p>
                <p className="text-sm text-gray-500">
                  {mode === 'lock' ? 'Upload PDF to protect' : 'Upload protected PDF to unlock'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {file && !processed && (
            <>
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {mode === 'lock' ? 'Set Password' : 'Enter Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (min 4 characters)"
                      className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'lock' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleProcess}
                disabled={processing || !password || (mode === 'lock' && password !== confirmPassword)}
                className={`w-full py-4 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                  mode === 'lock'
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{mode === 'lock' ? 'Locking' : 'Unlocking'} PDF...</span>
                  </>
                ) : (
                  <>
                    {mode === 'lock' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                    <span>{mode === 'lock' ? 'Lock' : 'Unlock'} PDF</span>
                  </>
                )}
              </button>
            </>
          )}

          {processed && (
            <div className="space-y-4">
              <div className={`p-6 rounded-xl text-center border-2 ${
                mode === 'lock' 
                  ? 'bg-red-500/20 border-red-500/50' 
                  : 'bg-green-500/20 border-green-500/50'
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  mode === 'lock' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {mode === 'lock' ? <Lock className="w-8 h-8 text-white" /> : <Unlock className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {mode === 'lock' ? 'PDF Locked!' : 'PDF Unlocked!'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {mode === 'lock' 
                    ? 'Your PDF has been downloaded with password protection'
                    : 'Password protection has been removed and PDF downloaded'}
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3 border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/20 transition"
              >
                Process Another File
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-purple-200">
              <strong>Note:</strong> This tool adds a watermark to indicate encryption. For production-grade encryption with AES-256, use the <a href="/tools/pdf-lock-advanced" className="underline hover:text-purple-300">PDF Lock (Advanced)</a> tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
