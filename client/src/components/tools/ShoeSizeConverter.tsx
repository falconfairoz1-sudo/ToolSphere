'use client';
import { useState } from 'react';
import { Footprints } from 'lucide-react';
export default function ShoeSizeConverter() {
  const [usSize, setUsSize] = useState('');
  const [ukSize, setUkSize] = useState('');
  const [euSize, setEuSize] = useState('');
  const [cmSize, setCmSize] = useState('');
  const convertFromUS = (us: number) => {
    setUkSize((us - 0.5).toFixed(1));
    setEuSize((us + 32).toFixed(1));
    setCmSize((us * 2.54 + 15.24).toFixed(1));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl shadow-lg">
              <Footprints className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-slate-800 bg-clip-text text-transparent">Shoe Size Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between US, UK, EU, CM shoe sizes</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">US Size</label>
            <input type="number" step="0.5" value={usSize} onChange={(e) => { setUsSize(e.target.value); if(e.target.value) convertFromUS(parseFloat(e.target.value)); }} placeholder="Enter US size" className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
              <label className="block text-xs font-semibold text-green-900 mb-2">UK Size</label>
              <div className="text-xl font-bold text-green-700">{ukSize || '-'}</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
              <label className="block text-xs font-semibold text-purple-900 mb-2">EU Size</label>
              <div className="text-xl font-bold text-purple-700">{euSize || '-'}</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
              <label className="block text-xs font-semibold text-orange-900 mb-2">CM</label>
              <div className="text-xl font-bold text-orange-700">{cmSize || '-'}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-600 to-slate-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Size Guide</h3>
            <div className="text-sm space-y-1">
              <p>US 8 = UK 7.5 = EU 40 = 25.4 cm</p>
              <p>US 9 = UK 8.5 = EU 41 = 26.7 cm</p>
              <p>US 10 = UK 9.5 = EU 42 = 28 cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
