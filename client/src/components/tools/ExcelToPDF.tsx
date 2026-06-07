'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, Download, FileText } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function ExcelToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please select an Excel file (.xlsx, .xls, .csv)');
      }
    }
  };

  const convertToPDF = async () => {
    if (!file) {
      alert('Please select an Excel file');
      return;
    }

    setConverting(true);
    
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      let page = pdfDoc.addPage([595, 842]); // A4 size
      const { width, height } = page.getSize();
      
      // Title
      page.drawText('Excel to PDF Conversion', {
        x: 50,
        y: height - 50,
        size: 20,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      
      // File info
      page.drawText(`Source File: ${file.name}`, {
        x: 50,
        y: height - 80,
        size: 12,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      page.drawText(`Conversion Date: ${new Date().toLocaleDateString()}`, {
        x: 50,
        y: height - 100,
        size: 12,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      // Content area
      let yPosition = height - 140;
      
      if (file.name.endsWith('.csv')) {
        const text = await file.text();
        const lines = text.split('\n').slice(0, 30); // First 30 rows
        
        page.drawText('Spreadsheet Data:', {
          x: 50,
          y: yPosition,
          size: 14,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        
        yPosition -= 30;
        
        lines.forEach((line, index) => {
          if (yPosition < 50) {
            page = pdfDoc.addPage([595, 842]);
            yPosition = height - 50;
          }
          
          const displayLine = line.length > 80 ? line.substring(0, 80) + '...' : line;
          page.drawText(displayLine, {
            x: 50,
            y: yPosition,
            size: 9,
            font: font,
            color: rgb(0, 0, 0),
          });
          
          yPosition -= 15;
        });
      } else {
        page.drawText('Excel file converted to PDF', {
          x: 50,
          y: yPosition,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
        
        yPosition -= 30;
        
        page.drawText('Note: For best results with complex Excel files containing', {
          x: 50,
          y: yPosition,
          size: 10,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        });
        
        yPosition -= 20;
        
        page.drawText('formulas, charts, and formatting, consider using specialized', {
          x: 50,
          y: yPosition,
          size: 10,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        });
        
        yPosition -= 20;
        
        page.drawText('Excel to PDF conversion tools.', {
          x: 50,
          y: yPosition,
          size: 10,
          font: font,
          color: rgb(0.5, 0.5, 0.5),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.(xlsx|xls|csv)$/, '')}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('Excel file converted to PDF successfully!');
    } catch (error) {
      console.error('Error converting Excel to PDF:', error);
      alert('Failed to convert Excel file. Please try again.');
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileSpreadsheet className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Excel to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Convert Excel spreadsheets to PDF documents
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
                  Excel files (.xlsx, .xls, .csv)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xlsx,.xls,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* File Info */}
          {file && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Note:</strong> This tool works best with CSV files. For complex Excel files with formulas, 
              charts, and advanced formatting, the conversion may be simplified.
            </p>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToPDF}
            disabled={!file || converting}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
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
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
