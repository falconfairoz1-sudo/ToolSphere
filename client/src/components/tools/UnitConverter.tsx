'use client';

import { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const units: Record<string, Record<string, number>> = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701,
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
    },
    temperature: {
      celsius: 1,
      fahrenheit: 1,
      kelvin: 1,
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
    },
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (category === 'temperature') {
      let celsius;
      if (fromUnit === 'celsius') celsius = val;
      else if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      else celsius = val - 273.15;

      let res;
      if (toUnit === 'celsius') res = celsius;
      else if (toUnit === 'fahrenheit') res = celsius * 9/5 + 32;
      else res = celsius + 273.15;

      setResult(res.toFixed(2));
    } else {
      const baseValue = val / units[category][fromUnit];
      const convertedValue = baseValue * units[category][toUnit];
      setResult(convertedValue.toFixed(6));
    }
  };

  const categories = {
    length: 'Length',
    weight: 'Weight',
    temperature: 'Temperature',
    volume: 'Volume',
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Ruler className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Unit Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert between different units
          </p>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const firstUnit = Object.keys(units[e.target.value])[0];
              setFromUnit(firstUnit);
              setToUnit(Object.keys(units[e.target.value])[1]);
            }}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* From */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              {Object.keys(units[category]).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              {Object.keys(units[category]).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Value */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <button
          onClick={convert}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition mb-6"
        >
          Convert
        </button>

        {/* Result */}
        {result && (
          <div className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {result} {toUnit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
