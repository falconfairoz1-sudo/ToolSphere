'use client';

import { useState } from 'react';
import { Thermometer, ArrowLeftRight } from 'lucide-react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
      setKelvin('');
      return;
    }
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
      setKelvin('');
      return;
    }
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    if (value === '') {
      setCelsius('');
      setFahrenheit('');
      return;
    }
    const k = parseFloat(value);
    if (!isNaN(k)) {
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Temperature Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between Celsius, Fahrenheit, and Kelvin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-blue-900 mb-3">Celsius (°C)</label>
              <input
                type="number"
                value={celsius}
                onChange={(e) => handleCelsiusChange(e.target.value)}
                placeholder="Enter temperature in Celsius"
                className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <div className="flex justify-center">
              <ArrowLeftRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-red-900 mb-3">Fahrenheit (°F)</label>
              <input
                type="number"
                value={fahrenheit}
                onChange={(e) => handleFahrenheitChange(e.target.value)}
                placeholder="Enter temperature in Fahrenheit"
                className="w-full px-4 py-3 text-2xl border-2 border-red-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>

            <div className="flex justify-center">
              <ArrowLeftRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
              <label className="block text-sm font-semibold text-purple-900 mb-3">Kelvin (K)</label>
              <input
                type="number"
                value={kelvin}
                onChange={(e) => handleKelvinChange(e.target.value)}
                placeholder="Enter temperature in Kelvin"
                className="w-full px-4 py-3 text-2xl border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Quick Reference
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Water Freezes:</p>
                <p>0°C = 32°F = 273.15K</p>
              </div>
              <div>
                <p className="font-medium">Water Boils:</p>
                <p>100°C = 212°F = 373.15K</p>
              </div>
              <div>
                <p className="font-medium">Room Temperature:</p>
                <p>20°C = 68°F = 293.15K</p>
              </div>
              <div>
                <p className="font-medium">Body Temperature:</p>
                <p>37°C = 98.6°F = 310.15K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
