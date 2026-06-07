'use client';
import { useState } from 'react';
import { Fuel, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'mpg', name: 'Miles per Gallon (US)', symbol: 'MPG', toMpg: 1 },
  { id: 'mpg-uk', name: 'Miles per Gallon (UK)', symbol: 'MPG (UK)', toMpg: 1.20095 },
  { id: 'kml', name: 'Kilometers per Liter', symbol: 'km/L', toMpg: 2.35215 },
  { id: 'l100km', name: 'Liters per 100km', symbol: 'L/100km', toMpg: -1 },
];
export default function FuelConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('mpg');
  const [toUnit, setToUnit] = useState('l100km');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    let mpg = num;
    if (from === 'mpg-uk') mpg = num / 1.20095;
    if (from === 'kml') mpg = num / 2.35215;
    if (from === 'l100km') mpg = 235.215 / num;
    let res = mpg;
    if (to === 'mpg-uk') res = mpg * 1.20095;
    if (to === 'kml') res = mpg * 2.35215;
    if (to === 'l100km') res = 235.215 / mpg;
    setResult(res.toFixed(2));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <Fuel className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Fuel Efficiency Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between MPG, L/100km, km/L</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-orange-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter fuel efficiency" className="w-full px-4 py-3 text-2xl border-2 border-orange-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:border-orange-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-red-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-red-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:border-red-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Fuel Economy</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>Good: 30+ MPG</p>
              <p>Excellent: 40+ MPG</p>
              <p>Hybrid: 50+ MPG</p>
              <p>Electric: 100+ MPGe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
