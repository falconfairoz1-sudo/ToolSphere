'use client';

import { useState } from 'react';
import { Binary, ArrowRight } from 'lucide-react';

export default function NumberBaseConverter() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');
  const [octal, setOctal] = useState('');

  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    if (value === '') {
      setBinary('');
      setHexadecimal('');
      setOctal('');
      return;
    }
    const num = parseInt(value);
    if (!isNaN(num)) {
      setBinary(num.toString(2));
      setHexadecimal(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const handleBinaryChange = (value: string) => {
    setBinary(value);
    if (value === '') {
      setDecimal('');
      setHexadecimal('');
      setOctal('');
      return;
    }
    const num = parseInt(value, 2);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setHexadecimal(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const handleHexChange = (value: string) => {
    setHexadecimal(value);
    if (value === '') {
      setDecimal('');
      setBinary('');
      setOctal('');
      return;
    }
    const num = parseInt(value, 16);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    }
  };

  const handleOctalChange = (value: string) => {
    setOctal(value);
    if (value === '') {
      setDecimal('');
      setBinary('');
      setHexadecimal('');
      return;
    }
    const num = parseInt(value, 8);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setHexadecimal(num.toString(16).toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
              <Binary className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Number Base Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Binary, Decimal, Hexadecimal, and Octal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">Decimal (Base 10)</label>
            <input
              type="text"
              value={decimal}
              onChange={(e) => handleDecimalChange(e.target.value)}
              placeholder="Enter decimal number"
              className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-green-900 mb-3">Binary (Base 2)</label>
            <input
              type="text"
              value={binary}
              onChange={(e) => handleBinaryChange(e.target.value)}
              placeholder="Enter binary number"
              className="w-full px-4 py-3 text-2xl border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all font-mono"
            />
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-purple-900 mb-3">Hexadecimal (Base 16)</label>
            <input
              type="text"
              value={hexadecimal}
              onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
              placeholder="Enter hex number"
              className="w-full px-4 py-3 text-2xl border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
            />
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-orange-900 mb-3">Octal (Base 8)</label>
            <input
              type="text"
              value={octal}
              onChange={(e) => handleOctalChange(e.target.value)}
              placeholder="Enter octal number"
              className="w-full px-4 py-3 text-2xl border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all font-mono"
            />
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Binary className="w-5 h-5" />
              Quick Reference
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Decimal 10:</p>
                <p>Binary: 1010</p>
                <p>Hex: A</p>
                <p>Octal: 12</p>
              </div>
              <div>
                <p className="font-medium">Decimal 255:</p>
                <p>Binary: 11111111</p>
                <p>Hex: FF</p>
                <p>Octal: 377</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
