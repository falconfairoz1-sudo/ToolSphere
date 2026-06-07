'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);
  const [frequency, setFrequency] = useState<'yearly' | 'half-yearly' | 'quarterly' | 'monthly' | 'daily'>('yearly');

  const frequencies = {
    yearly: 1,
    'half-yearly': 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  const n = frequencies[frequency];
  const amount = principal * Math.pow(1 + rate / (100 * n), n * time);
  const interest = amount - principal;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate year-wise breakdown
  const yearlyBreakdown = [];
  for (let year = 1; year <= time; year++) {
    const yearAmount = principal * Math.pow(1 + rate / (100 * n), n * year);
    const yearInterest = yearAmount - principal;
    yearlyBreakdown.push({ year, amount: yearAmount, interest: yearInterest });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl mb-4">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Compound Interest Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate compound interest with detailed breakdown
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Principal Amount: {formatCurrency(principal)}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹10K</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interest Rate (p.a.): {rate}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period: {time} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Compounding Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['yearly', 'half-yearly', 'quarterly', 'monthly', 'daily'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      className={`py-3 px-4 rounded-xl font-medium transition text-sm ${
                        frequency === freq
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Results</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Principal</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(principal)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Interest Earned</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(interest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-white mr-2" />
                      <span className="text-sm text-white">Total Amount</span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                </div>

                {/* Visual Breakdown */}
                <div className="mt-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(principal / amount) * 100}%` }}
                      className="bg-blue-600 flex items-center justify-center text-xs text-white font-semibold"
                    >
                      {((principal / amount) * 100).toFixed(0)}%
                    </div>
                    <div
                      style={{ width: `${(interest / amount) * 100}%` }}
                      className="bg-green-600 flex items-center justify-center text-xs text-white font-semibold"
                    >
                      {((interest / amount) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-blue-600 dark:text-blue-400">■ Principal</span>
                    <span className="text-green-600 dark:text-green-400">■ Interest</span>
                  </div>
                </div>
              </div>

              {/* Year-wise Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 max-h-64 overflow-y-auto">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Year-wise Breakdown</h4>
                <div className="space-y-2">
                  {yearlyBreakdown.map((item) => (
                    <div key={item.year} className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-400">Year {item.year}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
