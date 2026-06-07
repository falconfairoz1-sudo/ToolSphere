'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const gradientCSS = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

  const randomizeColors = () => {
    const random1 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const random2 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor1(random1);
    setColor2(random2);
    setAngle(Math.floor(Math.random() * 360));
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(gradientCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Sunset', color1: '#ff6b6b', color2: '#feca57', angle: 135 },
    { name: 'Ocean', color1: '#667eea', color2: '#764ba2', angle: 135 },
    { name: 'Forest', color1: '#11998e', color2: '#38ef7d', angle: 135 },
    { name: 'Fire', color1: '#f12711', color2: '#f5af19', angle: 135 },
    { name: 'Purple', color1: '#a8edea', color2: '#fed6e3', angle: 135 },
    { name: 'Night', color1: '#2c3e50', color2: '#3498db', angle: 135 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Gradient Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Create beautiful CSS gradients</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div
            className="w-full h-64 rounded-2xl shadow-lg mb-8"
            style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }}
          />

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Color 1</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Color 2</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-12"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={randomizeColors}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Randomize
            </button>
            <button
              onClick={copyCSS}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <code className="text-sm text-gray-800 font-mono">{gradientCSS}</code>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setColor1(preset.color1);
                    setColor2(preset.color2);
                    setAngle(preset.angle);
                  }}
                  className="group relative"
                >
                  <div
                    className="h-20 rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    style={{ background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})` }}
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
