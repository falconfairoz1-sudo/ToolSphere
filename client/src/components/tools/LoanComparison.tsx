'use client';

import { useState } from 'react';
import { GitCompare, DollarSign, Calculator } from 'lucide-react';

export default function LoanComparison() {
  const [result, setResult] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <GitCompare className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Loan Comparison Tool
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Compare multiple loan offers
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-8 text-center">
            <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is a placeholder for the Loan Comparison Tool.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Full implementation coming soon with advanced features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
