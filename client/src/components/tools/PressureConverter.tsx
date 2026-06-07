'use client';
import { useState } from 'react';
import { Wind, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'pascal', name: 'Pascal', symbol: 'Pa', toPa: 1 },
  { id: 'bar', name: 'Bar', symbol: 'bar', toPa: 100000 },
  { id: 'psi', name: 'PSI', symbol: 'psi', toPa: 6894.76 },
  { id: 'atm', name: 'Atmosphere', symbol: 'atm', toPa: 101325 },
  { id: 'torr', name: 'Torr', symbol: 'torr', toPa: 133.322 },
];
export default function PressureConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('bar');
  const [toUnit, setToUnit] = useState('psi');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toPa || 1;
    const toFactor = units.find(u => u.id === to)?.toPa || 1;
    const pa = num * fromFactor;
    setResult((pa / toFactor).toFixed(6));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Pressure Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between PSI, bar, pascal, atmosphere</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-teal-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter pressure" className="w-full px-4 py-3 text-2xl border-2 border-teal-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-teal-300 rounded-xl focus:border-teal-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-cyan-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-cyan-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 bar = 100,000 Pa</p>
              <p>1 atm = 101,325 Pa</p>
              <p>1 psi = 6,895 Pa</p>
              <p>Tire: 30-35 psi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
