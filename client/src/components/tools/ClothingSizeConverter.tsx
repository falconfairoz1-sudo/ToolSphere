'use client';
import { useState } from 'react';
import { Shirt } from 'lucide-react';
export default function ClothingSizeConverter() {
  const [usSize, setUsSize] = useState('');
  const sizes = { XS: {us: '0-2', uk: '4-6', eu: '32-34'}, S: {us: '4-6', uk: '8-10', eu: '36-38'}, M: {us: '8-10', uk: '12-14', eu: '40-42'}, L: {us: '12-14', uk: '16-18', eu: '44-46'}, XL: {us: '16-18', uk: '20-22', eu: '48-50'} };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Clothing Size Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between US, UK, EU clothing sizes</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-4">
            {Object.entries(sizes).map(([size, values]) => (
              <div key={size} className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-2xl font-bold text-pink-600">{size}</div>
                  <div><span className="text-xs text-gray-600">US:</span> <span className="font-semibold">{values.us}</span></div>
                  <div><span className="text-xs text-gray-600">UK:</span> <span className="font-semibold">{values.uk}</span></div>
                  <div><span className="text-xs text-gray-600">EU:</span> <span className="font-semibold">{values.eu}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Size Guide</h3>
            <p className="text-sm">Sizes may vary by brand and style. Always check specific brand size charts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
