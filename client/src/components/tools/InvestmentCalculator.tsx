'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, Download, PieChart } from 'lucide-react';

export default function InvestmentCalculator() {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum' | 'both'>('sip');
  const [sipAmount, setSipAmount] = useState(5000);
  const [lumpsum, setLumpsum] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [stepUp, setStepUp] = useState(0);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;
    const months = timePeriod * 12;
    let totalInvestment = 0;
    let futureValue = 0;
    let currentSIP = sipAmount;

    for (let year = 0; year < timePeriod; year++) {
      for (let month = 0; month < 12; month++) {
        totalInvestment += currentSIP;
        futureValue = (futureValue + currentSIP) * (1 + monthlyRate);
      }
      currentSIP = currentSIP * (1 + stepUp / 100);
    }

    return { totalInvestment, futureValue, returns: futureValue - totalInvestment };
  };

  const calculateLumpsum = () => {
    const futureValue = lumpsum * Math.pow(1 + returnRate / 100, timePeriod);
    return { totalInvestment: lumpsum, futureValue, returns: futureValue - lumpsum };
  };

  const calculateBoth = () => {
    const sipResult = calculateSIP();
    const lumpsumResult = calculateLumpsum();
    return {
      totalInvestment: sipResult.totalInvestment + lumpsumResult.totalInvestment,
      futureValue: sipResult.futureValue + lumpsumResult.futureValue,
      returns: sipResult.returns + lumpsumResult.returns,
    };
  };

  const result = investmentType === 'sip' ? calculateSIP() : investmentType === 'lumpsum' ? calculateLumpsum() : calculateBoth();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Investment Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate SIP, Lumpsum, and Compound Interest Returns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              {/* Investment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Investment Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['sip', 'lumpsum', 'both'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInvestmentType(type)}
                      className={`py-3 px-4 rounded-xl font-semibold transition ${
                        investmentType === type
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {type === 'sip' ? 'SIP' : type === 'lumpsum' ? 'Lumpsum' : 'Both'}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIP Amount */}
              {(investmentType === 'sip' || investmentType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly SIP Amount: {formatCurrency(sipAmount)}
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>₹500</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>
              )}

              {/* Lumpsum Amount */}
              {(investmentType === 'lumpsum' || investmentType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lumpsum Amount: {formatCurrency(lumpsum)}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={lumpsum}
                    onChange={(e) => setLumpsum(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>₹10,000</span>
                    <span>₹1,00,00,000</span>
                  </div>
                </div>
              )}

              {/* Expected Return Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Return Rate (p.a.): {returnRate}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period: {timePeriod} years
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>40 years</span>
                </div>
              </div>

              {/* Step Up (SIP only) */}
              {(investmentType === 'sip' || investmentType === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Annual Step-Up: {stepUp}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={stepUp}
                    onChange={(e) => setStepUp(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-green-600" />
                  Investment Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Investment</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(result.totalInvestment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Returns</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(result.returns)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-white mr-2" />
                      <span className="text-sm text-white">Future Value</span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {formatCurrency(result.futureValue)}
                    </span>
                  </div>
                </div>

                {/* Visual Breakdown */}
                <div className="mt-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(result.totalInvestment / result.futureValue) * 100}%` }}
                      className="bg-blue-600 flex items-center justify-center text-xs text-white font-semibold"
                    >
                      {((result.totalInvestment / result.futureValue) * 100).toFixed(0)}%
                    </div>
                    <div
                      style={{ width: `${(result.returns / result.futureValue) * 100}%` }}
                      className="bg-green-600 flex items-center justify-center text-xs text-white font-semibold"
                    >
                      {((result.returns / result.futureValue) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-blue-600 dark:text-blue-400">■ Investment</span>
                    <span className="text-green-600 dark:text-green-400">■ Returns</span>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Key Insights</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Your investment will grow {((result.futureValue / result.totalInvestment) - 1).toFixed(2)}x in {timePeriod} years</li>
                  <li>• Average annual return: {returnRate}%</li>
                  {investmentType === 'sip' && stepUp > 0 && (
                    <li>• With {stepUp}% annual step-up, your final SIP will be {formatCurrency(sipAmount * Math.pow(1 + stepUp / 100, timePeriod))}</li>
                  )}
                  <li>• Total wealth created: {formatCurrency(result.returns)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
