'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '../ui/ToolLayout';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Play notification sound
            if (typeof Audio !== 'undefined') {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBQLSKDf8sFuIwUug8/y24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz');
              audio.play().catch(() => {});
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) {
      const total = hours * 3600 + minutes * 60 + seconds;
      if (total > 0) {
        setTotalSeconds(total);
        setTimeLeft(total);
        setIsRunning(true);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setTotalSeconds(0);
  };

  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  const quickTimers = [
    { label: '5 min', seconds: 300 },
    { label: '10 min', seconds: 600 },
    { label: '15 min', seconds: 900 },
    { label: '30 min', seconds: 1800 },
    { label: '1 hour', seconds: 3600 },
  ];

  const setQuickTimer = (secs: number) => {
    setIsRunning(false);
    setTotalSeconds(secs);
    setTimeLeft(secs);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Set a countdown timer for any duration"
      icon="⏱️"
      gradient="from-orange-500 to-red-600"
    >
      <div className="space-y-6">
        {/* Timer Display */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 text-7xl font-bold text-gray-900 dark:text-white font-mono">
              <span>{time.hours}</span>
              <span className="text-orange-500">:</span>
              <span>{time.minutes}</span>
              <span className="text-orange-500">:</span>
              <span>{time.seconds}</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
            </div>
          </div>

          {/* Progress Bar */}
          {totalSeconds > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={timeLeft === 0 && hours === 0 && minutes === 0 && seconds === 0}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-700 transition shadow-lg"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-8 py-4 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Time Input */}
        {!isRunning && timeLeft === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Set Timer
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            {/* Quick Timers */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quick Timers
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTimers.map((timer) => (
                  <button
                    key={timer.label}
                    onClick={() => setQuickTimer(timer.seconds)}
                    className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition font-medium"
                  >
                    {timer.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 How to Use
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Set your desired time using the input fields or quick timer buttons</li>
            <li>• Click Start to begin the countdown</li>
            <li>• Use Pause to temporarily stop the timer</li>
            <li>• Click Reset to clear the timer and start over</li>
            <li>• You'll hear a notification sound when the timer reaches zero</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
