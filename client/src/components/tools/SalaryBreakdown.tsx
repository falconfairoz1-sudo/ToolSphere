'use client';

import { useState } from 'react';
import { Wallet, TrendingDown } from 'lucide-react';

export default function SalaryBreakdown() {
  const [ctc, setCtc] = useState(1200000);
  
  const basicSalary = ctc * 0.40;
  const hra = basicSalary * 0.50;
  const specialAllowance = ctc * 0.20;
  const pf = basicSalary * 0.12;
  const professionalTax = 2400;
  const incomeTax = ctc > 1000000 ? ctc * 0.10 : ctc * 0.05;
  
  const grossSalary = basicSalary + hra + specialAllowance;
  const totalDeductions = pf + professionalTax + incomeTax;
  const inHand = grossSalary - totalDeductions;
  const monthlyInHand = inHand / 12;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl mb-4">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Salary Breakdown Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              CTC to In-hand Salary Calculator
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual CTC: {formatCurrency(ctc)}
            </label>
            <input
              type="range"
              min="300000"
              max="10000000"
              step="50000"
              value={ctc}
              onChange={(e) => setCtc(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Earnings</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>Basic Salary (40%)</span>
                  <span className="font-semibold">{formatCurrency(basicSalary)}</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>HRA (50% of Basic)</span>
                  <span className="font-semibold">{formatCurrency(hra)}</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>Special Allowance</span>
                  <span className="font-semibold">{formatCurrency(specialAllowance)}</span>
                </div>
                <div className="flex justify-between p-3 bg-green-600 text-white rounded-lg font-bold">
                  <span>Gross Salary</span>
                  <span>{formatCurrency(grossSalary)}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Deductions</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>PF (12% of Basic)</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(pf)}</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>Professional Tax</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(professionalTax)}</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white dark:bg-gray-800 rounded">
                  <span>Income Tax (Est.)</span>
                  <span className="font-semibold text-red-600">-{formatCurrency(incomeTax)}</span>
                </div>
                <div className="flex justify-between p-3 bg-red-600 text-white rounded-lg font-bold">
                  <span>Total Deductions</span>
                  <span>{formatCurrency(totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Annual In-hand</p>
                <p className="text-3xl font-bold">{formatCurrency(inHand)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Monthly In-hand</p>
                <p className="text-3xl font-bold">{formatCurrency(monthlyInHand)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
