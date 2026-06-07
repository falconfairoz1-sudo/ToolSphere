'use client';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
export default function DateFormatConverter() {
  const [date, setDate] = useState('2024-01-15');
  const formats = [
    { name: 'ISO 8601', format: (d: Date) => d.toISOString().split('T')[0] },
    { name: 'US Format', format: (d: Date) => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}` },
    { name: 'EU Format', format: (d: Date) => `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` },
    { name: 'Long Format', format: (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    { name: 'Short Format', format: (d: Date) => d.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) },
    { name: 'Full Date', format: (d: Date) => d.toDateString() },
  ];
  const dateObj = new Date(date);
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Date Format Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between different date formats</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-teal-900 mb-3">Select Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 text-xl border-2 border-teal-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" />
          </div>
          <div className="space-y-3">
            {formats.map((fmt, idx) => (
              <div key={idx} className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 flex justify-between items-center">
                <span className="font-semibold text-emerald-900">{fmt.name}:</span>
                <span className="text-lg text-emerald-700 font-mono">{fmt.format(dateObj)}</span>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Date Format Standards</h3>
            <div className="text-sm space-y-1">
              <p>• ISO 8601: YYYY-MM-DD (International standard)</p>
              <p>• US: MM/DD/YYYY</p>
              <p>• EU: DD/MM/YYYY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
