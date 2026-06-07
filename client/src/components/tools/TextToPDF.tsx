'use client';

import { useState } from 'react';
import { FileText, Download, Type } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function TextToPDF() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('document');
  const [fontSize, setFontSize] = useState(12);
  const [converting, setConverting] = useState(false);

  const convertToPDF = async () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setConverting(true);
    
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 50;
      const maxWidth = pageWidth - (margin * 2);
      const lineHeight = fontSize * 1.2;
      
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let yPosition = pageHeight - margin;
      
      // Split text into lines
      const paragraphs = text.split('\n');
      
      for (const paragraph of paragraphs) {
        if (!paragraph.trim()) {
          yPosition -= lineHeight;
          if (yPosition < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
          continue;
        }
        
        // Word wrap
        const words = paragraph.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = font.widthOfTextAtSize(testLine, fontSize);
          
          if (textWidth > maxWidth && currentLine) {
            // Draw current line
            page.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: fontSize,
              font: font,
              color: rgb(0, 0, 0),
            });
            
            yPosition -= lineHeight;
            
            // Check if we need a new page
            if (yPosition < margin) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              yPosition = pageHeight - margin;
            }
            
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        
        // Draw remaining text
        if (currentLine) {
          page.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          
          yPosition -= lineHeight;
          
          if (yPosition < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName || 'document'}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Text converted to PDF successfully!');
    } catch (error) {
      console.error('Error converting text to PDF:', error);
      alert('Failed to convert text to PDF. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Type className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Text to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert plain text to PDF documents
            </p>
          </div>

          {/* File Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="document"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Font Size Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size: {fontSize}pt
            </label>
            <input
              type="range"
              min="8"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8pt</span>
              <span>16pt</span>
              <span>24pt</span>
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste your text here..."
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none font-mono"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Characters: {text.length} | Words: {text.trim() ? text.trim().split(/\s+/).length : 0}
            </p>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToPDF}
            disabled={!text.trim() || converting}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
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

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customizable</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
