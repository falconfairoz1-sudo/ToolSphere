'use client';

import { useState } from 'react';
import { Receipt, Calculator, Plus, Minus, Copy } from 'lucide-react';

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');

  const calculateGST = () => {
    if (calculationType === 'exclusive') {
      // GST is added to the amount
      const gstAmount = (amount * gstRate) / 100;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      const totalAmount = amount + gstAmount;
      return { baseAmount: amount, gstAmount, cgst, sgst, totalAmount };
    } else {
      // GST is included in the amount
      const baseAmount = (amount * 100) / (100 + gstRate);
      const gstAmount = amount - baseAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      return { baseAmount, gstAmount, cgst, sgst, totalAmount: amount };
    }
  };

  const result = calculateGST();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const copyToClipboard = () => {
    const text = `
GST Calculation (${gstRate}% ${calculationType})
Base Amount: ${formatCurrency(result.baseAmount)}
CGST (${gstRate / 2}%): ${formatCurrency(result.cgst)}
SGST (${gstRate / 2}%): ${formatCurrency(result.sgst)}
Total GST: ${formatCurrency(result.gstAmount)}
Total Amount: ${formatCurrency(result.totalAmount)}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl mb-4">
              <Receipt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              GST Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate GST with Inclusive/Exclusive options
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Calculation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalculationType('exclusive')}
                    className={`py-4 px-4 rounded-xl font-semibold transition flex items-center justify-center ${
                      calculationType === 'exclusive'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Exclusive
                  </button>
                  <button
                    onClick={() => setCalculationType('inclusive')}
                    className={`py-4 px-4 rounded-xl font-semibold transition flex items-center justify-center ${
                      calculationType === 'inclusive'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <Minus className="w-5 h-5 mr-2" />
                    Inclusive
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {calculationType === 'exclusive'
                    ? 'GST will be added to the amount'
                    : 'GST is already included in the amount'}
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {calculationType === 'exclusive' ? 'Base Amount' : 'Total Amount'}: {formatCurrency(amount)}
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹100</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* GST Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  GST Rate: {gstRate}%
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 12, 18, 28].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setGstRate(rate)}
                      className={`py-3 px-4 rounded-xl font-bold transition ${
                        gstRate === rate
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="0"
                  max="28"
                  step="0.5"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-600 mt-3"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 About GST</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• GST = CGST + SGST (for intra-state)</li>
                  <li>• GST = IGST (for inter-state)</li>
                  <li>• Common rates: 5%, 12%, 18%, 28%</li>
                  <li>• Essential items: 0% or 5%</li>
                </ul>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-orange-600" />
                    GST Breakdown
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Base Amount</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrency(result.baseAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      CGST ({(gstRate / 2).toFixed(2)}%)
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(result.cgst)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      SGST ({(gstRate / 2).toFixed(2)}%)
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(result.sgst)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border-2 border-orange-300 dark:border-orange-700">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Total GST ({gstRate}%)
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {formatCurrency(result.gstAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg">
                    <span className="text-sm font-semibold text-white">Total Amount</span>
                    <span className="text-2xl font-bold text-white">
                      {formatCurrency(result.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Amount Breakdown</h4>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(result.baseAmount / result.totalAmount) * 100}%` }}
                    className="bg-gray-600 flex items-center justify-center text-xs text-white font-semibold"
                  >
                    {((result.baseAmount / result.totalAmount) * 100).toFixed(0)}%
                  </div>
                  <div
                    style={{ width: `${(result.cgst / result.totalAmount) * 100}%` }}
                    className="bg-blue-600 flex items-center justify-center text-xs text-white font-semibold"
                  >
                    CGST
                  </div>
                  <div
                    style={{ width: `${(result.sgst / result.totalAmount) * 100}%` }}
                    className="bg-blue-500 flex items-center justify-center text-xs text-white font-semibold"
                  >
                    SGST
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">■ Base</span>
                  <span className="text-blue-600 dark:text-blue-400">■ CGST</span>
                  <span className="text-blue-500 dark:text-blue-400">■ SGST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
