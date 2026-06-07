'use client';

import { useState } from 'react';
import { Mail, Check, X } from 'lucide-react';

export default function EmailValidator() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    const checks = {
      format: emailRegex.test(email),
      hasAt: email.includes('@'),
      hasDot: email.includes('.'),
      noSpaces: !/\s/.test(email),
      validLength: email.length >= 5 && email.length <= 254,
      validDomain: email.split('@')[1]?.includes('.'),
    };

    const [localPart, domain] = email.split('@');

    setResult({
      isValid,
      checks,
      localPart: localPart || '',
      domain: domain || '',
      length: email.length,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Mail className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Email Validator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Validate email addresses
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <button
          onClick={validateEmail}
          disabled={!email}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition mb-6"
        >
          Validate Email
        </button>

        {result && (
          <>
            {/* Result */}
            <div className={`p-6 rounded-xl mb-6 text-center ${
              result.isValid
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              {result.isValid ? (
                <Check className="w-16 h-16 text-green-500 mx-auto mb-3" />
              ) : (
                <X className="w-16 h-16 text-red-500 mx-auto mb-3" />
              )}
              <p className={`text-2xl font-bold ${
                result.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {result.isValid ? 'Valid Email' : 'Invalid Email'}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Email Parts:
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">Local Part:</span> {result.localPart || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">Domain:</span> {result.domain || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-semibold">Length:</span> {result.length} characters
                  </p>
                </div>
              </div>

              {/* Checks */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Validation Checks:
                </p>
                {Object.entries(result.checks).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    {value ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
