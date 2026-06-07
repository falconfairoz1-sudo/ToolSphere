'use client';

import { useState } from 'react';
import { Upload, FileText, Download, Square, Circle } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

type ShapeType = 'rectangle' | 'circle' | 'line';

export default function PDFAddShapes() {
  const [file, setFile] = useState<File | null>(null);
  const [shapeType, setShapeType] = useState<ShapeType>('rectangle');
  const [color, setColor] = useState('#FF0000');
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

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 1, g: 0, b: 0 };
  };

  const addShapeToPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { height } = firstPage.getSize();
      
      const rgbColor = hexToRgb(color);
      const shapeColor = rgb(rgbColor.r, rgbColor.g, rgbColor.b);
      
      if (shapeType === 'rectangle') {
        firstPage.drawRectangle({
          x: 100,
          y: height - 200,
          width: 150,
          height: 100,
          borderColor: shapeColor,
          borderWidth: 3,
        });
      } else if (shapeType === 'circle') {
        firstPage.drawCircle({
          x: 175,
          y: height - 150,
          size: 50,
          borderColor: shapeColor,
          borderWidth: 3,
        });
      } else if (shapeType === 'line') {
        firstPage.drawLine({
          start: { x: 100, y: height - 150 },
          end: { x: 250, y: height - 150 },
          thickness: 3,
          color: shapeColor,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `shapes_added_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Shape added to PDF successfully!');
    } catch (error) {
      console.error('Error adding shape to PDF:', error);
      alert('Failed to add shape to PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Square className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add Shapes to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Draw shapes and annotations on your PDF
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

          {/* Shape Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Shape Type
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['rectangle', 'circle', 'line'] as ShapeType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setShapeType(type)}
                  className={`p-3 rounded-lg border-2 transition capitalize ${
                    shapeType === type
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Shape Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-10 rounded cursor-pointer"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={addShapeToPDF}
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
                <span>Add Shape & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
