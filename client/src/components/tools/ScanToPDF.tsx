'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Scan } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function ScanToPDF() {
  const [images, setImages] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setImages([...images, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (images.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setProcessing(true);
    
    try {
      const pdfDoc = await PDFDocument.create();
      
      for (const imageFile of images) {
        const imageBytes = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(imageBytes);
        
        let image;
        if (imageFile.type === 'image/png') {
          image = await pdfDoc.embedPng(uint8Array);
        } else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(uint8Array);
        } else {
          continue; // Skip unsupported formats
        }
        
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        
        // Scale image to fit page
        const imageAspectRatio = image.width / image.height;
        const pageAspectRatio = width / height;
        
        let drawWidth, drawHeight;
        if (imageAspectRatio > pageAspectRatio) {
          drawWidth = width - 40;
          drawHeight = drawWidth / imageAspectRatio;
        } else {
          drawHeight = height - 40;
          drawWidth = drawHeight * imageAspectRatio;
        }
        
        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;
        
        page.drawImage(image, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `scanned_${Date.now()}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`Successfully converted ${images.length} image(s) to PDF!`);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('Failed to convert images to PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Scan className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Scan to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert scanned images to PDF documents
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG images (multiple files supported)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Image List */}
          {images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Selected Images ({images.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-900 dark:text-white block">
                          {index + 1}. {image.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(image.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={convertToPDF}
            disabled={images.length === 0 || processing}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
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

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Multiple Images</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Quality</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
