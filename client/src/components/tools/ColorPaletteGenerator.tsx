'use client';

import { useState } from 'react';
import { Palette, RefreshCw, Copy, Check } from 'lucide-react';

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>([]);
  const [copied, setCopied] = useState(-1);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => generateRandomColor());
    setPalette(newPalette);
  };

  const generateAnalogous = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const colors = [];
    for (let i = -2; i <= 2; i++) {
      const hue = (baseHue + i * 30 + 360) % 360;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    setPalette(colors);
  };

  const generateComplementary = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const colors = [
      `hsl(${baseHue}, 70%, 60%)`,
      `hsl(${baseHue}, 70%, 50%)`,
      `hsl(${baseHue}, 70%, 70%)`,
      `hsl(${(baseHue + 180) % 360}, 70%, 60%)`,
      `hsl(${(baseHue + 180) % 360}, 70%, 50%)`,
    ];
    setPalette(colors);
  };

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    setTimeout(() => setCopied(-1), 2000);
  };

  const copyAllColors = () => {
    navigator.clipboard.writeText(palette.join('\n'));
    setCopied(-2);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Color Palette Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Generate beautiful color schemes for your designs</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={generatePalette}
              className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Random
            </button>
            <button
              onClick={generateAnalogous}
              className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Analogous
            </button>
            <button
              onClick={generateComplementary}
              className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Complementary
            </button>
          </div>

          {palette.length > 0 && (
            <>
              <div className="grid grid-cols-5 gap-4 mb-6">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      className="aspect-square rounded-xl shadow-lg cursor-pointer transform hover:scale-110 transition-all"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color, index)}
                    />
                    <div className="text-center">
                      <button
                        onClick={() => copyColor(color, index)}
                        className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-mono flex items-center justify-center gap-2"
                      >
                        {copied === index ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="text-xs">{color}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={copyAllColors}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {copied === -2 ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied === -2 ? 'Copied All!' : 'Copy All Colors'}
              </button>
            </>
          )}

          {palette.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Click a button above to generate a color palette</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
