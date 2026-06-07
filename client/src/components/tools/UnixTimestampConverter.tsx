'use client';
import { useState, useEffect } from 'react';
import { Timer, ArrowLeftRight } from 'lucide-react';
export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleTimestampChange = (value: string) => {
    setTimestamp(value);
    if (value === '') { setDatetime(''); return; }
    const num = parseInt(value);
    if (!isNaN(num)) {
      const date = new Date(num * 1000);
      setDatetime(date.toISOString().slice(0, 16));
    }
  };
  const handleDatetimeChange = (value: string) => {
    setDatetime(value);
    if (value === '') { setTimestamp(''); return; }
    const date = new Date(value);
    setTimestamp(Math.floor(date.getTime() / 1000).toString());
  };
  const useCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    setDatetime(new Date(now * 1000).toISOString().slice(0, 16));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
              <Timer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Unix Timestamp Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Unix timestamp and readable date</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-sm text-indigo-900 mb-2">Current Unix Timestamp</p>
            <p className="text-3xl font-bold text-indigo-700">{currentTime}</p>
            <button onClick={useCurrentTime} className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm">
              Use Current Time
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">Unix Timestamp (seconds since 1970)</label>
            <input type="number" value={timestamp} onChange={(e) => handleTimestampChange(e.target.value)} placeholder="Enter Unix timestamp" className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
          </div>
          <div className="flex justify-center">
            <ArrowLeftRight className="w-6 h-6 text-gray-400 rotate-90" />
          </div>
          <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-cyan-900 mb-3">Date and Time</label>
            <input type="datetime-local" value={datetime} onChange={(e) => handleDatetimeChange(e.target.value)} className="w-full px-4 py-3 text-xl border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all" />
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Unix Epoch Info</h3>
            <div className="text-sm space-y-2">
              <p>• Unix time starts: January 1, 1970, 00:00:00 UTC</p>
              <p>• Measured in seconds since epoch</p>
              <p>• Used in programming and databases</p>
              <p>• Year 2038 problem at 2,147,483,647</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
