'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  column: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
}

export default function KanbanBoard() {
  const [columns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', color: 'bg-gray-200 dark:bg-gray-700' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-blue-200 dark:bg-blue-900/30' },
    { id: 'done', title: 'Done', color: 'bg-green-200 dark:bg-green-900/30' },
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskColumn, setNewTaskColumn] = useState('todo');

  useEffect(() => {
    const saved = localStorage.getItem('kanbanTasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('kanbanTasks', JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      column: newTaskColumn,
    };

    saveTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (taskId: string, newColumn: string) => {
    saveTasks(tasks.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Kanban Board
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Visual task management with drag & drop
            </p>
          </div>

          {/* Add Task */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="New task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <select
              value={newTaskColumn}
              onChange={(e) => setNewTaskColumn(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {columns.map(col => (
                <option key={col.id} value={col.id}>{col.title}</option>
              ))}
            </select>
            <button
              onClick={addTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-3 gap-6">
            {columns.map(column => (
              <div key={column.id} className="flex flex-col">
                <div className={`${column.color} p-4 rounded-t-lg`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      ({tasks.filter(t => t.column === column.id).length})
                    </span>
                  </h3>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-4 rounded-b-lg min-h-[400px] space-y-3">
                  {tasks
                    .filter(task => task.column === column.id)
                    .map(task => (
                      <div
                        key={task.id}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start space-x-2 flex-1">
                            <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {task.title}
                              </h4>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex space-x-1 mt-3">
                          {columns
                            .filter(col => col.id !== column.id)
                            .map(col => (
                              <button
                                key={col.id}
                                onClick={() => moveTask(task.id, col.id)}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                → {col.title}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
