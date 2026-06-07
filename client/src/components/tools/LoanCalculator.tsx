'use client';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years)) return;

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    // Monthly payment formula
    const monthlyPayment = (P * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: P.toFixed(2),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <DollarSign className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Loan Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your loan payments and total interest
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="100000"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interest Rate (% per year)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="5.5"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculateLoan}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition mb-6"
        >
          Calculate Loan
        </button>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Payment</p>
              <p className="text-5xl font-black text-yellow-600">${result.monthlyPayment}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.principal}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="text-sm text-red-600 dark:text-red-400 mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.totalInterest}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Total Payment</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.totalPayment}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Loan Summary:</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Principal Amount:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${result.principal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Interest Paid:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${result.totalInterest}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-300 dark:border-gray-600 pt-2">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount Paid:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${result.totalPayment}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
