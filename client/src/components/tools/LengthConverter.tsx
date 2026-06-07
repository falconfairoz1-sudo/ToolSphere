'use client';

import { useState } from 'react';
import { Ruler, ArrowLeftRight } from 'lucide-react';

const units = [
  { id: 'meter', name: 'Meters', symbol: 'm', toMeter: 1 },
  { id: 'kilometer', name: 'Kilometers', symbol: 'km', toMeter: 1000 },
  { id: 'centimeter', name: 'Centimeters', symbol: 'cm', toMeter: 0.01 },
  { id: 'millimeter', name: 'Millimeters', symbol: 'mm', toMeter: 0.001 },
  { id: 'mile', name: 'Miles', symbol: 'mi', toMeter: 1609.34 },
  { id: 'yard', name: 'Yards', symbol: 'yd', toMeter: 0.9144 },
  { id: 'foot', name: 'Feet', symbol: 'ft', toMeter: 0.3048 },
  { id: 'inch', name: 'Inches', symbol: 'in', toMeter: 0.0254 },
];

export default function LengthConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState('');

  const convert = (val: string, from: string, to: string) => {
    if (val === '') {
      setResult('');
      return;
    }
    const num = parseFloat(val);
    if (isNaN(num)) {
      setResult('');
      return;
    }
    const fromFactor = units.find(u => u.id === from)?.toMeter || 1;
    const toFactor = units.find(u => u.id === to)?.toMeter || 1;
    const meters = num * fromFactor;
    const converted = meters / toFactor;
    setResult(converted.toFixed(6));
  };

  const handleValueChange = (val: string) => {
    setValue(val);
    convert(val, fromUnit, toUnit);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    convert(value, unit, toUnit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    convert(value, fromUnit, unit);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    convert(value, toUnit, fromUnit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Length Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different length units</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-blue-900 mb-3">From</label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="Enter value"
                className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all mb-3"
              />
              <select
                value={fromUnit}
                onChange={(e) => handleFromUnitChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swap}
                className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-indigo-900 mb-3">To</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-indigo-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => handleToUnitChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl focus:border-indigo-500 outline-none"
              >
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Common Conversions</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>1 meter = 3.28 feet</p>
              <p>1 kilometer = 0.62 miles</p>
              <p>1 inch = 2.54 cm</p>
              <p>1 mile = 1.61 km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
