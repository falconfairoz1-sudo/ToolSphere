'use client';

import { useState } from 'react';
import { Droplet, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'liter', name: 'Liters', symbol: 'L', toLiter: 1 },
  { id: 'milliliter', name: 'Milliliters', symbol: 'mL', toLiter: 0.001 },
  { id: 'gallon', name: 'Gallons (US)', symbol: 'gal', toLiter: 3.78541 },
  { id: 'quart', name: 'Quarts', symbol: 'qt', toLiter: 0.946353 },
  { id: 'pint', name: 'Pints', symbol: 'pt', toLiter: 0.473176 },
  { id: 'cup', name: 'Cups', symbol: 'cup', toLiter: 0.236588 },
  { id: 'fluidounce', name: 'Fluid Ounces', symbol: 'fl oz', toLiter: 0.0295735 },
  { id: 'tablespoon', name: 'Tablespoons', symbol: 'tbsp', toLiter: 0.0147868 },
  { id: 'teaspoon', name: 'Teaspoons', symbol: 'tsp', toLiter: 0.00492892 },
  { id: 'cubicmeter', name: 'Cubic Meters', symbol: 'm³', toLiter: 1000 },
];

export default function VolumeConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('liter');
  const [toUnit, setToUnit] = useState('gallon');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') { setResult(''); return; }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const fromFactor = units.find(u => u.id === from)?.toLiter || 1;
    const toFactor = units.find(u => u.id === to)?.toLiter || 1;
    const liters = num * fromFactor;
    setResult((liters / toFactor).toFixed(6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
              <Droplet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Volume Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different volume units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-cyan-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => { setValue(e.target.value); convert(e.target.value, fromUnit, toUnit); }}
                placeholder="Enter volume"
                className="w-full px-4 py-3 text-2xl border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => { setFromUnit(e.target.value); convert(value, e.target.value, toUnit); }}
                className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => { const t = fromUnit; setFromUnit(toUnit); setToUnit(t); convert(value, toUnit, fromUnit); }}
                className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-blue-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-blue-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => { setToUnit(e.target.value); convert(value, fromUnit, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Cooking Conversions</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 cup = 236.6 mL</p>
              <p>1 gallon = 3.79 L</p>
              <p>1 tbsp = 3 tsp</p>
              <p>1 L = 4.23 cups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
