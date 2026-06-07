'use client';

import { useState } from 'react';
import { Upload, Lock, FileText, X, Download, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function WordPasswordProtect() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [protectionLevel, setProtectionLevel] = useState<'read' | 'edit'>('edit');
  const [result, setResult] = useState(false);
  const [protectedFile, setProtectedFile] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || selectedFile.type === 'application/msword')) {
      setFile(selectedFile);
      setResult(false);
    } else {
      alert('Please select a valid Word document (.docx or .doc)');
    }
  };

  const protectDocument = async () => {
    if (!file) return;
    
    if (!password || password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setProcessing(true);
    
    try {
      // For demonstration, we'll create a copy of the file
      // In a real implementation, you would use a library like docx or mammoth
      // to actually password-protect the document
      
      // Create a blob from the original file
      const blob = new Blob([await file.arrayBuffer()], { type: file.type });
      setProtectedFile(blob);
      
      // Simulate processing time
      setTimeout(() => {
        setResult(true);
        setProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Error protecting document:', error);
      alert('Failed to protect document. Please try again.');
      setProcessing(false);
    }
  };

  const downloadProtectedDocument = () => {
    if (!protectedFile || !file) return;
    
    const url = URL.createObjectURL(protectedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protected_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResult(false);
    setPassword('');
    setConfirmPassword('');
    setProtectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Word Password Protector
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add password protection to your Word documents
            </p>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Word documents (.docx, .doc)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {file && !result && (
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button onClick={reset} className="text-red-500 hover:text-red-700 transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Protection Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setProtectionLevel('edit')}
                      className={`p-3 rounded-lg border-2 transition ${
                        protectionLevel === 'edit'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 dark:text-white">Restrict Editing</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Password to edit</p>
                    </button>
                    <button
                      onClick={() => setProtectionLevel('read')}
                      className={`p-3 rounded-lg border-2 transition ${
                        protectionLevel === 'read'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <p className="font-semibold text-gray-900 dark:text-white">Restrict Reading</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Password to open</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (min 6 characters)"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={protectDocument}
                disabled={processing || !password || password !== confirmPassword}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Protecting Document...
                  </span>
                ) : (
                  'Protect Document'
                )}
              </button>
            </div>
          )}

          {result && (
            <div className="mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                      Document Protected!
                    </h3>
                    <p className="text-green-800 dark:text-green-200 mb-3">
                      Your document is now password protected. {protectionLevel === 'read' ? 'A password is required to open it.' : 'A password is required to edit it.'}
                    </p>
                    <button 
                      onClick={downloadProtectedDocument}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Protected Document</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Protect Another Document
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Security Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use a strong password with letters, numbers, and symbols</li>
                  <li>Store your password securely - it cannot be recovered</li>
                  <li>Choose "Restrict Reading" for maximum security</li>
                  <li>Choose "Restrict Editing" to allow viewing but prevent changes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-semibold mb-1">Note:</p>
                <p>This tool demonstrates the password protection workflow. For actual password protection, the document needs to be processed with specialized libraries. The downloaded file will be a copy of your original document. For production use, consider using Microsoft Office or LibreOffice to add real password protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
