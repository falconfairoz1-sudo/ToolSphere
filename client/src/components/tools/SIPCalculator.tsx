'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const annualRate = parseFloat(expectedReturn);
    const years = parseFloat(timePeriod);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years)) return;

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = P * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = P * months;
    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      futureValue: futureValue.toFixed(2),
      totalInvestment: totalInvestment.toFixed(2),
      estimatedReturns: estimatedReturns.toFixed(2),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <TrendingUp className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SIP Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate returns on your Systematic Investment Plan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Investment (₹)
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="5000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expected Return (% per year)
            </label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="12"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculateSIP}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition mb-6"
        >
          Calculate SIP Returns
        </button>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Future Value</p>
              <p className="text-5xl font-black text-purple-600">₹{result.futureValue}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{result.totalInvestment}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Estimated Returns</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{result.estimatedReturns}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Investment Summary:</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Investment:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.totalInvestment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Returns:</span>
                  <span className="font-semibold text-green-600">₹{result.estimatedReturns}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span className="text-gray-600 dark:text-gray-400">Future Value:</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{result.futureValue}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Note:</strong> This calculation is based on the assumption that returns are compounded monthly. 
                Actual returns may vary based on market conditions. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
