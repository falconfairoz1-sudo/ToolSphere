'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
export default function CoordinateConverter() {
  const [decimal, setDecimal] = useState({ lat: '40.7128', lon: '-74.0060' });
  const [dms, setDms] = useState({ lat: '', lon: '' });
  const decimalToDMS = (dd: number, isLat: boolean) => {
    const dir = dd < 0 ? (isLat ? 'S' : 'W') : (isLat ? 'N' : 'E');
    const abs = Math.abs(dd);
    const deg = Math.floor(abs);
    const min = Math.floor((abs - deg) * 60);
    const sec = ((abs - deg - min / 60) * 3600).toFixed(2);
    return `${deg}° ${min}' ${sec}" ${dir}`;
  };
  const handleDecimalChange = (lat: string, lon: string) => {
    setDecimal({ lat, lon });
    if (lat && lon) {
      setDms({
        lat: decimalToDMS(parseFloat(lat), true),
        lon: decimalToDMS(parseFloat(lon), false)
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Coordinate Converter</h1>
          </div>
          <p className="text-gray-600 text-lg">Convert between decimal degrees and DMS coordinates</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-3">Decimal Degrees</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-blue-700 mb-1 block">Latitude</label>
                <input type="number" step="0.0001" value={decimal.lat} onChange={(e) => handleDecimalChange(e.target.value, decimal.lon)} placeholder="Latitude" className="w-full px-4 py-3 text-xl border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-xs text-blue-700 mb-1 block">Longitude</label>
                <input type="number" step="0.0001" value={decimal.lon} onChange={(e) => handleDecimalChange(decimal.lat, e.target.value)} placeholder="Longitude" className="w-full px-4 py-3 text-xl border-2 border-blue-300 rounded-xl focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl p-6">
            <label className="block text-sm font-semibold text-sky-900 mb-3">DMS (Degrees Minutes Seconds)</label>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-2 border-sky-300">
                <span className="text-xs text-sky-700">Latitude:</span>
                <p className="text-lg font-mono text-sky-900">{dms.lat || 'Enter decimal coordinates'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-sky-300">
                <span className="text-xs text-sky-700">Longitude:</span>
                <p className="text-lg font-mono text-sky-900">{dms.lon || 'Enter decimal coordinates'}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-3">Example Locations</h3>
            <div className="text-sm space-y-1">
              <p>New York: 40.7128° N, 74.0060° W</p>
              <p>London: 51.5074° N, 0.1278° W</p>
              <p>Tokyo: 35.6762° N, 139.6503° E</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
