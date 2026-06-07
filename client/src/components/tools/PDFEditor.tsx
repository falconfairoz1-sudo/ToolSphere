'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Download, Type, Image as ImageIcon, Square, Highlighter, Pen, Eraser } from 'lucide-react';
import { PDFDocument, rgb } from 'pdf-lib';

type Tool = 'text' | 'image' | 'shape' | 'highlight' | 'draw' | 'whiteout';

export default function PDFEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleToolClick = (tool: Tool) => {
    if (!file) {
      alert('Please upload a PDF file first');
      return;
    }
    setActiveTool(tool);
  };

  const processPDF = async () => {
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
      
      // Add sample annotation based on active tool
      if (activeTool === 'text') {
        firstPage.drawText('Sample Text Added', {
          x: 50,
          y: firstPage.getHeight() - 100,
          size: 20,
          color: rgb(0, 0, 0),
        });
      } else if (activeTool === 'shape') {
        firstPage.drawRectangle({
          x: 50,
          y: firstPage.getHeight() - 200,
          width: 100,
          height: 50,
          borderColor: rgb(1, 0, 0),
          borderWidth: 2,
        });
      } else if (activeTool === 'highlight') {
        firstPage.drawRectangle({
          x: 50,
          y: firstPage.getHeight() - 150,
          width: 200,
          height: 20,
          color: rgb(1, 1, 0),
          opacity: 0.3,
        });
      } else if (activeTool === 'whiteout') {
        firstPage.drawRectangle({
          x: 50,
          y: firstPage.getHeight() - 250,
          width: 150,
          height: 30,
          color: rgb(1, 1, 1),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `edited_${file.name}`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert('PDF edited successfully!');
    } catch (error) {
      console.error('Error editing PDF:', error);
      alert('Failed to edit PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const tools = [
    { id: 'text' as Tool, name: 'Add Text', icon: Type, color: 'blue' },
    { id: 'image' as Tool, name: 'Add Images', icon: ImageIcon, color: 'green' },
    { id: 'shape' as Tool, name: 'Add Shapes', icon: Square, color: 'purple' },
    { id: 'highlight' as Tool, name: 'Highlight', icon: Highlighter, color: 'yellow' },
    { id: 'draw' as Tool, name: 'Draw', icon: Pen, color: 'indigo' },
    { id: 'whiteout' as Tool, name: 'Whiteout', icon: Eraser, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Edit PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add text, images, shapes, highlights, and annotations to your PDF
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF file only
                </p>
              </div>
              <input
                ref={fileInputRef}
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
                <FileText className="w-6 h-6 text-primary-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Editing Tools */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Editing Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`p-4 rounded-lg border-2 transition ${
                      isActive
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${
                      isActive ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-primary-600' : 'text-gray-900 dark:text-white'
                    }`}>
                      {tool.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Info */}
          {activeTool && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>{tools.find(t => t.id === activeTool)?.name} tool selected.</strong> 
                {' '}Click "Apply Edits" to add a sample annotation to your PDF.
              </p>
            </div>
          )}

          {/* Apply Button */}
          <button
            onClick={processPDF}
            disabled={!file || !activeTool || processing}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Apply Edits & Download</span>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy to Use</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
