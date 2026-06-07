'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';

export default function TaxEstimator() {
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [result, setResult] = useState<any>(null);

  const calculateTax = () => {
    const grossIncome = parseFloat(income);
    const totalDeductions = parseFloat(deductions) || 0;

    if (isNaN(grossIncome)) return;

    const taxableIncome = grossIncome - totalDeductions;
    let tax = 0;

    if (taxRegime === 'new') {
      // New Tax Regime (India 2024)
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.20;
      } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.30;
      }
    } else {
      // Old Tax Regime (India)
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.20;
      } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.30;
      }
    }

    // Add 4% cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netIncome = grossIncome - totalTax;
    const effectiveRate = (totalTax / grossIncome) * 100;

    setResult({
      grossIncome: grossIncome.toFixed(2),
      deductions: totalDeductions.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      tax: tax.toFixed(2),
      cess: cess.toFixed(2),
      totalTax: totalTax.toFixed(2),
      netIncome: netIncome.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tax Estimator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Estimate your income tax liability (India)
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax Regime
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTaxRegime('new')}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                taxRegime === 'new'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              New Regime
            </button>
            <button
              onClick={() => setTaxRegime('old')}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                taxRegime === 'old'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Old Regime
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual Income (₹)
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="1000000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deductions (₹) {taxRegime === 'new' && <span className="text-xs text-gray-500">(Limited in new regime)</span>}
            </label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              placeholder="50000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculateTax}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition mb-6"
        >
          Calculate Tax
        </button>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Tax Liability</p>
              <p className="text-5xl font-black text-indigo-600">₹{result.totalTax}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Effective Tax Rate: {result.effectiveRate}%
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Gross Income</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{result.grossIncome}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Net Income</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{result.netIncome}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tax Breakdown:</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.grossIncome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Deductions:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.deductions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.taxableIncome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Income Tax:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Health & Education Cess (4%):</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{result.cess}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Tax:</span>
                  <span className="font-bold text-indigo-600">₹{result.totalTax}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Disclaimer:</strong> This is an estimate based on standard tax slabs for India. 
                Actual tax liability may vary based on various factors. Please consult a tax professional for accurate calculations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
