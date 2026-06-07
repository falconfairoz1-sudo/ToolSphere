'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Wrench, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFRepair() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [repaired, setRepaired] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setRepaired(false);
    }
  };

  const repairPDF = async () => {
    if (!file) return;

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Save the PDF (this can fix some corruption issues)
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_repaired.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      setRepaired(true);
      alert('PDF repaired successfully!');
    } catch (error) {
      console.error('Error repairing PDF:', error);
      alert('Failed to repair PDF. The file may be too corrupted or encrypted.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Wrench className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Repair
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Repair corrupted or damaged PDF files
            </p>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <p className="font-semibold mb-1">Note:</p>
              <p>This tool can fix minor PDF corruption issues. For severely damaged files, professional recovery tools may be needed.</p>
            </div>
          </div>

          {!file && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload corrupted PDF</span>
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
                  <FileText className="w-8 h-8 text-orange-600" />
                  <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>

              <button
                onClick={repairPDF}
                disabled={processing || repaired}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Repairing PDF...</span>
                  </>
                ) : repaired ? (
                  <>
                    <span>✓ PDF Repaired</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-5 h-5" />
                    <span>Repair PDF</span>
                  </>
                )}
              </button>

              {repaired && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    ✓ PDF has been repaired and downloaded. Try opening it to verify the repair was successful.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
