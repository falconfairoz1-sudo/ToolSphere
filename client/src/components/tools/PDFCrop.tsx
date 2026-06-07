'use client';

import { useState } from 'react';
import { Upload, FileText, Crop, Info } from 'lucide-react';

export default function PDFCrop() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Crop className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Crop
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Crop PDF pages to remove margins and unwanted areas
            </p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-semibold mb-1">Coming Soon!</p>
              <p>PDF cropping functionality is under development. For now, you can use these recommended services:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><a href="https://www.ilovepdf.com/crop_pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">iLovePDF Crop</a></li>
                <li><a href="https://www.pdf2go.com/crop-pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">PDF2Go Crop</a></li>
                <li><a href="https://smallpdf.com/crop-pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Smallpdf Crop</a></li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition opacity-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Feature Coming Soon</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF cropping will be available in the next update
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                disabled
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
