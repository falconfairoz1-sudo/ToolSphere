'use client';

import { useState } from 'react';
import { Gauge, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'kmh', name: 'Kilometers/Hour', symbol: 'km/h', toMps: 0.277778 },
  { id: 'mph', name: 'Miles/Hour', symbol: 'mph', toMps: 0.44704 },
  { id: 'mps', name: 'Meters/Second', symbol: 'm/s', toMps: 1 },
  { id: 'fps', name: 'Feet/Second', symbol: 'ft/s', toMps: 0.3048 },
  { id: 'knot', name: 'Knots', symbol: 'kn', toMps: 0.514444 },
];

export default function SpeedConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [toUnit, setToUnit] = useState('mph');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toMps || 1;
    const toFactor = units.find(u => u.id === to)?.toMps || 1;
    const mps = num * fromFactor;
    setResult((mps / toFactor).toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-lg">
              <Gauge className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Speed Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different speed units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-red-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter speed"
                className="w-full px-4 py-3 text-2xl border-2 border-red-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:border-red-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-pink-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-pink-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:border-pink-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Speed Limits</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>City: 50 km/h = 31 mph</p>
              <p>Highway: 100 km/h = 62 mph</p>
              <p>Sound: 343 m/s = 1,235 km/h</p>
              <p>Light: 299,792,458 m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
