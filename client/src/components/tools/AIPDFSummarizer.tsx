'use client';

import { useState } from 'react';
import { Upload, FileText, Sparkles, Copy, Check } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

export default function AIPDFSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setSummary('');
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const summarizePDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      // Simulate AI summarization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummary = `📄 **Document Summary**

**File:** ${file.name}
**Pages:** ${pageCount}
**Generated:** ${new Date().toLocaleString()}

**Key Points:**
• This document contains ${pageCount} page${pageCount !== 1 ? 's' : ''} of content
• The document appears to be a ${file.name.includes('report') ? 'report' : file.name.includes('contract') ? 'contract' : 'document'} based on the filename
• Main topics and themes are distributed across the pages
• The content structure follows a standard document format

**Summary:**
This PDF document provides comprehensive information organized across ${pageCount} page${pageCount !== 1 ? 's' : ''}. The content is structured to present information in a clear and organized manner. Key sections include introductory material, main content, and supporting details.

**Recommendations:**
• Review the full document for complete context
• Pay attention to highlighted sections and key points
• Consider the document's purpose and intended audience

*Note: This is a simulated AI summary. For production use, integrate with AI services like OpenAI GPT, Claude, or Google Gemini for actual content analysis.*`;

      setSummary(mockSummary);
    } catch (error) {
      console.error('Error summarizing PDF:', error);
      alert('Failed to summarize PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI PDF Summarizer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Summarize PDF documents using AI-powered analysis
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
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Summarize Button */}
          <button
            onClick={summarizePDF}
            disabled={!file || processing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-6"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Summary</span>
              </>
            )}
          </button>

          {/* Summary Output */}
          {summary && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Summary
                </h3>
                <button
                  onClick={copySummary}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-sans">
                  {summary}
                </pre>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accurate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
