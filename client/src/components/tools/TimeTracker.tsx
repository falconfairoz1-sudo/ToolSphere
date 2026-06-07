'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock, BarChart3 } from 'lucide-react';

interface TimeEntry {
  id: string;
  task: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

export default function TimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [currentTask, setCurrentTask] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [activeEntry, setActiveEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('timeEntries');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed.map((e: any) => ({
        ...e,
        startTime: new Date(e.startTime),
        endTime: e.endTime ? new Date(e.endTime) : undefined,
      })));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && activeEntry) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - activeEntry.startTime.getTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, activeEntry]);

  const startTracking = () => {
    if (!currentTask.trim()) return;

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      task: currentTask,
      startTime: new Date(),
      duration: 0,
    };

    setActiveEntry(newEntry);
    setIsTracking(true);
    setElapsedTime(0);
  };

  const stopTracking = () => {
    if (!activeEntry) return;

    const endTime = new Date();
    const duration = endTime.getTime() - activeEntry.startTime.getTime();
    const completedEntry = { ...activeEntry, endTime, duration };

    const updatedEntries = [completedEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('timeEntries', JSON.stringify(updatedEntries));

    setActiveEntry(null);
    setIsTracking(false);
    setCurrentTask('');
    setElapsedTime(0);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  };

  const totalTime = entries.reduce((sum, e) => sum + e.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Time Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track time spent on tasks and projects
            </p>
          </div>

          {/* Timer */}
          <div className="mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {formatTime(elapsedTime)}
              </div>
              {isTracking && (
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Tracking: {activeEntry?.task}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="What are you working on?"
                disabled={isTracking}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
              />
              {!isTracking ? (
                <button
                  onClick={startTracking}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={stopTracking}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                >
                  <Square className="w-5 h-5" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Entries</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{formatTime(totalTime)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {entries.length > 0 ? formatTime(totalTime / entries.length) : '00:00:00'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
            </div>
          </div>

          {/* Entries List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Entries</h3>
            <div className="space-y-2">
              {entries.slice(0, 10).map(entry => (
                <div
                  key={entry.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{entry.task}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {entry.startTime.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatTime(entry.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
