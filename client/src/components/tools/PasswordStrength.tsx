'use client';

import { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';

export default function PasswordStrength() {
  const [password, setPassword] = useState('');

  const checkStrength = () => {
    let score = 0;
    const checks = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password),
      noCommon: !['password', '123456', 'qwerty'].some(common => 
        password.toLowerCase().includes(common)
      ),
    };

    score = Object.values(checks).filter(Boolean).length;

    let strength = 'Very Weak';
    let color = 'text-red-600';
    let bgColor = 'bg-red-500';
    let percentage = (score / 6) * 100;

    if (score >= 5) {
      strength = 'Strong';
      color = 'text-green-600';
      bgColor = 'bg-green-500';
    } else if (score >= 4) {
      strength = 'Good';
      color = 'text-blue-600';
      bgColor = 'bg-blue-500';
    } else if (score >= 3) {
      strength = 'Fair';
      color = 'text-yellow-600';
      bgColor = 'bg-yellow-500';
    } else if (score >= 2) {
      strength = 'Weak';
      color = 'text-orange-600';
      bgColor = 'bg-orange-500';
    }

    return { strength, color, bgColor, percentage, checks, score };
  };

  const result = password ? checkStrength() : null;

  const requirements = [
    { key: 'length', label: 'At least 12 characters' },
    { key: 'uppercase', label: 'Contains uppercase letters' },
    { key: 'lowercase', label: 'Contains lowercase letters' },
    { key: 'numbers', label: 'Contains numbers' },
    { key: 'symbols', label: 'Contains symbols (!@#$%)' },
    { key: 'noCommon', label: 'Not a common password' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Password Strength Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Check how secure your password is
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        {result && (
          <>
            {/* Strength Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Strength
                </span>
                <span className={`text-sm font-bold ${result.color}`}>
                  {result.strength}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.bgColor} transition-all duration-500`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Score: {result.score}/6
              </p>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Requirements:
              </p>
              {requirements.map((req) => (
                <div key={req.key} className="flex items-center space-x-3">
                  {result.checks[req.key as keyof typeof result.checks] ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${
                    result.checks[req.key as keyof typeof result.checks]
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Tip:</strong> Use a mix of uppercase, lowercase, numbers, and symbols. Avoid common words and personal information.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
