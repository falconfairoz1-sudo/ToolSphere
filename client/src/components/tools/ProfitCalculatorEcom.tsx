'use client';

import { useState } from 'react';
import ToolLayout from '../ui/ToolLayout';
import { Download, Copy, Check } from 'lucide-react';

export default function ProfitCalculatorEcom() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    // TODO: Implement E-Commerce Profit Calculator logic
    setOutput('Processing...');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="E-Commerce Profit Calculator"
      description="Advanced e-commerce profit calculator with full features"
      icon="💰"
      gradient="from-green-600 to-emerald-700"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Input
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleProcess}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            Process
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Output
            </h3>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              disabled={!output}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
