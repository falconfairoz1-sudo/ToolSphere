'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, TrendingUp, Calendar } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  color: string;
  streak: number;
  completedDates: string[];
  createdAt: Date;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  useEffect(() => {
    const saved = localStorage.getItem('habits');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHabits(parsed.map((h: any) => ({
        ...h,
        createdAt: new Date(h.createdAt),
      })));
    }
  }, []);

  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      color: selectedColor,
      streak: 0,
      completedDates: [],
      createdAt: new Date(),
    };

    saveHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(today);
        const newCompletedDates = isCompleted
          ? habit.completedDates.filter(d => d !== today)
          : [...habit.completedDates, today];

        return {
          ...habit,
          completedDates: newCompletedDates,
          streak: calculateStreak(newCompletedDates),
        };
      }
      return habit;
    });

    saveHabits(updatedHabits);
  };

  const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;

    const sortedDates = dates.sort().reverse();
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (date.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const deleteHabit = (id: string) => {
    saveHabits(habits.filter(h => h.id !== id));
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const isCompletedOnDate = (habit: Habit, date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return habit.completedDates.includes(dateStr);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Habit Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Build better habits, one day at a time
            </p>
          </div>

          {/* Add Habit */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                placeholder="New habit name..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <div className="flex space-x-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full transition ${
                      selectedColor === color ? 'ring-4 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <button
                onClick={addHabit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Habits List */}
          <div className="space-y-4">
            {habits.map(habit => (
              <div
                key={habit.id}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {habit.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full font-semibold">
                        🔥 {habit.streak} day streak
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {habit.completedDates.length} total
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  {getLast7Days().map((date, idx) => {
                    const isCompleted = isCompletedOnDate(habit, date);
                    const isToday = date.toISOString().split('T')[0] === today;

                    return (
                      <button
                        key={idx}
                        onClick={() => isToday && toggleHabit(habit.id)}
                        className={`flex-1 p-4 rounded-lg transition ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
                        } ${isToday ? 'ring-2 ring-blue-500 cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="text-xs font-semibold mb-1">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg">
                          {isCompleted ? <Check className="w-6 h-6 mx-auto" /> : '○'}
                        </div>
                        <div className="text-xs mt-1">
                          {date.getDate()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {habits.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
                <p>No habits yet. Add your first habit to get started!</p>
              </div>
            )}
          </div>

          {/* Statistics */}
          {habits.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{habits.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Habits</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.max(...habits.map(h => h.streak), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {habits.reduce((sum, h) => sum + h.completedDates.length, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Completions</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
