'use client';

import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
    lines: text.split('\n').length,
    readingTime: Math.ceil(text.trim().split(/\s+/).length / 200), // 200 words per minute
  };

  const copyStats = () => {
    const statsText = `Characters: ${stats.characters}\nWords: ${stats.words}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}`;
    navigator.clipboard.writeText(statsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <Hash className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Character Counter</h1>
          </div>
          <p className="text-gray-600 text-lg">Count characters, words, sentences and more</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
            <button
              onClick={copyStats}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Stats'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.characters}</div>
              <div className="text-sm text-blue-700 mt-1">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-indigo-700 mt-1">No Spaces</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.words}</div>
              <div className="text-sm text-purple-700 mt-1">Words</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-pink-600">{stats.sentences}</div>
              <div className="text-sm text-pink-700 mt-1">Sentences</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-600">{stats.paragraphs}</div>
              <div className="text-sm text-cyan-700 mt-1">Paragraphs</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-teal-600">{stats.lines}</div>
              <div className="text-sm text-teal-700 mt-1">Lines</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.readingTime}</div>
              <div className="text-sm text-green-700 mt-1">Min Read</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{Math.ceil(stats.characters / 280)}</div>
              <div className="text-sm text-orange-700 mt-1">Tweets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
