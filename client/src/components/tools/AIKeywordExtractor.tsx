'use client';

import { useState } from 'react';
import { Key, Sparkles, Copy, Download, TrendingUp } from 'lucide-react';

export default function AIKeywordExtractor() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<Array<{ word: string; score: number; category: string }>>([]);
  const [extracting, setExtracting] = useState(false);
  const [minWordLength, setMinWordLength] = useState(3);
  const [maxKeywords, setMaxKeywords] = useState(20);

  const stopWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
    'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'having',
    'may', 'should', 'am', 'being', 'does', 'done', 'very', 'more', 'much', 'many'
  ]);

  const extractKeywords = () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setExtracting(true);

    setTimeout(() => {
      // Clean and tokenize text
      const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => 
          word.length >= minWordLength && 
          !stopWords.has(word) &&
          !/^\d+$/.test(word)
        );

      // Calculate word frequency
      const frequency: { [key: string]: number } = {};
      words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
      });

      // Calculate TF-IDF-like scores
      const totalWords = words.length;
      const uniqueWords = Object.keys(frequency).length;

      // Extract bigrams (two-word phrases)
      const bigrams: { [key: string]: number } = {};
      for (let i = 0; i < words.length - 1; i++) {
        const bigram = `${words[i]} ${words[i + 1]}`;
        if (!stopWords.has(words[i]) && !stopWords.has(words[i + 1])) {
          bigrams[bigram] = (bigrams[bigram] || 0) + 1;
        }
      }

      // Categorize keywords
      const categories = {
        technical: ['technology', 'software', 'computer', 'digital', 'system', 'data', 'code', 'programming', 'algorithm', 'api', 'database', 'server', 'cloud', 'network'],
        business: ['business', 'market', 'company', 'customer', 'product', 'service', 'sales', 'revenue', 'profit', 'strategy', 'management', 'growth', 'investment'],
        creative: ['design', 'creative', 'art', 'content', 'writing', 'story', 'visual', 'brand', 'style', 'aesthetic', 'innovative', 'original'],
        academic: ['research', 'study', 'analysis', 'theory', 'method', 'evidence', 'conclusion', 'hypothesis', 'experiment', 'academic', 'scientific'],
        general: []
      };

      const categorizeWord = (word: string): string => {
        for (const [category, terms] of Object.entries(categories)) {
          if (terms.some(term => word.includes(term) || term.includes(word))) {
            return category;
          }
        }
        return 'general';
      };

      // Score and rank keywords
      const scoredKeywords = Object.entries(frequency)
        .map(([word, freq]) => {
          // TF-IDF inspired scoring
          const tf = freq / totalWords;
          const idf = Math.log(uniqueWords / (1 + freq));
          const score = tf * (1 + idf) * 100;
          
          return {
            word,
            score: Math.round(score * 10) / 10,
            category: categorizeWord(word)
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, maxKeywords);

      // Add top bigrams
      const scoredBigrams = Object.entries(bigrams)
        .map(([phrase, freq]) => ({
          word: phrase,
          score: Math.round((freq / totalWords) * 100 * 10) / 10,
          category: 'phrase'
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setKeywords([...scoredKeywords, ...scoredBigrams]);
      setExtracting(false);
    }, 500);
  };

  const copyKeywords = () => {
    const keywordText = keywords.map(k => k.word).join(', ');
    navigator.clipboard.writeText(keywordText);
    alert('Keywords copied to clipboard!');
  };

  const downloadKeywords = () => {
    const content = `Extracted Keywords\n\n${keywords.map((k, i) => 
      `${i + 1}. ${k.word} (Score: ${k.score}, Category: ${k.category})`
    ).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'keywords.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      technical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      business: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      creative: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      academic: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      phrase: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      general: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl mb-4">
              <Key className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Keyword Extractor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Extract important keywords and phrases from your text
            </p>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Word Length: {minWordLength}
              </label>
              <input
                type="range"
                min="2"
                max="6"
                value={minWordLength}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Keywords: {maxKeywords}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={maxKeywords}
                onChange={(e) => setMaxKeywords(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-yellow-600"
              />
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, blog post, or any text here..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{text.length} characters</span>
              <span>{text.trim().split(/\s+/).filter(w => w).length} words</span>
            </div>
          </div>

          {/* Extract Button */}
          <button
            onClick={extractKeywords}
            disabled={extracting || !text.trim()}
            className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>{extracting ? 'Extracting Keywords...' : 'Extract Keywords'}</span>
          </button>

          {/* Results */}
          {keywords.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                  <span>Extracted Keywords</span>
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyKeywords}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadKeywords}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Keywords Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {keyword.word}
                      </span>
                      <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                        {keyword.score}
                      </span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(keyword.category)}`}>
                      {keyword.category}
                    </span>
                  </div>
                ))}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Keywords</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{keywords.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Single Words</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {keywords.filter(k => k.category !== 'phrase').length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phrases</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {keywords.filter(k => k.category === 'phrase').length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(keywords.reduce((sum, k) => sum + k.score, 0) / keywords.length).toFixed(1)}
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
