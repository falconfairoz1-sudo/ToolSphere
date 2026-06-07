'use client';

import { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', target: 100, unit: 'units' });

  const addGoal = () => {
    if (!newGoal.title) return;
    setGoals([...goals, { ...newGoal, id: Date.now().toString(), current: 0 }]);
    setNewGoal({ title: '', target: 100, unit: 'units' });
  };

  const updateProgress = (id: string, value: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: Math.min(value, g.target) } : g));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Goal Tracker</h1>
          </div>

          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 0})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Unit"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              onClick={addGoal}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="space-y-4">
            {goals.map(goal => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div key={goal.id} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                    <button onClick={() => setGoals(goals.filter(g => g.id !== goal.id))} className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max={goal.target}
                      value={goal.current}
                      onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
