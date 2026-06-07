'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Shield } from 'lucide-react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export default function PDFPermissions() {
  const [file, setFile] = useState<File | null>(null);
  const [allowPrint, setAllowPrint] = useState(true);
  const [allowEdit, setAllowEdit] = useState(true);
  const [allowCopy, setAllowCopy] = useState(true);
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

  const applyPermissions = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Add metadata about permissions
      const permissions = [];
      if (!allowPrint) permissions.push('No Printing');
      if (!allowEdit) permissions.push('No Editing');
      if (!allowCopy) permissions.push('No Copying');
      
      pdfDoc.setSubject(`Permissions: ${permissions.length > 0 ? permissions.join(', ') : 'All allowed'}`);
      pdfDoc.setKeywords(['restricted', 'permissions', ...permissions]);
      
      // Add watermark indicating restrictions
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width } = firstPage.getSize();
      
      if (permissions.length > 0) {
        firstPage.drawText(`🔒 Restricted: ${permissions.join(', ')}`, {
          x: width / 2 - 150,
          y: 20,
          size: 10,
          font: font,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `restricted_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Permissions applied successfully!\n\nNote: This adds metadata indicators. For true permission enforcement, use professional PDF tools with DRM support.');
    } catch (error) {
      console.error('Error applying permissions:', error);
      alert('Failed to apply permissions. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Permissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add permissions to restrict print, edit, and copy
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition">
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
                <FileText className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Permissions */}
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Set Permissions
            </h3>
            
            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={allowPrint}
                onChange={(e) => setAllowPrint(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">Allow Printing</p>
                <p className="text-sm text-gray-500">Users can print this PDF</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={allowEdit}
                onChange={(e) => setAllowEdit(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">Allow Editing</p>
                <p className="text-sm text-gray-500">Users can modify this PDF</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={allowCopy}
                onChange={(e) => setAllowCopy(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">Allow Copying</p>
                <p className="text-sm text-gray-500">Users can copy text and content</p>
              </div>
            </label>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <p className="text-sm text-purple-800 dark:text-purple-300">
              <strong>Note:</strong> This tool adds permission metadata. For true DRM and permission enforcement, 
              use professional PDF tools with security features.
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyPermissions}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Apply Permissions & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
