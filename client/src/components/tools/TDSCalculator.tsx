'use client';

import { useState } from 'react';
import { Calculator, FileText } from 'lucide-react';

export default function TDSCalculator() {
  const [income, setIncome] = useState(500000);
  const [tdsRate, setTdsRate] = useState(10);

  const tdsAmount = (income * tdsRate) / 100;
  const netIncome = income - tdsAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              TDS Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate Tax Deducted at Source
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gross Income: {formatCurrency(income)}
              </label>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                TDS Rate: {tdsRate}%
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {[1, 2, 5, 10, 20].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setTdsRate(rate)}
                    className={`py-2 rounded-lg font-semibold ${
                      tdsRate === rate
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={tdsRate}
                onChange={(e) => setTdsRate(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Gross Income</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(income)}</span>
              </div>
              <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">TDS Deducted ({tdsRate}%)</span>
                <span className="font-bold text-red-600">{formatCurrency(tdsAmount)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <span className="text-white font-semibold">Net Income</span>
                <span className="text-2xl font-bold text-white">{formatCurrency(netIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
