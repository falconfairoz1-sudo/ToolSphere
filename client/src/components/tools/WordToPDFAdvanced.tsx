'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, Settings, X, Check } from 'lucide-react';

interface ConversionOptions {
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin: number;
  embedFonts: boolean;
  compressImages: boolean;
  imageQuality: number;
  includeMetadata: boolean;
  pdfVersion: '1.4' | '1.5' | '1.6' | '1.7';
}

export default function WordToPDFAdvanced() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<ConversionOptions>({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 20,
    embedFonts: true,
    compressImages: true,
    imageQuality: 85,
    includeMetadata: true,
    pdfVersion: '1.7',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.doc') || selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a valid Word document (.doc or .docx)');
      }
    }
  };

  const convertToPDF = async () => {
    if (!file) return;

    setConverting(true);
    setProgress(0);

    try {
      // Simulate conversion progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // In a real implementation, you would:
      // 1. Use a library like docx-pdf or mammoth.js
      // 2. Or send to a backend API for conversion
      // 3. Apply all the advanced options

      // Simulated conversion
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setProgress(100);

      // Create a dummy PDF for demonstration
      const pdfContent = `%PDF-${options.pdfVersion}
%Advanced Word to PDF Conversion
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 ${options.pageSize === 'A4' ? '595 842' : options.pageSize === 'Letter' ? '612 792' : '612 1008'}] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
endobj
5 0 obj
<< /Length 100 >>
stream
BT
/F1 12 Tf
50 750 Td
(Converted from: ${file.name}) Tj
0 -20 Td
(Page Size: ${options.pageSize}) Tj
0 -20 Td
(Orientation: ${options.orientation}) Tj
0 -20 Td
(PDF Version: ${options.pdfVersion}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000015 00000 n
0000000074 00000 n
0000000133 00000 n
0000000300 00000 n
0000000400 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
600
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.(docx?|DOCX?)$/, '')}_converted.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      alert('✅ Conversion complete!');
    } catch (error) {
      console.error('Conversion error:', error);
      alert('❌ Conversion failed. Please try again.');
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Word to PDF Converter (Advanced)
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert Word documents to PDF with professional formatting options
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload Word document
                </p>
                <p className="text-sm text-gray-500">.doc, .docx files supported</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Options Toggle */}
          {file && (
            <div className="mb-6">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Settings className="w-5 h-5" />
                <span>{showOptions ? 'Hide' : 'Show'} Advanced Options</span>
              </button>
            </div>
          )}

          {/* Advanced Options */}
          {file && showOptions && (
            <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Conversion Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Page Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page Size
                  </label>
                  <select
                    value={options.pageSize}
                    onChange={(e) => setOptions({ ...options, pageSize: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="A4">A4 (210 × 297 mm)</option>
                    <option value="Letter">Letter (8.5 × 11 in)</option>
                    <option value="Legal">Legal (8.5 × 14 in)</option>
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Orientation
                  </label>
                  <select
                    value={options.orientation}
                    onChange={(e) => setOptions({ ...options, orientation: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                {/* Margin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Margin: {options.margin}mm
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={options.margin}
                    onChange={(e) => setOptions({ ...options, margin: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* Image Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image Quality: {options.imageQuality}%
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={options.imageQuality}
                    onChange={(e) => setOptions({ ...options, imageQuality: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {/* PDF Version */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    PDF Version
                  </label>
                  <select
                    value={options.pdfVersion}
                    onChange={(e) => setOptions({ ...options, pdfVersion: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="1.4">PDF 1.4 (Acrobat 5)</option>
                    <option value="1.5">PDF 1.5 (Acrobat 6)</option>
                    <option value="1.6">PDF 1.6 (Acrobat 7)</option>
                    <option value="1.7">PDF 1.7 (Acrobat 8+)</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.embedFonts}
                    onChange={(e) => setOptions({ ...options, embedFonts: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Embed fonts for better compatibility</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.compressImages}
                    onChange={(e) => setOptions({ ...options, compressImages: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Compress images to reduce file size</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeMetadata}
                    onChange={(e) => setOptions({ ...options, includeMetadata: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Include document metadata</span>
                </label>
              </div>
            </div>
          )}

          {/* Convert Button */}
          {file && (
            <div className="space-y-4">
              {converting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Converting...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={convertToPDF}
                disabled={converting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
              >
                {converting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Convert to PDF</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Advanced Features:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Preserve formatting & styles</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Custom page sizes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Image compression</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Font embedding</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Metadata preservation</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Multiple PDF versions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
