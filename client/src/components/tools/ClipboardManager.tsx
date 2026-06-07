'use client';

import { useState } from 'react';
import { Clipboard, Copy, Trash2, Plus } from 'lucide-react';

interface ClipItem {
  id: number;
  text: string;
  timestamp: Date;
}

export default function ClipboardManager() {
  const [items, setItems] = useState<ClipItem[]>([]);
  const [newText, setNewText] = useState('');

  const addItem = () => {
    if (newText.trim()) {
      setItems([{ id: Date.now(), text: newText, timestamp: new Date() }, ...items]);
      setNewText('');
    }
  };

  const copyItem = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg">
            <Clipboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clipboard Manager</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your clipboard history</p>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Paste or type text here..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-3"
          />
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add to Clipboard History</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.timestamp.toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyItem(item.text)}
                    className="p-1 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Clipboard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No clipboard history yet. Add your first item!</p>
          </div>
        )}
      </div>
    </div>
  );
}
