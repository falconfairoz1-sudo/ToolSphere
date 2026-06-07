'use client';
import { useState } from 'react';
import { Zap, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'joule', name: 'Joules', symbol: 'J', toJ: 1 },
  { id: 'calorie', name: 'Calories', symbol: 'cal', toJ: 4.184 },
  { id: 'kcal', name: 'Kilocalories', symbol: 'kcal', toJ: 4184 },
  { id: 'kwh', name: 'Kilowatt-hours', symbol: 'kWh', toJ: 3600000 },
  { id: 'btu', name: 'BTU', symbol: 'BTU', toJ: 1055.06 },
];
export default function EnergyConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kcal');
  const [toUnit, setToUnit] = useState('joule');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toJ || 1;
    const toFactor = units.find(u => u.id === to)?.toJ || 1;
    const j = num * fromFactor;
    setResult((j / toFactor).toFixed(6));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Energy Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between joules, calories, BTU, kWh</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-yellow-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter energy" className="w-full px-4 py-3 text-2xl border-2 border-yellow-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:border-yellow-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-amber-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-amber-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl focus:border-amber-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Energy Facts</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 kcal = 4,184 J</p>
              <p>1 kWh = 3.6 MJ</p>
              <p>1 BTU = 1,055 J</p>
              <p>Food: 2000 kcal/day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
