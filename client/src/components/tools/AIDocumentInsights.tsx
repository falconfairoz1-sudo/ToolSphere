'use client';

import { useState } from 'react';
import { Upload, FileText, Lightbulb, BarChart3, Target, Users } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface Insights {
  documentType: string;
  mainTopics: string[];
  sentiment: string;
  complexity: string;
  readingTime: string;
  keyInsights: string[];
  actionItems: string[];
  entities: { type: string; items: string[] }[];
}

export default function AIDocumentInsights() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [insights, setInsights] = useState<Insights | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setInsights(null);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const analyzeDocument = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setAnalyzing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2500));

      const mockInsights: Insights = {
        documentType: file.name.includes('report') ? 'Business Report' : 
                      file.name.includes('contract') ? 'Legal Contract' :
                      file.name.includes('proposal') ? 'Project Proposal' : 'General Document',
        mainTopics: [
          'Strategic Planning',
          'Financial Analysis',
          'Market Research',
          'Risk Assessment',
          'Implementation Strategy',
        ],
        sentiment: 'Professional and Objective',
        complexity: 'Medium-High',
        readingTime: `${Math.ceil(pageCount * 2.5)} minutes`,
        keyInsights: [
          'Document presents a comprehensive analysis of current market conditions',
          'Strong emphasis on data-driven decision making throughout',
          'Multiple stakeholder perspectives are considered and addressed',
          'Clear action items and timelines are provided for implementation',
          'Risk mitigation strategies are well-documented and practical',
        ],
        actionItems: [
          'Review financial projections in Section 3',
          'Schedule stakeholder meeting to discuss recommendations',
          'Prepare implementation timeline based on proposed phases',
          'Allocate resources for identified priority areas',
          'Set up monitoring framework for key metrics',
        ],
        entities: [
          { type: 'Organizations', items: ['ABC Corporation', 'XYZ Partners', 'Global Industries'] },
          { type: 'People', items: ['John Smith', 'Sarah Johnson', 'Michael Chen'] },
          { type: 'Locations', items: ['New York', 'London', 'Singapore'] },
          { type: 'Dates', items: ['Q1 2024', 'March 15', 'Fiscal Year 2024'] },
        ],
      };

      setInsights(mockInsights);
    } catch (error) {
      console.error('Error analyzing document:', error);
      alert('Failed to analyze document. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Lightbulb className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI Document Insights
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get AI-powered insights and analysis from any document
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 transition">
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
                <FileText className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={analyzeDocument}
            disabled={!file || analyzing}
            className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-6"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Generate Insights</span>
              </>
            )}
          </button>

          {/* Insights Results */}
          {insights && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Type</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{insights.documentType}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sentiment</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{insights.sentiment}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Complexity</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{insights.complexity}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Reading Time</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{insights.readingTime}</p>
                </div>
              </div>

              {/* Main Topics */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Main Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insights.mainTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Insights</h3>
                </div>
                <ul className="space-y-2">
                  {insights.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-600 mt-1">💡</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Action Items</h3>
                </div>
                <ul className="space-y-2">
                  {insights.actionItems.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Entities */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detected Entities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.entities.map((entity, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{entity.type}</p>
                      <div className="flex flex-wrap gap-2">
                        {entity.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-yellow-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deep Analysis</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Actionable</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is a simulated AI document insights tool. For production use, integrate with AI services like OpenAI GPT, Claude, Google Gemini, or specialized document analysis APIs for accurate content analysis, entity extraction, sentiment analysis, and actionable insights generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
