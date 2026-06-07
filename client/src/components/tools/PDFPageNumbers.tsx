'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Hash } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PDFPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const addPageNumbers = async () => {
    if (!file) return;

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = `${index + 1}`;
        const textWidth = font.widthOfTextAtSize(pageNumber, 12);

        let x = width / 2 - textWidth / 2; // center
        if (position === 'bottom-right') x = width - 50;
        if (position === 'bottom-left') x = 30;

        page.drawText(pageNumber, {
          x,
          y: 30,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_numbered.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      alert('Page numbers added successfully!');
    } catch (error) {
      console.error('Error adding page numbers:', error);
      alert('Failed to add page numbers. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Hash className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Page Numbers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add page numbers to your PDF document
            </p>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
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
          )}

          {file && (
            <div className="mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Position:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'bottom-left', label: 'Bottom Left' },
                    { value: 'bottom-center', label: 'Bottom Center' },
                    { value: 'bottom-right', label: 'Bottom Right' },
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() => setPosition(pos.value as any)}
                      className={`py-3 px-4 rounded-lg font-semibold transition ${
                        position === pos.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={addPageNumbers}
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Numbers...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download with Page Numbers</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
