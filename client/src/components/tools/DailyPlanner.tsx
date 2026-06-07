'use client';

import { useState } from 'react';
import { Calendar, Plus, Trash2, Check, Clock } from 'lucide-react';

interface Task {
  id: number;
  time: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function DailyPlanner() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ time: '09:00', title: '', priority: 'medium' as 'low' | 'medium' | 'high' });

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ time: '09:00', title: '', priority: 'medium' });
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Planner</h1>
            <p className="text-gray-600 dark:text-gray-400">Plan and organize your day</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-12 gap-3 mb-4">
          <input
            type="time"
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
            className="col-span-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Task description"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="col-span-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
            className="col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTask}
            className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition ${
                task.completed
                  ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
                  : task.priority === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                  : task.priority === 'medium'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <div className="flex items-center space-x-3 flex-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{task.time}</span>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No tasks planned for this day. Add your first task above!</p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Progress: {tasks.filter(t => t.completed).length} / {tasks.length} tasks completed
              </span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
