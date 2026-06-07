'use client';

import { useState } from 'react';
import { Activity } from 'lucide-react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!w || !h) return;
    
    let bmiValue;
    if (unit === 'metric') {
      bmiValue = w / ((h / 100) ** 2);
    } else {
      bmiValue = (w / (h ** 2)) * 703;
    }
    
    setBmi(parseFloat(bmiValue.toFixed(1)));
  };

  const getCategory = () => {
    if (!bmi) return { text: '', color: '', desc: '' };
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-600', desc: 'Below healthy weight' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-600', desc: 'Healthy weight range' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-orange-600', desc: 'Above healthy weight' };
    return { text: 'Obese', color: 'text-red-600', desc: 'Significantly above healthy weight' };
  };

  const category = getCategory();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Activity className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            BMI Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your Body Mass Index
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setUnit('metric')}
              className={`px-6 py-2 rounded-l-lg font-medium transition ${
                unit === 'metric'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-6 py-2 rounded-r-lg font-medium transition ${
                unit === 'imperial'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '170' : '67'}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition mb-6"
        >
          Calculate BMI
        </button>

        {/* Result */}
        {bmi !== null && (
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your BMI</p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">{bmi}</p>
            <p className={`text-xl font-semibold ${category.color} mb-1`}>{category.text}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{category.desc}</p>
          </div>
        )}

        {/* BMI Chart */}
        <div className="mt-8 space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">BMI Categories</p>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Underweight: &lt; 18.5</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Normal: 18.5 - 24.9</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Overweight: 25 - 29.9</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Obese: ≥ 30</span>
          </div>
        </div>
      </div>
    </div>
  );
}
