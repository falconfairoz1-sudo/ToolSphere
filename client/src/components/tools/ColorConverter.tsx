'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else {
      s = 0;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    const rgbVal = hexToRgb(value);
    if (rgbVal) {
      setRgb(rgbVal);
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
    }
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const handleHslChange = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbVal = hslToRgb(h, s, l);
    setRgb(rgbVal);
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Color Converter
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between HEX, RGB, and HSL color codes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div 
            className="w-full h-32 rounded-xl shadow-inner mb-6"
            style={{ backgroundColor: hex }}
          />

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">HEX Color Code</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="w-full px-4 py-3 text-2xl border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-mono"
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-green-900 mb-3">RGB Color</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-green-700 mb-1 block">Red</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                  className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-green-700 mb-1 block">Green</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                  className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-green-700 mb-1 block">Blue</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:border-green-500 outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-green-800 font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-purple-900 mb-3">HSL Color</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-purple-700 mb-1 block">Hue</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => handleHslChange(parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-purple-700 mb-1 block">Saturation</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => handleHslChange(hsl.h, parseInt(e.target.value) || 0, hsl.l)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-purple-700 mb-1 block">Lightness</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => handleHslChange(hsl.h, hsl.s, parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-sm text-purple-800 font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Color Info</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>HEX: {hex}</p>
              <p>RGB: {rgb.r}, {rgb.g}, {rgb.b}</p>
              <p>HSL: {hsl.h}°, {hsl.s}%, {hsl.l}%</p>
              <p>Decimal: {parseInt(hex.slice(1), 16)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
