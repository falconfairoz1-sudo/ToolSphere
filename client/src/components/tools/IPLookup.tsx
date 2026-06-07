'use client';

import { useState } from 'react';
import { Globe, Search } from 'lucide-react';

export default function IPLookup() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookupIP = async () => {
    if (!ip) return;
    
    setLoading(true);
    try {
      // Using a free IP API
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to lookup IP' });
    }
    setLoading(false);
  };

  const getMyIP = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIp(data.ip);
      lookupIP();
    } catch (error) {
      setResult({ error: 'Failed to get your IP' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Globe className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            IP Lookup
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get information about any IP address
          </p>
        </div>

        <div className="flex space-x-3 mb-6">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address (e.g., 8.8.8.8)"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
          <button
            onClick={getMyIP}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition whitespace-nowrap"
          >
            My IP
          </button>
        </div>

        <button
          onClick={lookupIP}
          disabled={!ip || loading}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition mb-6 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Looking up...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Lookup IP</span>
            </>
          )}
        </button>

        {result && !result.error && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">IP Address</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{result.ip}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1">Type</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{result.version || 'IPv4'}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">City:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.city || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Region:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.region || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Country:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.country_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Postal Code:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.postal || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Timezone:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.timezone || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">ISP:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{result.org || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400">{result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
