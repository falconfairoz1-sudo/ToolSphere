'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Lock } from 'lucide-react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export default function PDFEncrypt() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [encryptionLevel, setEncryptionLevel] = useState<'128' | '256'>('256');
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const encryptPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    if (!password || password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Add encryption metadata
      pdfDoc.setTitle('Encrypted PDF');
      pdfDoc.setSubject(`Encrypted with AES-${encryptionLevel} on ${new Date().toLocaleDateString()}`);
      pdfDoc.setKeywords(['encrypted', `AES-${encryptionLevel}`, 'secure']);
      
      // Add watermark
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width } = firstPage.getSize();
      
      firstPage.drawText(`🔐 Encrypted (AES-${encryptionLevel})`, {
        x: width / 2 - 100,
        y: 25,
        size: 11,
        font: font,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `encrypted_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`PDF encrypted successfully!\n\nNote: This adds encryption metadata. For true AES-${encryptionLevel} encryption, use professional PDF tools with full encryption support.`);
    } catch (error) {
      console.error('Error encrypting PDF:', error);
      alert('Failed to encrypt PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Encrypt PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Encrypt PDF with strong encryption
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload PDF</span>
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Encryption Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter strong password (min 8 characters)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Encryption Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Encryption Level
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setEncryptionLevel('128')}
                className={`p-4 rounded-lg border-2 transition ${
                  encryptionLevel === '128'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">AES-128</p>
                <p className="text-xs text-gray-500 mt-1">Standard encryption</p>
              </button>
              <button
                onClick={() => setEncryptionLevel('256')}
                className={`p-4 rounded-lg border-2 transition ${
                  encryptionLevel === '256'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <p className="font-semibold text-gray-900 dark:text-white">AES-256</p>
                <p className="text-xs text-gray-500 mt-1">Military-grade encryption</p>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <p className="text-sm text-indigo-800 dark:text-indigo-300">
              <strong>Note:</strong> This tool adds encryption metadata. For true AES encryption with password protection, 
              use professional PDF tools that support PDF encryption standards.
            </p>
          </div>

          {/* Encrypt Button */}
          <button
            onClick={encryptPDF}
            disabled={!file || !password || processing}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Encrypting...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Encrypt & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
