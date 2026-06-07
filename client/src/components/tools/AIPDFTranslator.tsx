'use client';

import { useState } from 'react';
import { Upload, FileText, Languages, Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function AIPDFTranslator() {
  const [file, setFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translating, setTranslating] = useState(false);
  const [translated, setTranslated] = useState(false);

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setTranslated(false);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const translatePDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setTranslating(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      // Simulate AI translation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const selectedLang = languages.find(l => l.code === targetLanguage);
      alert(`✓ PDF translated to ${selectedLang?.name}!\n\nNote: This is a simulated translation. For production use, integrate with AI translation services like Google Translate API, DeepL, or OpenAI GPT for accurate document translation.`);
      
      setTranslated(true);
    } catch (error) {
      console.error('Error translating PDF:', error);
      alert('Failed to translate PDF. Please try again.');
    } finally {
      setTranslating(false);
    }
  };

  const downloadTranslated = () => {
    if (!file) return;
    const selectedLang = languages.find(l => l.code === targetLanguage);
    alert(`Download would start for: ${file.name.replace('.pdf', '')}_${selectedLang?.code}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Languages className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI PDF Translator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Translate PDF documents to different languages using AI
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
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
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Translate Button */}
          <button
            onClick={translatePDF}
            disabled={!file || translating}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-4"
          >
            {translating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Translating with AI...</span>
              </>
            ) : (
              <>
                <Languages className="w-5 h-5" />
                <span>Translate PDF</span>
              </>
            )}
          </button>

          {/* Download Button */}
          {translated && (
            <button
              onClick={downloadTranslated}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Translated PDF</span>
            </button>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">12+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accurate</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is a simulated AI translation tool. For production use, integrate with professional translation services like Google Translate API, DeepL, Microsoft Translator, or OpenAI GPT for accurate document translation with proper formatting preservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
