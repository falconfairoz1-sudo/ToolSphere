'use client';

import { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';

export default function NumberFormatter() {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [copied, setCopied] = useState(false);

  const formatNumber = () => {
    const num = parseFloat(input.replace(/,/g, ''));
    
    if (isNaN(num)) {
      alert('Please enter a valid number');
      return;
    }

    const withCommas = num.toLocaleString('en-US');
    const withSpaces = num.toLocaleString('fr-FR');
    const scientific = num.toExponential(2);
    const percentage = (num * 100).toFixed(2) + '%';
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

    setFormatted(`With Commas: ${withCommas}\nWith Spaces: ${withSpaces}\nScientific: ${scientific}\nPercentage: ${percentage}\nCurrency: ${currency}`);
  };

  const copyFormatted = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <Hash className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Number Formatter</h1>
          </div>
          <p className="text-gray-600 text-lg">Format numbers with commas, spaces, and more</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Enter Number</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a number (e.g., 1234567.89)..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all mb-6 text-2xl text-center font-mono"
          />

          <button
            onClick={formatNumber}
            disabled={!input}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Format Number
          </button>
        </div>

        {formatted && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Formatted Results</h3>
              <button
                onClick={copyFormatted}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-3">
              {formatted.split('\n').map((line, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                  <div className="font-mono text-lg text-gray-800">{line}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
