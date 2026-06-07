'use client';

import { useState } from 'react';
import { HardDrive, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'byte', name: 'Bytes', symbol: 'B', toByte: 1 },
  { id: 'kilobyte', name: 'Kilobytes', symbol: 'KB', toByte: 1024 },
  { id: 'megabyte', name: 'Megabytes', symbol: 'MB', toByte: 1048576 },
  { id: 'gigabyte', name: 'Gigabytes', symbol: 'GB', toByte: 1073741824 },
  { id: 'terabyte', name: 'Terabytes', symbol: 'TB', toByte: 1099511627776 },
  { id: 'petabyte', name: 'Petabytes', symbol: 'PB', toByte: 1125899906842624 },
  { id: 'bit', name: 'Bits', symbol: 'bit', toByte: 0.125 },
];

export default function DataStorageConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('gigabyte');
  const [toUnit, setToUnit] = useState('megabyte');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toByte || 1;
    const toFactor = units.find(u => u.id === to)?.toByte || 1;
    const bytes = num * fromFactor;
    setResult((bytes / toFactor).toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl shadow-lg">
              <HardDrive className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-gray-800 bg-clip-text text-transparent">
              Data Storage Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between bytes, KB, MB, GB, TB</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter data size"
                className="w-full px-4 py-3 text-2xl border-2 border-slate-300 rounded-xl focus:border-slate-500 focus:ring-2 focus:ring-slate-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-slate-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-gray-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Storage Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 KB = 1,024 Bytes</p>
              <p>1 MB = 1,024 KB</p>
              <p>1 GB = 1,024 MB</p>
              <p>1 TB = 1,024 GB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
