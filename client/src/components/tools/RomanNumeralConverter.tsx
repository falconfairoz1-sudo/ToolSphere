'use client';
import { useState } from 'react';
import { Type, ArrowLeftRight } from 'lucide-react';
export default function RomanNumeralConverter() {
  const [decimal, setDecimal] = useState('');
  const [roman, setRoman] = useState('');
  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return 'Out of range (1-3999)';
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    return result;
  };
  const fromRoman = (str: string): number => {
    const map: {[key: string]: number} = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const current = map[str[i]];
      const next = map[str[i + 1]];
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };
  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    if (value === '') { setRoman(''); return; }
    const num = parseInt(value);
    if (!isNaN(num)) {
      setRoman(toRoman(num));
    }
  };
  const handleRomanChange = (value: string) => {
    const upper = value.toUpperCase();
    setRoman(upper);
    if (upper === '') { setDecimal(''); return; }
    const num = fromRoman(upper);
    if (!isNaN(num) && num > 0) {
      setDecimal(num.toString());
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-stone-600 to-amber-600 rounded-2xl shadow-lg">
              <Type className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-700 to-amber-700 bg-clip-text text-transparent">Roman Numeral Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Roman numerals and decimal numbers</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">Decimal Number (1-3999)</label>
            <input type="number" min="1" max="3999" value={decimal} onChange={(e) => handleDecimalChange(e.target.value)} placeholder="Enter decimal number" className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
          </div>
          <div className="flex justify-center">
            <ArrowLeftRight className="w-6 h-6 text-gray-400 rotate-90" />
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-amber-900 mb-3">Roman Numeral</label>
            <input type="text" value={roman} onChange={(e) => handleRomanChange(e.target.value)} placeholder="Enter Roman numeral" className="w-full px-4 py-3 text-2xl border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-serif uppercase" />
          </div>
          <div className="bg-gradient-to-r from-stone-600 to-amber-600 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Roman Numerals Guide</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>I = 1, V = 5, X = 10</p>
              <p>L = 50, C = 100, D = 500</p>
              <p>M = 1000</p>
              <p>Examples: IV=4, IX=9, XL=40</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
