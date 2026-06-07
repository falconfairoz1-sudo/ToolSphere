'use client';

import { useState } from 'react';
import { DollarSign, RefreshCw } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Common exchange rates (simplified - in production use a real API)
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    MXN: 17.05,
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  ];

  const convert = () => {
    setLoading(true);
    setTimeout(() => {
      const amt = parseFloat(amount);
      if (isNaN(amt)) return;

      // Convert to USD first, then to target currency
      const inUSD = amt / rates[from];
      const converted = inUSD * rates[to];
      setResult(converted);
      setLoading(false);
    }, 500);
  };

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    if (result) {
      setAmount(result.toFixed(2));
      setResult(parseFloat(amount));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <DollarSign className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Currency Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert between different currencies
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-lg"
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swap}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <RefreshCw className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 transition mb-6"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result !== null && (
          <div className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {amount} {from} =
            </p>
            <p className="text-5xl font-black text-primary-600 mb-2">
              {result.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">{to}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Exchange rate: 1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Exchange rates are approximate and for demonstration purposes. Use official rates for actual transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
