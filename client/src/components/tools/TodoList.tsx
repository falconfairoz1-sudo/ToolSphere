'use client';

import { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const { user, isAuthenticated } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storageKey = isAuthenticated && user ? `todos_${user.id}` : 'todos_guest';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse todos:', e);
      }
    }
  }, [isAuthenticated, user]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      const storageKey = isAuthenticated && user ? `todos_${user.id}` : 'todos_guest';
      localStorage.setItem(storageKey, JSON.stringify(todos));
    }
  }, [todos, mounted, isAuthenticated, user]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <CheckSquare className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            To-Do List
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize your tasks efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-xs text-blue-800 dark:text-blue-200">Total</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-xs text-green-800 dark:text-green-200">Done</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
            <p className="text-xs text-orange-800 dark:text-orange-200">Pending</p>
          </div>
        </div>

        {/* Add Todo */}
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
