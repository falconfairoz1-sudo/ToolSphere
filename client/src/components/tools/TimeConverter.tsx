'use client';

import { useState } from 'react';
import { Clock, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'second', name: 'Seconds', symbol: 's', toSec: 1 },
  { id: 'minute', name: 'Minutes', symbol: 'min', toSec: 60 },
  { id: 'hour', name: 'Hours', symbol: 'h', toSec: 3600 },
  { id: 'day', name: 'Days', symbol: 'd', toSec: 86400 },
  { id: 'week', name: 'Weeks', symbol: 'wk', toSec: 604800 },
  { id: 'month', name: 'Months (30 days)', symbol: 'mo', toSec: 2592000 },
  { id: 'year', name: 'Years (365 days)', symbol: 'yr', toSec: 31536000 },
];

export default function TimeConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('hour');
  const [toUnit, setToUnit] = useState('minute');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toSec || 1;
    const toFactor = units.find(u => u.id === to)?.toSec || 1;
    const sec = num * fromFactor;
    setResult((sec / toFactor).toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Time Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different time units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-violet-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter time"
                className="w-full px-4 py-3 text-2xl border-2 border-violet-300 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-violet-300 rounded-xl focus:border-violet-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-purple-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-purple-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Time Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 hour = 60 minutes</p>
              <p>1 day = 24 hours</p>
              <p>1 week = 7 days</p>
              <p>1 year = 365 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
