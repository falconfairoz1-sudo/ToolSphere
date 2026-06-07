'use client';

import { useState, useEffect } from 'react';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function BudgetPlanner() {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [mounted, setMounted] = useState(false);

  // Load budget items from localStorage
  useEffect(() => {
    setMounted(true);
    const storageKey = isAuthenticated && user ? `budget_${user.id}` : 'budget_guest';
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse budget items:', e);
      }
    }
  }, [isAuthenticated, user]);

  // Save budget items to localStorage
  useEffect(() => {
    if (mounted) {
      const storageKey = isAuthenticated && user ? `budget_${user.id}` : 'budget_guest';
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, mounted, isAuthenticated, user]);

  const addItem = () => {
    if (!category || !amount) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category,
      amount: parseFloat(amount),
      type,
    };

    setItems([...items, newItem]);
    setCategory('');
    setAmount('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Wallet className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Budget Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Plan and track your monthly budget
          </p>
        </div>

        {/* Add Item Form */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Budget Item</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setType('income')}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  type === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setType('expense')}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  type === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                Expense
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Salary, Rent, Food"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={addItem}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Total Income</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${
            balance >= 0 
              ? 'bg-blue-50 dark:bg-blue-900/20' 
              : 'bg-orange-50 dark:bg-orange-900/20'
          }`}>
            <p className={`text-sm mb-1 ${
              balance >= 0 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-orange-600 dark:text-orange-400'
            }`}>
              Balance
            </p>
            <p className={`text-2xl font-bold ${
              balance >= 0 
                ? 'text-blue-600' 
                : 'text-orange-600'
            }`}>
              ${Math.abs(balance).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Items List */}
        {items.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Budget Items</h2>
            
            {/* Income Items */}
            {items.filter(item => item.type === 'income').length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Income</h3>
                <div className="space-y-2">
                  {items.filter(item => item.type === 'income').map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                      <span className="text-gray-900 dark:text-white font-medium">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 font-bold">${item.amount.toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expense Items */}
            {items.filter(item => item.type === 'expense').length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Expenses</h3>
                <div className="space-y-2">
                  {items.filter(item => item.type === 'expense').map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    >
                      <span className="text-gray-900 dark:text-white font-medium">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-red-600 font-bold">${item.amount.toFixed(2)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No budget items yet. Add your first income or expense above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
