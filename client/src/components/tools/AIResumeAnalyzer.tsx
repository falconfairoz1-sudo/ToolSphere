'use client';

import { useState } from 'react';
import { Upload, FileText, Briefcase, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  recommendations: string[];
}

export default function AIResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setAnalysis(null);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const analyzeResume = async () => {
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

      const mockAnalysis: AnalysisResult = {
        score: Math.floor(Math.random() * 20) + 75, // 75-95
        strengths: [
          'Clear and professional formatting',
          'Strong action verbs used throughout',
          'Quantifiable achievements highlighted',
          'Relevant skills section included',
          'Appropriate length and structure',
        ],
        improvements: [
          'Add more specific metrics and numbers',
          'Include keywords from job descriptions',
          'Expand on leadership experiences',
          'Add a professional summary section',
          'Update contact information format',
        ],
        keywords: [
          'Project Management',
          'Team Leadership',
          'Data Analysis',
          'Communication',
          'Problem Solving',
          'Strategic Planning',
        ],
        recommendations: [
          'Tailor your resume for each job application',
          'Use industry-specific terminology',
          'Highlight recent and relevant experience',
          'Keep formatting consistent throughout',
          'Proofread for grammar and spelling errors',
        ],
      };

      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Briefcase className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI Resume Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get AI-powered insights and recommendations for your resume
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload Resume PDF</span>
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
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={analyzeResume}
            disabled={!file || analyzing}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-6"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Analyze Resume</span>
              </>
            )}
          </button>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Score */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Resume Score</p>
                  <p className="text-5xl font-bold text-green-600">{analysis.score}/100</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {analysis.score >= 85 ? 'Excellent!' : analysis.score >= 70 ? 'Good!' : 'Needs Improvement'}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-orange-600 mt-1">→</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Keywords */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detected Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 mt-1">💡</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI Analysis</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Detailed Insights</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Actionable Tips</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is a simulated AI resume analyzer. For production use, integrate with AI services like OpenAI GPT, Claude, or specialized resume analysis APIs for accurate content analysis, ATS compatibility checking, and industry-specific recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
