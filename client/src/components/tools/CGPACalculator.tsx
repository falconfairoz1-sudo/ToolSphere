'use client';

import { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface Semester {
  id: string;
  name: string;
  gpa: number;
  credits: number;
}

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', name: 'Semester 1', gpa: 3.5, credits: 20 },
    { id: '2', name: 'Semester 2', gpa: 3.7, credits: 22 },
  ]);

  const addSemester = () => {
    setSemesters([...semesters, {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      gpa: 3.0,
      credits: 20,
    }]);
  };

  const removeSemester = (id: string) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const updateSemester = (id: string, field: keyof Semester, value: any) => {
    setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    semesters.forEach(sem => {
      totalPoints += sem.gpa * sem.credits;
      totalCredits += sem.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const cgpa = calculateCGPA();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              CGPA Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate Cumulative Grade Point Average
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {semesters.map((sem, index) => (
              <div key={sem.id} className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="col-span-1 text-center font-bold text-gray-600 dark:text-gray-400">
                  {index + 1}
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={sem.gpa}
                    onChange={(e) => updateSemester(sem.id, 'gpa', Number(e.target.value))}
                    min="0"
                    max="4"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={sem.credits}
                    onChange={(e) => updateSemester(sem.id, 'credits', Number(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button
                    onClick={() => removeSemester(sem.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addSemester}
            className="w-full py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition flex items-center justify-center space-x-2 mb-8"
          >
            <Plus className="w-5 h-5" />
            <span>Add Semester</span>
          </button>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Semesters</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{semesters.length}</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Credits</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {semesters.reduce((sum, s) => sum + s.credits, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <p className="text-sm text-white mb-1">Your CGPA</p>
                <p className="text-4xl font-bold text-white">{cgpa}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
