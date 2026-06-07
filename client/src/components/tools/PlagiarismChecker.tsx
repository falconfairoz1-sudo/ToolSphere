'use client';

import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Copy } from 'lucide-react';

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkPlagiarism = async () => {
    if (!text.trim()) return;

    setLoading(true);
    
    // Simulate plagiarism check
    setTimeout(() => {
      const words = text.split(/\s+/).length;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
      
      // Simulate random plagiarism detection
      const plagiarismScore = Math.floor(Math.random() * 30);
      const uniqueScore = 100 - plagiarismScore;
      
      const matches = plagiarismScore > 0 ? [
        { source: 'Wikipedia.org', similarity: Math.floor(Math.random() * 20) + 5, url: 'https://wikipedia.org' },
        { source: 'Academic Journal', similarity: Math.floor(Math.random() * 15) + 3, url: '#' },
      ].filter(m => m.similarity <= plagiarismScore) : [];

      setResult({
        plagiarismScore,
        uniqueScore,
        words,
        sentences,
        matches,
        status: plagiarismScore < 10 ? 'excellent' : plagiarismScore < 20 ? 'good' : 'warning'
      });
      setLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 dark:bg-green-900/20';
      case 'good': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'warning': return 'bg-orange-50 dark:bg-orange-900/20';
      default: return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Search className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Plagiarism Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check your text for plagiarism
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to check for plagiarism..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {text.split(/\s+/).filter(w => w).length} words
            </p>
            <button
              onClick={() => setText('')}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Clear
            </button>
          </div>
        </div>

        <button
          onClick={checkPlagiarism}
          disabled={!text.trim() || loading}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Checking...' : 'Check Plagiarism'}
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            <div className={`p-6 ${getStatusBg(result.status)} rounded-xl`}>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uniqueness Score</p>
                <p className={`text-6xl font-black ${getStatusColor(result.status)}`}>
                  {result.uniqueScore}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {result.plagiarismScore}% potential plagiarism detected
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Words</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.words}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Sentences</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.sentences}</p>
              </div>
            </div>

            {result.matches.length > 0 && (
              <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Potential Matches Found
                  </h3>
                </div>
                <div className="space-y-3">
                  {result.matches.map((match: any, index: number) => (
                    <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{match.source}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{match.similarity}% similarity</p>
                        </div>
                        <a
                          href={match.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          View Source →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.status === 'excellent' && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-700 dark:text-green-400">
                  Great! Your content appears to be original.
                </p>
              </div>
            )}

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Note:</strong> This is a simulated plagiarism checker for demonstration purposes. 
                For accurate results, use professional plagiarism detection services like Turnitin, Grammarly, or Copyscape.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
