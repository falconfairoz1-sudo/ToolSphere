'use client';
import { useState } from 'react';
import { Wrench, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'nm', name: 'Newton-meters', symbol: 'Nm', toNm: 1 },
  { id: 'lbft', name: 'Pound-feet', symbol: 'lb-ft', toNm: 1.35582 },
  { id: 'lbin', name: 'Pound-inches', symbol: 'lb-in', toNm: 0.112985 },
  { id: 'kgm', name: 'Kilogram-meters', symbol: 'kg-m', toNm: 9.80665 },
];
export default function TorqueConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('nm');
  const [toUnit, setToUnit] = useState('lbft');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toNm || 1;
    const toFactor = units.find(u => u.id === to)?.toNm || 1;
    const nm = num * fromFactor;
    setResult((nm / toFactor).toFixed(4));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-zinc-50 to-stone-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-gray-600 to-zinc-700 rounded-2xl shadow-lg">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-zinc-800 bg-clip-text text-transparent">Torque Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Nm, lb-ft, kg-m</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter torque" className="w-full px-4 py-3 text-2xl border-2 border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-gray-600 to-zinc-700 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-zinc-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-zinc-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl focus:border-zinc-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-gray-600 to-zinc-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Torque Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 Nm = 0.74 lb-ft</p>
              <p>1 lb-ft = 1.36 Nm</p>
              <p>Car wheel: 80-120 Nm</p>
              <p>Bike pedal: 40-60 Nm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
