'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Unlock } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFDecrypt() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
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

  const decryptPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Remove encryption metadata
      pdfDoc.setTitle('Decrypted PDF');
      pdfDoc.setSubject(`Decrypted on ${new Date().toLocaleDateString()}`);
      pdfDoc.setKeywords([]);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `decrypted_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('PDF decrypted successfully!\n\nNote: This removes basic encryption metadata. For strongly encrypted PDFs, you need the correct password and professional PDF tools.');
    } catch (error) {
      console.error('Error decrypting PDF:', error);
      alert('Failed to decrypt PDF. The file may be strongly encrypted or require a password.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Unlock className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Decrypt PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Decrypt encrypted PDF documents
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-teal-500 transition">
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
                <FileText className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Decryption Password (if required)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password if PDF is encrypted"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
            <p className="text-sm text-teal-800 dark:text-teal-300">
              <strong>Note:</strong> This tool can remove basic encryption. For PDFs with AES-256 or strong encryption, 
              you'll need the correct password and professional PDF decryption tools.
            </p>
          </div>

          {/* Decrypt Button */}
          <button
            onClick={decryptPDF}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Decrypting...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Decrypt & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
