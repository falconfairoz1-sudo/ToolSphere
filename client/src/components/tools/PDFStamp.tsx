'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Stamp } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';

type StampType = 'approved' | 'draft' | 'confidential' | 'urgent' | 'final' | 'copy';

export default function PDFStamp() {
  const [file, setFile] = useState<File | null>(null);
  const [stampType, setStampType] = useState<StampType>('approved');
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

  const stamps = {
    approved: { text: 'APPROVED', color: rgb(0, 0.6, 0), emoji: '✓' },
    draft: { text: 'DRAFT', color: rgb(0.7, 0.7, 0.7), emoji: '📝' },
    confidential: { text: 'CONFIDENTIAL', color: rgb(0.8, 0, 0), emoji: '🔒' },
    urgent: { text: 'URGENT', color: rgb(1, 0.3, 0), emoji: '⚠️' },
    final: { text: 'FINAL', color: rgb(0, 0.4, 0.8), emoji: '✓' },
    copy: { text: 'COPY', color: rgb(0.5, 0.5, 0.5), emoji: '📄' },
  };

  const stampPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdfDoc.getPages();
      const stamp = stamps[stampType];
      
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        
        // Draw stamp background rectangle
        page.drawRectangle({
          x: width - 200,
          y: height - 80,
          width: 180,
          height: 50,
          borderColor: stamp.color,
          borderWidth: 3,
          opacity: 0.1,
        });
        
        // Draw stamp text
        page.drawText(`${stamp.emoji} ${stamp.text}`, {
          x: width - 185,
          y: height - 60,
          size: 24,
          font: font,
          color: stamp.color,
          opacity: 0.7,
        });
        
        // Add rotated watermark in center
        page.drawText(stamp.text, {
          x: width / 2 - 100,
          y: height / 2,
          size: 60,
          font: font,
          color: stamp.color,
          opacity: 0.1,
          rotate: degrees(-45),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${stampType}_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`${stamp.text} stamp added to PDF successfully!`);
    } catch (error) {
      console.error('Error stamping PDF:', error);
      alert('Failed to stamp PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Stamp className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Stamp PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add stamps like Approved, Draft, Confidential to your PDF
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition">
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
                <FileText className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stamp Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Stamp Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(Object.keys(stamps) as StampType[]).map((type) => {
                const stamp = stamps[type];
                return (
                  <button
                    key={type}
                    onClick={() => setStampType(type)}
                    className={`p-4 rounded-lg border-2 transition ${
                      stampType === type
                        ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-2xl mb-1">{stamp.emoji}</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">
                        {type}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          {file && (
            <div className="mb-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                Preview:
              </p>
              <div className="flex items-center justify-center">
                <div className="relative inline-block">
                  <div 
                    className="px-6 py-3 border-4 rounded-lg font-bold text-2xl"
                    style={{ 
                      borderColor: `rgb(${stamps[stampType].color.red * 255}, ${stamps[stampType].color.green * 255}, ${stamps[stampType].color.blue * 255})`,
                      color: `rgb(${stamps[stampType].color.red * 255}, ${stamps[stampType].color.green * 255}, ${stamps[stampType].color.blue * 255})`
                    }}
                  >
                    {stamps[stampType].emoji} {stamps[stampType].text}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stamp Button */}
          <button
            onClick={stampPDF}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Add Stamp & Download</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Professional</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
