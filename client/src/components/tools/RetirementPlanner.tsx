'use client';

import { useState } from 'react';
import { PiggyBank, Calendar, TrendingUp, DollarSign, Target } from 'lucide-react';

export default function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [returnRate, setReturnRate] = useState(12);

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Calculate future monthly expense at retirement
  const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetirement);
  
  // Calculate corpus needed at retirement
  const corpusNeeded = (futureMonthlyExpense * 12 * yearsInRetirement) / (1 - Math.pow(1 + inflation / 100, yearsInRetirement) / Math.pow(1 + returnRate / 100, yearsInRetirement));
  
  // Calculate future value of current savings
  const futureValueOfSavings = currentSavings * Math.pow(1 + returnRate / 100, yearsToRetirement);
  
  // Calculate additional corpus needed
  const additionalCorpusNeeded = Math.max(0, corpusNeeded - futureValueOfSavings);
  
  // Calculate monthly SIP needed
  const monthlyRate = returnRate / 12 / 100;
  const months = yearsToRetirement * 12;
  const monthlySIPNeeded = additionalCorpusNeeded * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <PiggyBank className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Retirement Planner
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Plan your retirement and calculate corpus needed
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Age: {currentAge}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Retirement Age: {retirementAge}
                  </label>
                  <input
                    type="range"
                    min="45"
                    max="75"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Life Expectancy: {lifeExpectancy} years
                </label>
                <input
                  type="range"
                  min="65"
                  max="100"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Savings: {formatCurrency(currentSavings)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="50000"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Monthly Expense: {formatCurrency(monthlyExpense)}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inflation: {inflation}%
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="0.5"
                    value={inflation}
                    onChange={(e) => setInflation(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Rate: {returnRate}%
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Retirement Plan</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Years to Retirement</span>
                    <span className="font-bold text-gray-900 dark:text-white">{yearsToRetirement} years</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Years in Retirement</span>
                    <span className="font-bold text-gray-900 dark:text-white">{yearsInRetirement} years</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Future Monthly Expense</span>
                    <span className="font-bold text-orange-600">{formatCurrency(futureMonthlyExpense)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                    <span className="text-sm text-white">Corpus Needed</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(corpusNeeded)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Future Value of Savings</span>
                    <span className="font-bold text-green-600">{formatCurrency(futureValueOfSavings)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Additional Corpus Needed</span>
                    <span className="font-bold text-red-600">{formatCurrency(additionalCorpusNeeded)}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                    <span className="text-sm text-white">Monthly SIP Required</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(monthlySIPNeeded)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Recommendations</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Start investing {formatCurrency(monthlySIPNeeded)} monthly via SIP</li>
                  <li>• Your expenses will be {formatCurrency(futureMonthlyExpense)}/month at retirement</li>
                  <li>• Consider increasing SIP by 10% annually</li>
                  <li>• Review and rebalance portfolio every year</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
