'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <Timer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Stopwatch</h1>
          </div>
          <p className="text-gray-600 text-lg">Precise time tracking with lap functionality</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <div className="text-7xl font-bold text-gray-800 mb-8 font-mono">
              {formatTime(time)}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartPause}
                className={`p-6 rounded-full shadow-lg transform hover:scale-110 transition-all ${
                  isRunning
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-br from-green-400 to-emerald-500'
                }`}
              >
                {isRunning ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
              </button>

              <button
                onClick={handleLap}
                disabled={!isRunning}
                className="p-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg transform hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Flag className="w-8 h-8 text-white" />
              </button>

              <button
                onClick={handleReset}
                className="p-6 rounded-full bg-gradient-to-br from-red-400 to-pink-500 shadow-lg transform hover:scale-110 transition-all"
              >
                <RotateCcw className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          {laps.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lap Times</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {laps.map((lap, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-700">Lap {index + 1}</span>
                    <span className="font-mono text-gray-800">{formatTime(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
