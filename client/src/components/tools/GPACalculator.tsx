'use client';

import { useState } from 'react';
import { GraduationCap, Plus, Trash2, Calculator } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics', credits: 4, grade: 'A' },
    { id: '2', name: 'Physics', credits: 3, grade: 'B+' },
    { id: '3', name: 'Chemistry', credits: 3, grade: 'A-' },
  ]);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      credits: 3,
      grade: 'B',
    }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const gpa = calculateGPA();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              GPA Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Calculate your Grade Point Average
            </p>
          </div>

          {/* Courses List */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="col-span-1 text-center font-bold text-gray-600 dark:text-gray-400">
                  {index + 1}
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course Name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                    min="1"
                    max="6"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="col-span-3">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>{grade} ({gradePoints[grade]})</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 text-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Button */}
          <button
            onClick={addCourse}
            className="w-full py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition flex items-center justify-center space-x-2 mb-8"
          >
            <Plus className="w-5 h-5" />
            <span>Add Course</span>
          </button>

          {/* Results */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Credits</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {courses.reduce((sum, c) => sum + c.credits, 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <p className="text-sm text-white mb-1">Your GPA</p>
                <p className="text-4xl font-bold text-white">{gpa}</p>
              </div>
            </div>

            {/* GPA Scale */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">GPA Scale</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-green-100 dark:bg-green-900/30 rounded">
                  <span>A+/A</span>
                  <span className="font-bold">4.0</span>
                </div>
                <div className="flex justify-between p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <span>B+/B</span>
                  <span className="font-bold">3.0-3.3</span>
                </div>
                <div className="flex justify-between p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                  <span>C+/C</span>
                  <span className="font-bold">2.0-2.3</span>
                </div>
                <div className="flex justify-between p-2 bg-red-100 dark:bg-red-900/30 rounded">
                  <span>D/F</span>
                  <span className="font-bold">0.0-1.3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
