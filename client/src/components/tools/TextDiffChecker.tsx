'use client';

import { useState } from 'react';
import { GitCompare, Check } from 'lucide-react';

export default function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<any[]>([]);

  const compareTexts = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);
    const diffs = [];

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        diffs.push({ type: 'same', line1, line2, lineNum: i + 1 });
      } else if (!line1) {
        diffs.push({ type: 'added', line1, line2, lineNum: i + 1 });
      } else if (!line2) {
        diffs.push({ type: 'removed', line1, line2, lineNum: i + 1 });
      } else {
        diffs.push({ type: 'modified', line1, line2, lineNum: i + 1 });
      }
    }

    setDifferences(diffs);
  };

  const stats = differences.reduce(
    (acc, diff) => {
      if (diff.type === 'same') acc.same++;
      else if (diff.type === 'added') acc.added++;
      else if (diff.type === 'removed') acc.removed++;
      else if (diff.type === 'modified') acc.modified++;
      return acc;
    },
    { same: 0, added: 0, removed: 0, modified: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
              <GitCompare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Text Diff Checker</h1>
          </div>
          <p className="text-gray-600 text-lg">Compare two texts and find differences</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Original Text</label>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter original text..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-mono text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Modified Text</label>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter modified text..."
                className="w-full h-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-mono text-sm resize-none"
              />
            </div>
          </div>

          <button
            onClick={compareTexts}
            disabled={!text1 || !text2}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Compare Texts
          </button>
        </div>

        {differences.length > 0 && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className="text-3xl font-bold text-gray-600">{stats.same}</div>
                <div className="text-sm text-gray-500">Unchanged</div>
              </div>
              <div className="bg-green-50 rounded-xl shadow-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{stats.added}</div>
                <div className="text-sm text-green-700">Added</div>
              </div>
              <div className="bg-red-50 rounded-xl shadow-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{stats.removed}</div>
                <div className="text-sm text-red-700">Removed</div>
              </div>
              <div className="bg-yellow-50 rounded-xl shadow-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600">{stats.modified}</div>
                <div className="text-sm text-yellow-700">Modified</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Differences</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {differences.map((diff, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      diff.type === 'same'
                        ? 'bg-gray-50'
                        : diff.type === 'added'
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : diff.type === 'removed'
                        ? 'bg-red-50 border-l-4 border-red-500'
                        : 'bg-yellow-50 border-l-4 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs text-gray-500 font-mono w-8">{diff.lineNum}</span>
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <div className="font-mono text-sm">
                          {diff.type === 'removed' && <span className="text-red-600 line-through">{diff.line1}</span>}
                          {diff.type === 'modified' && <span className="text-red-600">{diff.line1}</span>}
                          {diff.type === 'same' && <span className="text-gray-600">{diff.line1}</span>}
                        </div>
                        <div className="font-mono text-sm">
                          {diff.type === 'added' && <span className="text-green-600">{diff.line2}</span>}
                          {diff.type === 'modified' && <span className="text-green-600">{diff.line2}</span>}
                          {diff.type === 'same' && <span className="text-gray-600">{diff.line2}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
