'use client';

import { useState } from 'react';
import { FileText, Calculator, TrendingDown, Copy } from 'lucide-react';

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1000000);
  const [age, setAge] = useState<'below60' | '60to80' | 'above80'>('below60');
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [otherDeductions, setOtherDeductions] = useState(50000);
  const [regime, setRegime] = useState<'old' | 'new' | 'both'>('both');

  const calculateOldRegime = () => {
    const totalDeductions = deductions80C + deductions80D + otherDeductions;
    const taxableIncome = Math.max(0, income - totalDeductions - 50000); // Standard deduction
    
    let tax = 0;
    const basicExemption = age === 'below60' ? 250000 : age === '60to80' ? 300000 : 500000;
    
    if (taxableIncome <= basicExemption) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - basicExemption) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = (500000 - basicExemption) * 0.05 + (taxableIncome - 500000) * 0.20;
    } else {
      tax = (500000 - basicExemption) * 0.05 + 500000 * 0.20 + (taxableIncome - 1000000) * 0.30;
    }

    // Add cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      taxableIncome,
      tax,
      cess,
      totalTax,
      deductions: totalDeductions + 50000,
      takeHome: income - totalTax,
    };
  };

  const calculateNewRegime = () => {
    const taxableIncome = Math.max(0, income - 50000); // Only standard deduction
    
    let tax = 0;
    
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
      tax = 300000 * 0.05 + (taxableIncome - 600000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 300000 * 0.05 + 300000 * 0.10 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (taxableIncome - 1500000) * 0.30;
    }

    // Add cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      taxableIncome,
      tax,
      cess,
      totalTax,
      deductions: 50000,
      takeHome: income - totalTax,
    };
  };

  const oldRegimeResult = calculateOldRegime();
  const newRegimeResult = calculateNewRegime();
  const savings = oldRegimeResult.totalTax - newRegimeResult.totalTax;
  const betterRegime = savings > 0 ? 'new' : 'old';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Income Tax Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Compare Old vs New Tax Regime (FY 2024-25)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Annual Income: {formatCurrency(income)}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Age Group
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'below60', label: 'Below 60 years' },
                    { value: '60to80', label: '60 to 80 years' },
                    { value: 'above80', label: 'Above 80 years' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAge(option.value as any)}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition ${
                        age === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Deductions (Old Regime)
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                      80C (Max ₹1.5L): {formatCurrency(deductions80C)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="10000"
                      value={deductions80C}
                      onChange={(e) => setDeductions80C(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                      80D (Max ₹50K): {formatCurrency(deductions80D)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="5000"
                      value={deductions80D}
                      onChange={(e) => setDeductions80D(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Other: {formatCurrency(otherDeductions)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(Number(e.target.value))}
                      className="w-full accent-orange-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Old Regime */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Old Tax Regime
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Gross Income</span>
                    <span className="font-semibold">{formatCurrency(income)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Deductions</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(oldRegimeResult.deductions)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Taxable Income</span>
                    <span className="font-bold">{formatCurrency(oldRegimeResult.taxableIncome)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Income Tax</span>
                    <span className="font-semibold text-red-600">{formatCurrency(oldRegimeResult.tax)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Cess (4%)</span>
                    <span className="font-semibold text-red-600">{formatCurrency(oldRegimeResult.cess)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
                    <span className="text-white font-semibold">Total Tax</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(oldRegimeResult.totalTax)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Take Home</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(oldRegimeResult.takeHome)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: New Regime */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  New Tax Regime
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Gross Income</span>
                    <span className="font-semibold">{formatCurrency(income)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Deductions</span>
                    <span className="font-semibold text-green-600">-{formatCurrency(newRegimeResult.deductions)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Taxable Income</span>
                    <span className="font-bold">{formatCurrency(newRegimeResult.taxableIncome)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Income Tax</span>
                    <span className="font-semibold text-red-600">{formatCurrency(newRegimeResult.tax)}</span>
                  </div>

                  <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-400">Cess (4%)</span>
                    <span className="font-semibold text-red-600">{formatCurrency(newRegimeResult.cess)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                    <span className="text-white font-semibold">Total Tax</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(newRegimeResult.totalTax)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Take Home</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(newRegimeResult.takeHome)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingDown className="w-6 h-6 mr-2 text-green-600" />
              Recommendation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Better Regime</p>
                <p className="text-2xl font-bold text-green-600">
                  {betterRegime === 'old' ? 'Old Regime' : 'New Regime'}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tax Savings</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(Math.abs(savings))}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Effective Tax Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {((Math.min(oldRegimeResult.totalTax, newRegimeResult.totalTax) / income) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
