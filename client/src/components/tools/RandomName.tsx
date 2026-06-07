'use client';

import { useState } from 'react';
import { User, RefreshCw, Copy } from 'lucide-react';

export default function RandomName() {
  const [count, setCount] = useState(5);
  const [gender, setGender] = useState<'male' | 'female' | 'both'>('both');
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const firstNamesMale = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'];
  const firstNamesFemale = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];

  const generateNames = () => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      let firstNames = gender === 'male' ? firstNamesMale : gender === 'female' ? firstNamesFemale : [...firstNamesMale, ...firstNamesFemale];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      generated.push(`${firstName} ${lastName}`);
    }
    setNames(generated);
  };

  const copyName = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopied(index);
    setTimeout(() => setCopied(-1), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(names.join('\n'));
    setCopied(-2);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <User className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Random Name Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate random names
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="both">Both</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count: {count}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={generateNames}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition flex items-center justify-center space-x-2 mb-6"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Generate Names</span>
        </button>

        {names.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated {names.length} names
              </p>
              <button
                onClick={copyAll}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>{copied === -2 ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="space-y-2">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-white font-medium">{name}</span>
                  <button
                    onClick={() => copyName(name, index)}
                    className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm"
                  >
                    {copied === index ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
