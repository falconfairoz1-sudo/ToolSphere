'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    
    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      daysToNextBirthday,
      nextBirthday: nextBirthday.toLocaleDateString(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Calendar className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Age Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate your exact age and more
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition mb-6"
        >
          Calculate Age
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Main Age */}
            <div className="p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Age</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {result.years} years, {result.months} months, {result.days} days
              </p>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{result.totalMonths}</p>
                <p className="text-sm text-blue-800 dark:text-blue-200">Total Months</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{result.totalWeeks}</p>
                <p className="text-sm text-green-800 dark:text-green-200">Total Weeks</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">{result.totalDays}</p>
                <p className="text-sm text-purple-800 dark:text-purple-200">Total Days</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">{result.totalHours.toLocaleString()}</p>
                <p className="text-sm text-orange-800 dark:text-orange-200">Total Hours</p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-pink-600">{result.totalMinutes.toLocaleString()}</p>
                <p className="text-sm text-pink-800 dark:text-pink-200">Total Minutes</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">{result.daysToNextBirthday}</p>
                <p className="text-sm text-indigo-800 dark:text-indigo-200">Days to Birthday</p>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Next Birthday</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{result.nextBirthday}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
