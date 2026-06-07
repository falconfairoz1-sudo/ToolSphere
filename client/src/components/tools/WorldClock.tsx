'use client';

import { useState, useEffect } from 'react';
import { Globe, Clock } from 'lucide-react';

interface TimeZone {
  name: string;
  city: string;
  offset: number;
  flag: string;
}

const timeZones: TimeZone[] = [
  { name: 'America/New_York', city: 'New York', offset: -5, flag: '🇺🇸' },
  { name: 'America/Los_Angeles', city: 'Los Angeles', offset: -8, flag: '🇺🇸' },
  { name: 'America/Chicago', city: 'Chicago', offset: -6, flag: '🇺🇸' },
  { name: 'Europe/London', city: 'London', offset: 0, flag: '🇬🇧' },
  { name: 'Europe/Paris', city: 'Paris', offset: 1, flag: '🇫🇷' },
  { name: 'Europe/Berlin', city: 'Berlin', offset: 1, flag: '🇩🇪' },
  { name: 'Asia/Dubai', city: 'Dubai', offset: 4, flag: '🇦🇪' },
  { name: 'Asia/Tokyo', city: 'Tokyo', offset: 9, flag: '🇯🇵' },
  { name: 'Asia/Shanghai', city: 'Shanghai', offset: 8, flag: '🇨🇳' },
  { name: 'Asia/Kolkata', city: 'Mumbai', offset: 5.5, flag: '🇮🇳' },
  { name: 'Australia/Sydney', city: 'Sydney', offset: 11, flag: '🇦🇺' },
  { name: 'Pacific/Auckland', city: 'Auckland', offset: 13, flag: '🇳🇿' },
];

export default function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeForZone = (offset: number) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const zoneTime = new Date(utc + 3600000 * offset);
    return zoneTime;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">World Clock</h1>
          </div>
          <p className="text-gray-600 text-lg">View current time across different timezones</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeZones.map((zone) => {
            const zoneTime = getTimeForZone(zone.offset);
            return (
              <div
                key={zone.name}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{zone.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{zone.city}</h3>
                      <p className="text-sm text-gray-500">UTC {zone.offset >= 0 ? '+' : ''}{zone.offset}</p>
                    </div>
                  </div>
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2 font-mono">
                    {formatTime(zoneTime)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(zoneTime)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
