'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Image as ImageIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function PDFAddImages() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
      } else {
        alert('Please select an image file');
      }
    }
  };

  const addImageToPDF = async () => {
    if (!pdfFile || !imageFile) {
      alert('Please select both PDF and image files');
      return;
    }

    setProcessing(true);
    
    try {
      const pdfArrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
      
      const imageArrayBuffer = await imageFile.arrayBuffer();
      const imageBytes = new Uint8Array(imageArrayBuffer);
      
      let image;
      if (imageFile.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else {
        alert('Only PNG and JPG images are supported');
        setProcessing(false);
        return;
      }
      
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      const imageDims = image.scale(0.3);
      
      firstPage.drawImage(image, {
        x: 50,
        y: height - imageDims.height - 50,
        width: imageDims.width,
        height: imageDims.height,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `image_added_${pdfFile.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Image added to PDF successfully!');
    } catch (error) {
      console.error('Error adding image to PDF:', error);
      alert('Failed to add image to PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <ImageIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add Images to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Insert images into your PDF documents
            </p>
          </div>

          {/* PDF Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload PDF
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition">
              <div className="flex flex-col items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {pdfFile ? pdfFile.name : 'Click to upload PDF'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,application/pdf"
                onChange={handlePDFChange}
              />
            </label>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition">
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imageFile ? imageFile.name : 'Click to upload Image (PNG, JPG)'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Add Button */}
          <button
            onClick={addImageToPDF}
            disabled={!pdfFile || !imageFile || processing}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Add Image & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
