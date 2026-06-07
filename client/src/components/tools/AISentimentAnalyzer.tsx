'use client';

import { useState } from 'react';
import { Smile, Frown, Meh, Heart, ThumbsUp, ThumbsDown, TrendingUp, BarChart3 } from 'lucide-react';

export default function AISentimentAnalyzer() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeSentiment = () => {
    if (!text.trim()) {
      alert('Please enter text to analyze');
      return;
    }

    setAnalyzing(true);

    // Advanced sentiment analysis algorithm
    setTimeout(() => {
      const words = text.toLowerCase().split(/\s+/);
      
      // Sentiment word dictionaries
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy', 'beautiful', 'perfect', 'best', 'awesome', 'brilliant', 'outstanding', 'superb', 'delightful', 'pleased', 'satisfied', 'enjoy'];
      const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'worst', 'poor', 'disappointing', 'frustrated', 'annoyed', 'upset', 'disgusting', 'pathetic', 'useless', 'fail', 'wrong', 'problem', 'issue'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });

      const totalSentimentWords = positiveCount + negativeCount;
      const positivePercent = totalSentimentWords > 0 ? (positiveCount / totalSentimentWords) * 100 : 50;
      const negativePercent = totalSentimentWords > 0 ? (negativeCount / totalSentimentWords) * 100 : 50;
      
      let sentiment = 'Neutral';
      let emoji = '😐';
      let color = 'text-gray-600';
      
      if (positivePercent > 60) {
        sentiment = 'Very Positive';
        emoji = '😄';
        color = 'text-green-600';
      } else if (positivePercent > 40) {
        sentiment = 'Positive';
        emoji = '🙂';
        color = 'text-green-500';
      } else if (negativePercent > 60) {
        sentiment = 'Very Negative';
        emoji = '😢';
        color = 'text-red-600';
      } else if (negativePercent > 40) {
        sentiment = 'Negative';
        emoji = '😟';
        color = 'text-red-500';
      }

      setAnalysis({
        sentiment,
        emoji,
        color,
        positivePercent: Math.round(positivePercent),
        negativePercent: Math.round(negativePercent),
        neutralPercent: Math.round(100 - positivePercent - negativePercent),
        wordCount: words.length,
        positiveWords: positiveCount,
        negativeWords: negativeCount,
      });

      setAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Sentiment Analyzer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Analyze emotions and sentiment in text
            </p>
          </div>

          {/* Input Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text to Analyze
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none resize-none"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {text.length} characters • {text.split(/\s+/).filter(w => w).length} words
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeSentiment}
            disabled={analyzing || !text.trim()}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <BarChart3 className="w-5 h-5" />
            <span>{analyzing ? 'Analyzing...' : 'Analyze Sentiment'}</span>
          </button>

          {/* Results */}
          {analysis && (
            <div className="space-y-6 animate-fade-in">
              {/* Overall Sentiment */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-pink-200 dark:border-pink-800">
                <div className="text-center">
                  <div className="text-6xl mb-3">{analysis.emoji}</div>
                  <h3 className={`text-3xl font-bold ${analysis.color} dark:${analysis.color} mb-2`}>
                    {analysis.sentiment}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Overall Sentiment</p>
                </div>
              </div>

              {/* Sentiment Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{analysis.positivePercent}%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Positive</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <Meh className="w-5 h-5 text-gray-600" />
                    <span className="text-2xl font-bold text-gray-600">{analysis.neutralPercent}%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Neutral</p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    <span className="text-2xl font-bold text-red-600">{analysis.negativePercent}%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Negative</p>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div 
                    className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${analysis.positivePercent}%` }}
                  >
                    {analysis.positivePercent > 10 && `${analysis.positivePercent}%`}
                  </div>
                  <div 
                    className="bg-gray-400 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${analysis.neutralPercent}%` }}
                  >
                    {analysis.neutralPercent > 10 && `${analysis.neutralPercent}%`}
                  </div>
                  <div 
                    className="bg-red-500 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: `${analysis.negativePercent}%` }}
                  >
                    {analysis.negativePercent > 10 && `${analysis.negativePercent}%`}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.wordCount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Words</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-2xl font-bold text-green-600">{analysis.positiveWords}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Positive Words</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-2xl font-bold text-red-600">{analysis.negativeWords}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Negative Words</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.positiveWords + analysis.negativeWords}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sentiment Words</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
