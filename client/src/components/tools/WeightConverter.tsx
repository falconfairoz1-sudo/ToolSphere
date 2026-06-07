'use client';

import { useState } from 'react';
import { Weight, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'kilogram', name: 'Kilograms', symbol: 'kg', toKg: 1 },
  { id: 'gram', name: 'Grams', symbol: 'g', toKg: 0.001 },
  { id: 'milligram', name: 'Milligrams', symbol: 'mg', toKg: 0.000001 },
  { id: 'ton', name: 'Metric Tons', symbol: 't', toKg: 1000 },
  { id: 'pound', name: 'Pounds', symbol: 'lb', toKg: 0.453592 },
  { id: 'ounce', name: 'Ounces', symbol: 'oz', toKg: 0.0283495 },
  { id: 'stone', name: 'Stones', symbol: 'st', toKg: 6.35029 },
];

export default function WeightConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('pound');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') {
      setResult('');
      return;
    }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toKg || 1;
    const toFactor = units.find(u => u.id === to)?.toKg || 1;
    const kg = num * fromFactor;
    const converted = kg / toFactor;
    setResult(converted.toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <Weight className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Weight Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different weight units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-green-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter weight"
                className="w-full px-4 py-3 text-2xl border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-emerald-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-emerald-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl focus:border-emerald-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Quick Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 kg = 2.20 pounds</p>
              <p>1 pound = 16 ounces</p>
              <p>1 ton = 1000 kg</p>
              <p>1 stone = 14 pounds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
