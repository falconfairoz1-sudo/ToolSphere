'use client';

import { useState } from 'react';
import { Dices, RefreshCw, Copy, Check } from 'lucide-react';

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    const generated: number[] = [];
    const range = max - min + 1;

    if (!allowDuplicates && count > range) {
      alert(`Cannot generate ${count} unique numbers in range ${min}-${max}`);
      return;
    }

    if (allowDuplicates) {
      for (let i = 0; i < count; i++) {
        generated.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const available = Array.from({ length: range }, (_, i) => min + i);
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * available.length);
        generated.push(available[index]);
        available.splice(index, 1);
      }
    }

    setNumbers(generated);
  };

  const copyNumbers = () => {
    navigator.clipboard.writeText(numbers.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg">
              <Dices className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Random Number Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate random numbers with custom ranges</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum Value</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Maximum Value</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">How Many Numbers: {count}</label>
            <input
              type="range"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-200"
              />
              <span className="text-sm font-medium text-gray-700">Allow Duplicate Numbers</span>
            </label>
          </div>

          <button
            onClick={generateNumbers}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Numbers
          </button>
        </div>

        {numbers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Generated Numbers ({numbers.length})</h3>
              <button
                onClick={copyNumbers}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 text-orange-700 font-bold text-lg"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
