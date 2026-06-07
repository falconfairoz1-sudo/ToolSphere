'use client';
import { useState } from 'react';
import { Radio, ArrowLeftRight } from 'lucide-react';
const units = [
  { id: 'hz', name: 'Hertz', symbol: 'Hz', toHz: 1 },
  { id: 'khz', name: 'Kilohertz', symbol: 'kHz', toHz: 1000 },
  { id: 'mhz', name: 'Megahertz', symbol: 'MHz', toHz: 1000000 },
  { id: 'ghz', name: 'Gigahertz', symbol: 'GHz', toHz: 1000000000 },
];
export default function FrequencyConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('mhz');
  const [toUnit, setToUnit] = useState('ghz');
  const [result, setResult] = useState('');
  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toHz || 1;
    const toFactor = units.find(u => u.id === to)?.toHz || 1;
    const hz = num * fromFactor;
    setResult((hz / toFactor).toFixed(6));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-2xl shadow-lg">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Frequency Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Hz, kHz, MHz, GHz</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-purple-900 mb-3">From</label>
              <input type="number" value={value} onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }} placeholder="Enter frequency" className="w-full px-4 py-3 text-2xl border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all mb-3" />
              <select value={fromUnit} onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }} className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:border-purple-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
            <div className="flex justify-center">
              <button onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }} className="p-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full hover:shadow-lg transition-all">
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-fuchsia-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-fuchsia-300 rounded-xl mb-3 min-h-[60px] flex items-center">{result || '0'}</div>
              <select value={toUnit} onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }} className="w-full px-4 py-3 border-2 border-fuchsia-300 rounded-xl focus:border-fuchsia-500 outline-none">
                {units.map(unit => (<option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>))}
              </select>
            </div>
          </div>
          <div className="mt-6 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Common Frequencies</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>AM Radio: 540-1600 kHz</p>
              <p>FM Radio: 88-108 MHz</p>
              <p>WiFi: 2.4/5 GHz</p>
              <p>CPU: 2-5 GHz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
