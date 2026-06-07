'use client';
import { useState } from 'react';
import { Bolt, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'watt', name: 'Watts', symbol: 'W', toBase: 1 },
  { id: 'kilowatt', name: 'Kilowatts', symbol: 'kW', toBase: 1000 },
  { id: 'hp', name: 'Horsepower', symbol: 'hp', toBase: 745.7 },
  { id: 'btuh', name: 'BTU/hour', symbol: 'BTU/h', toBase: 0.293071 },
];
export default function PowerConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('watt');
  const [toUnit, setToUnit] = useState('kilowatt');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
              <Bolt className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Power Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between watts, horsepower, BTU/h</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-indigo-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter value" className="w-full px-4 py-3 text-2xl border-2 border-indigo-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl focus:border-indigo-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-purple-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-purple-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Reference</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 hp = 746 W</p>
              <p>1 kW = 1000 W</p>
              <p>1 BTU/h = 0.293 W</p>
              <p>Light bulb: 60 W</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
