'use client';

import { useState } from 'react';
import { Wallet, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({ title: '', amount: 0, category: 'Food', type: 'expense' as 'income' | 'expense' });

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

  const addExpense = () => {
    if (!form.title || form.amount <= 0) return;
    const expense: Expense = {
      ...form,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setExpenses([expense, ...expenses]);
    setForm({ title: '', amount: 0, category: 'Food', type: 'expense' });
  };

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Wallet className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Tracker</h1>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">${totalIncome}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Income</div>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
              <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">${totalExpense}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expenses</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <Wallet className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">${balance}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Balance</div>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Amount"
                value={form.amount || ''}
                onChange={(e) => setForm({...form, amount: parseFloat(e.target.value) || 0})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value as 'income' | 'expense'})}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button
              onClick={addExpense}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>

          <div className="space-y-2">
            {expenses.map(expense => (
              <div key={expense.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{expense.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.category} • {expense.date}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount}
                  </div>
                  <button onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
