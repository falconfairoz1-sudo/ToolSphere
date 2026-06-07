'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Mail, PenTool } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PDFRequestSignature() {
  const [file, setFile] = useState<File | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
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

  const requestSignature = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    if (!recipientEmail || !recipientName) {
      alert('Please enter recipient details');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];
      const { width, height } = lastPage.getSize();
      
      // Add signature request box
      lastPage.drawRectangle({
        x: 50,
        y: 100,
        width: width - 100,
        height: 120,
        borderColor: rgb(0.2, 0.4, 0.8),
        borderWidth: 2,
      });
      
      lastPage.drawText('✍️ SIGNATURE REQUESTED', {
        x: 60,
        y: 195,
        size: 14,
        font: boldFont,
        color: rgb(0.2, 0.4, 0.8),
      });
      
      lastPage.drawText(`To: ${recipientName}`, {
        x: 60,
        y: 170,
        size: 11,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      lastPage.drawText(`Email: ${recipientEmail}`, {
        x: 60,
        y: 155,
        size: 11,
        font: font,
        color: rgb(0, 0, 0),
      });
      
      if (message) {
        lastPage.drawText(`Message: ${message.substring(0, 60)}`, {
          x: 60,
          y: 140,
          size: 10,
          font: font,
          color: rgb(0.3, 0.3, 0.3),
        });
      }
      
      lastPage.drawText('Please sign here: ___________________________', {
        x: 60,
        y: 115,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `signature_request_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`Signature request added to PDF!\n\nNext steps:\n1. Send the PDF to ${recipientEmail}\n2. Request them to sign and return it`);
    } catch (error) {
      console.error('Error creating signature request:', error);
      alert('Failed to create signature request. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Request PDF Signature
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Request signatures from others on your PDF documents
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
                </div>
              </div>
            </div>
          )}

          {/* Recipient Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter recipient's name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message for the recipient..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Request Button */}
          <button
            onClick={requestSignature}
            disabled={!file || !recipientEmail || !recipientName || processing}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Create Signature Request</span>
              </>
            )}
          </button>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Professional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
