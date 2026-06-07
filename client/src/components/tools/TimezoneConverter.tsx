'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';

const timezones = [
  { id: 'UTC', name: 'UTC (Coordinated Universal Time)', offset: 0 },
  { id: 'EST', name: 'EST (Eastern Standard Time)', offset: -5 },
  { id: 'CST', name: 'CST (Central Standard Time)', offset: -6 },
  { id: 'MST', name: 'MST (Mountain Standard Time)', offset: -7 },
  { id: 'PST', name: 'PST (Pacific Standard Time)', offset: -8 },
  { id: 'GMT', name: 'GMT (Greenwich Mean Time)', offset: 0 },
  { id: 'CET', name: 'CET (Central European Time)', offset: 1 },
  { id: 'EET', name: 'EET (Eastern European Time)', offset: 2 },
  { id: 'IST', name: 'IST (India Standard Time)', offset: 5.5 },
  { id: 'JST', name: 'JST (Japan Standard Time)', offset: 9 },
  { id: 'AEST', name: 'AEST (Australian Eastern Time)', offset: 10 },
];

export default function TimezoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromTz, setFromTz] = useState('UTC');
  const [toTz, setToTz] = useState('EST');
  const [result, setResult] = useState('');

  const convert = (t: string, from: string, to: string) => {
    if (!t) { setResult(''); return; }
    const [hours, minutes] = t.split(':').map(Number);
    const fromOffset = timezones.find(tz => tz.id === from)?.offset || 0;
    const toOffset = timezones.find(tz => tz.id === to)?.offset || 0;
    const diff = toOffset - fromOffset;
    let newHours = hours + diff;
    if (newHours < 0) newHours += 24;
    if (newHours >= 24) newHours -= 24;
    setResult(`${String(Math.floor(newHours)).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Timezone Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert time between different timezones</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-sky-900 mb-3">From Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => { setTime(e.target.value); convert(e.target.value, fromTz, toTz); }}
                className="w-full px-4 py-3 text-2xl border-2 border-sky-300 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all mb-3"
              />
              <select
                value={fromTz}
                onChange={(e) => { setFromTz(e.target.value); convert(time, e.target.value, toTz); }}
                className="w-full px-4 py-3 border-2 border-sky-300 rounded-xl focus:border-sky-500 outline-none"
              >
                {timezones.map(tz => (
                  <option key={tz.id} value={tz.id}>{tz.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-blue-900 mb-3">To Time</label>
              <div className="w-full px-4 py-3 text-2xl bg-white border-2 border-blue-300 rounded-xl mb-3 min-h-[60px] flex items-center">
                {result || '00:00'}
              </div>
              <select
                value={toTz}
                onChange={(e) => { setToTz(e.target.value); convert(time, fromTz, e.target.value); }}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none"
              >
                {timezones.map(tz => (
                  <option key={tz.id} value={tz.id}>{tz.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">World Clocks</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>New York (EST): UTC-5</p>
              <p>London (GMT): UTC+0</p>
              <p>Tokyo (JST): UTC+9</p>
              <p>Sydney (AEST): UTC+10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
