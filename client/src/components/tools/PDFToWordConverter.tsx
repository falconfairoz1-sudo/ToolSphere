'use client';

import { useState } from 'react';
import { Upload, FileText, X, Download, AlertCircle, ExternalLink } from 'lucide-react';

export default function PDFToWordConverter() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const reset = () => {
    setFile(null);
  };

  const services = [
    {
      name: 'Adobe Acrobat',
      url: 'https://www.adobe.com/acrobat/online/pdf-to-word.html',
      description: 'Official Adobe converter with high accuracy',
      features: ['High quality', 'Preserves formatting', 'Free trial']
    },
    {
      name: 'Smallpdf',
      url: 'https://smallpdf.com/pdf-to-word',
      description: 'Popular online converter',
      features: ['Easy to use', 'Fast conversion', 'Free']
    },
    {
      name: 'iLovePDF',
      url: 'https://www.ilovepdf.com/pdf_to_word',
      description: 'Free PDF to Word converter',
      features: ['No registration', 'Batch conversion', 'Free']
    },
    {
      name: 'Zamzar',
      url: 'https://www.zamzar.com/convert/pdf-to-docx/',
      description: 'File conversion service',
      features: ['Multiple formats', 'Email delivery', 'Free']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF to Word Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert PDF files to editable Word documents
            </p>
          </div>

          {!file && (
            <div className="mb-8">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF files (.pdf)
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
          )}

          {file && (
            <div className="mb-8">
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
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended Conversion Services
            </h2>
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Conversion Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Best results with text-based PDFs (not scanned images)</li>
                  <li>Complex layouts may require manual adjustment</li>
                  <li>Tables and images are usually preserved</li>
                  <li>Review the converted document for accuracy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
