'use client';

import { useState } from 'react';
import { Square, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'sqmeter', name: 'Square Meters', symbol: 'm²', toSqM: 1 },
  { id: 'sqkilometer', name: 'Square Kilometers', symbol: 'km²', toSqM: 1000000 },
  { id: 'sqcentimeter', name: 'Square Centimeters', symbol: 'cm²', toSqM: 0.0001 },
  { id: 'sqfoot', name: 'Square Feet', symbol: 'ft²', toSqM: 0.092903 },
  { id: 'sqyard', name: 'Square Yards', symbol: 'yd²', toSqM: 0.836127 },
  { id: 'sqmile', name: 'Square Miles', symbol: 'mi²', toSqM: 2589988 },
  { id: 'acre', name: 'Acres', symbol: 'ac', toSqM: 4046.86 },
  { id: 'hectare', name: 'Hectares', symbol: 'ha', toSqM: 10000 },
];

export default function AreaConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('sqmeter');
  const [toUnit, setToUnit] = useState('sqfoot');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toSqM || 1;
    const toFactor = units.find(u => u.id === to)?.toSqM || 1;
    const sqm = num * fromFactor;
    setResult((sqm / toFactor).toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg">
              <Square className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Area Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different area units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-amber-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter area"
                className="w-full px-4 py-3 text-2xl border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:border-amber-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-orange-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-orange-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:border-orange-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Quick Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 hectare = 10,000 m²</p>
              <p>1 acre = 4,047 m²</p>
              <p>1 km² = 100 hectares</p>
              <p>1 sq mile = 640 acres</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
