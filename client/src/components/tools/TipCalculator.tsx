'use client';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseInt(people);

    if (isNaN(billAmount) || isNaN(tip) || isNaN(numPeople)) return;

    const tipAmount = (billAmount * tip) / 100;
    const total = billAmount + tipAmount;
    const perPerson = total / numPeople;
    const tipPerPerson = tipAmount / numPeople;

    setResult({
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
    });
  };

  const quickTip = (percent: number) => {
    setTipPercent(percent.toString());
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <DollarSign className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tip Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate tips and split bills
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bill Amount ($)
            </label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="50.00"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tip Percentage: {tipPercent}%
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between mt-2 space-x-2">
              {[10, 15, 18, 20, 25].map((percent) => (
                <button
                  key={percent}
                  onClick={() => quickTip(percent)}
                  className={`flex-1 py-2 rounded-lg font-medium transition ${
                    tipPercent === percent.toString()
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of People
            </label>
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition mb-6"
        >
          Calculate
        </button>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Tip Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.tipAmount}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.total}</p>
              </div>
            </div>

            {parseInt(people) > 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Per Person</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.perPerson}</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                  <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">Tip Per Person</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${result.tipPerPerson}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
