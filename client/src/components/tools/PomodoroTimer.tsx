'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, TrendingUp } from 'lucide-react';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [sessions, setSessions] = useState(0);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            playSound();
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const playSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXzzn0vBSh+zPDajzsKElyx6OyrWBQLSKHe8sFuJAUuhM/y2Ik2CBhku+zooVARC0yl4fG5ZRwFNo3V885');
    audio.play().catch(() => {});
  };

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setMinutes(longBreakTime);
      } else {
        setMode('break');
        setMinutes(breakTime);
      }
    } else {
      setMode('work');
      setMinutes(workTime);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    if (mode === 'work') {
      setMinutes(workTime);
    } else if (mode === 'break') {
      setMinutes(breakTime);
    } else {
      setMinutes(longBreakTime);
    }
  };

  const switchMode = (newMode: 'work' | 'break' | 'longBreak') => {
    setIsActive(false);
    setMode(newMode);
    setSeconds(0);
    if (newMode === 'work') {
      setMinutes(workTime);
    } else if (newMode === 'break') {
      setMinutes(breakTime);
    } else {
      setMinutes(longBreakTime);
    }
  };

  const saveSettings = () => {
    if (mode === 'work') setMinutes(workTime);
    else if (mode === 'break') setMinutes(breakTime);
    else setMinutes(longBreakTime);
    setSeconds(0);
    setShowSettings(false);
  };

  const progress = mode === 'work' 
    ? ((workTime * 60 - (minutes * 60 + seconds)) / (workTime * 60)) * 100
    : mode === 'break'
    ? ((breakTime * 60 - (minutes * 60 + seconds)) / (breakTime * 60)) * 100
    : ((longBreakTime * 60 - (minutes * 60 + seconds)) / (longBreakTime * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍅</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pomodoro Timer
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Stay focused with the Pomodoro Technique
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => switchMode('work')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === 'work'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => switchMode('break')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === 'break'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                mode === 'longBreak'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Long Break
            </button>
          </div>

          {/* Timer Display */}
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto relative">
              {/* Progress Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                  className={`transition-all duration-1000 ${
                    mode === 'work' ? 'text-red-500' : mode === 'break' ? 'text-green-500' : 'text-blue-500'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 dark:text-white">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={toggleTimer}
              className={`p-4 rounded-full ${
                mode === 'work' ? 'bg-red-500' : mode === 'break' ? 'bg-green-500' : 'bg-blue-500'
              } text-white hover:opacity-90 transition shadow-lg`}
            >
              {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <RotateCcw className="w-8 h-8" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <Settings className="w-8 h-8" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Work Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={workTime}
                    onChange={(e) => setWorkTime(parseInt(e.target.value) || 25)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    min="1"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Long Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={longBreakTime}
                    onChange={(e) => setLongBreakTime(parseInt(e.target.value) || 15)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    min="1"
                    max="60"
                  />
                </div>
                <button
                  onClick={saveSettings}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-red-500">{sessions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-500">{Math.floor(sessions / 4)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cycles</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">{sessions * workTime}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
