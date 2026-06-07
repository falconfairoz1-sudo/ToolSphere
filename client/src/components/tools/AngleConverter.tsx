'use client';
import { useState } from 'react';
import { Circle, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'degree', name: 'Degrees', symbol: '°', toBase: 1 },
  { id: 'radian', name: 'Radians', symbol: 'rad', toBase: 57.2958 },
  { id: 'gradian', name: 'Gradians', symbol: 'grad', toBase: 0.9 },
];
export default function AngleConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('degree');
  const [toUnit, setToUnit] = useState('radian');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toBase || 1;
    const toFactor = units.find(u => u.id === to)?.toBase || 1;
    const base = num * fromFactor;
    setResult((base / toFactor).toFixed(6));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-lg">
              <Circle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Angle Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between degrees, radians, gradians</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-rose-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter value" className="w-full px-4 py-3 text-2xl border-2 border-rose-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-rose-300 rounded-xl focus:border-rose-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-pink-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-pink-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:border-pink-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>360� = 2p rad</p>
              <p>90� = p/2 rad</p>
              <p>1 rad = 57.3�</p>
              <p>Circle = 360�</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
