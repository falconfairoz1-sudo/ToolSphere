'use client';

import { useState } from 'react';
import { Sparkles, Copy, Download, RefreshCw, Zap } from 'lucide-react';

export default function AIContentImprover() {
  const [originalText, setOriginalText] = useState('');
  const [improvedText, setImprovedText] = useState('');
  const [improving, setImproving] = useState(false);
  const [improvementType, setImprovementType] = useState<'clarity' | 'professional' | 'engaging' | 'concise'>('clarity');

  const improvementStrategies = {
    clarity: {
      name: 'Clarity',
      description: 'Make text clearer and easier to understand',
      icon: '💡',
      rules: [
        { pattern: /\b(very|really|quite|rather|somewhat)\s+/gi, replacement: '' },
        { pattern: /\b(in order to)\b/gi, replacement: 'to' },
        { pattern: /\b(due to the fact that)\b/gi, replacement: 'because' },
        { pattern: /\b(at this point in time)\b/gi, replacement: 'now' },
        { pattern: /\b(in the event that)\b/gi, replacement: 'if' },
      ]
    },
    professional: {
      name: 'Professional',
      description: 'Make text more formal and professional',
      icon: '💼',
      rules: [
        { pattern: /\bdon't\b/gi, replacement: 'do not' },
        { pattern: /\bcan't\b/gi, replacement: 'cannot' },
        { pattern: /\bwon't\b/gi, replacement: 'will not' },
        { pattern: /\bisn't\b/gi, replacement: 'is not' },
        { pattern: /\baren't\b/gi, replacement: 'are not' },
        { pattern: /\bkinda\b/gi, replacement: 'somewhat' },
        { pattern: /\bgonna\b/gi, replacement: 'going to' },
        { pattern: /\bwanna\b/gi, replacement: 'want to' },
      ]
    },
    engaging: {
      name: 'Engaging',
      description: 'Make text more interesting and engaging',
      icon: '✨',
      rules: [
        { pattern: /\bgood\b/gi, replacement: 'excellent' },
        { pattern: /\bbad\b/gi, replacement: 'poor' },
        { pattern: /\bbig\b/gi, replacement: 'significant' },
        { pattern: /\bsmall\b/gi, replacement: 'minor' },
        { pattern: /\bnice\b/gi, replacement: 'pleasant' },
      ]
    },
    concise: {
      name: 'Concise',
      description: 'Make text shorter and more direct',
      icon: '⚡',
      rules: [
        { pattern: /\b(in my opinion|I think that|I believe that)\s*/gi, replacement: '' },
        { pattern: /\b(it is important to note that)\s*/gi, replacement: '' },
        { pattern: /\b(as a matter of fact)\s*/gi, replacement: 'actually' },
        { pattern: /\b(for the purpose of)\b/gi, replacement: 'for' },
        { pattern: /\b(in spite of the fact that)\b/gi, replacement: 'although' },
      ]
    }
  };

  const improveContent = () => {
    if (!originalText.trim()) {
      alert('Please enter some text to improve');
      return;
    }

    setImproving(true);

    setTimeout(() => {
      let improved = originalText;
      const strategy = improvementStrategies[improvementType];

      // Apply improvement rules
      strategy.rules.forEach(rule => {
        improved = improved.replace(rule.pattern, rule.replacement);
      });

      // Additional improvements
      // Fix multiple spaces
      improved = improved.replace(/\s+/g, ' ');
      
      // Fix spacing around punctuation
      improved = improved.replace(/\s+([.,!?;:])/g, '$1');
      improved = improved.replace(/([.,!?;:])\s*/g, '$1 ');
      
      // Capitalize first letter of sentences
      improved = improved.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
      
      // Remove extra line breaks
      improved = improved.replace(/\n{3,}/g, '\n\n');
      
      // Trim whitespace
      improved = improved.trim();

      // Add specific improvements based on type
      if (improvementType === 'engaging') {
        // Add transition words occasionally
        const transitions = ['Furthermore', 'Moreover', 'Additionally', 'Consequently', 'Therefore'];
        const sentences = improved.split('. ');
        if (sentences.length > 3) {
          const randomIndex = Math.floor(Math.random() * (sentences.length - 1)) + 1;
          sentences[randomIndex] = transitions[Math.floor(Math.random() * transitions.length)] + ', ' + 
            sentences[randomIndex].charAt(0).toLowerCase() + sentences[randomIndex].slice(1);
          improved = sentences.join('. ');
        }
      }

      setImprovedText(improved);
      setImproving(false);
    }, 800);
  };

  const copyText = () => {
    navigator.clipboard.writeText(improvedText);
    alert('Improved text copied to clipboard!');
  };

  const downloadText = () => {
    const blob = new Blob([improvedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'improved-content.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getImprovementStats = () => {
    const originalWords = originalText.trim().split(/\s+/).length;
    const improvedWords = improvedText.trim().split(/\s+/).length;
    const wordDiff = improvedWords - originalWords;
    const percentChange = originalWords > 0 ? ((wordDiff / originalWords) * 100).toFixed(1) : '0';

    return {
      originalWords,
      improvedWords,
      wordDiff,
      percentChange,
      originalChars: originalText.length,
      improvedChars: improvedText.length
    };
  };

  const stats = improvedText ? getImprovementStats() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Content Improver
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Enhance and polish your content with AI-powered improvements
            </p>
          </div>

          {/* Improvement Type Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(improvementStrategies).map(([key, strategy]) => (
              <button
                key={key}
                onClick={() => setImprovementType(key as any)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  improvementType === key
                    ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-cyan-400'
                }`}
              >
                <div className="text-3xl mb-2">{strategy.icon}</div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {strategy.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {strategy.description}
                </div>
              </button>
            ))}
          </div>

          {/* Input/Output Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Original Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Text
              </label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter your content here..."
                className="w-full h-96 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none"
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {originalText.length} characters, {originalText.trim().split(/\s+/).filter(w => w).length} words
              </div>
            </div>

            {/* Improved Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Improved Text
              </label>
              <textarea
                value={improvedText}
                readOnly
                placeholder="Improved content will appear here..."
                className="w-full h-96 px-4 py-3 border-2 border-green-300 dark:border-green-600 rounded-xl bg-green-50 dark:bg-green-900/10 text-gray-900 dark:text-white outline-none resize-none"
              />
              {improvedText && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {improvedText.length} characters, {improvedText.trim().split(/\s+/).filter(w => w).length} words
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyText}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={downloadText}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Improve Button */}
          <button
            onClick={improveContent}
            disabled={improving || !originalText.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {improving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Improving Content...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Improve Content</span>
              </>
            )}
          </button>

          {/* Statistics */}
          {stats && (
            <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border-2 border-cyan-200 dark:border-cyan-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Improvement Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Word Change</p>
                  <p className={`text-2xl font-bold ${stats.wordDiff < 0 ? 'text-green-600' : stats.wordDiff > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                    {stats.wordDiff > 0 ? '+' : ''}{stats.wordDiff}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Percentage</p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {stats.percentChange}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.originalWords}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Improved</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.improvedWords}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
