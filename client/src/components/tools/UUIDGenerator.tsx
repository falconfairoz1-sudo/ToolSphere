'use client';

import { useState } from 'react';
import { Hash, Copy, RefreshCw } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'v4' | 'v1'>('v4');
  const [copied, setCopied] = useState(-1);

  const generateUUID = () => {
    if (version === 'v4') {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    // Simplified v1 (timestamp-based)
    const timestamp = Date.now();
    const random = Math.random().toString(16).substring(2, 14);
    return `${timestamp.toString(16)}-1xxx-${random}`.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
  };

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    setCopied(-1);
  };

  const copyUUID = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(-1), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-2);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Hash className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            UUID Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate unique identifiers (UUID/GUID)
          </p>
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="v4">Version 4 (Random)</option>
              <option value="v1">Version 1 (Timestamp)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Count: {count}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition flex items-center justify-center space-x-2 mb-6"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Generate UUID{count > 1 ? 's' : ''}</span>
        </button>

        {/* Results */}
        {uuids.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generated {uuids.length} UUID{uuids.length > 1 ? 's' : ''}
              </p>
              {uuids.length > 1 && (
                <button
                  onClick={copyAll}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied === -2 ? 'Copied All!' : 'Copy All'}</span>
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <code className="text-sm font-mono text-gray-900 dark:text-white">
                    {uuid}
                  </code>
                  <button
                    onClick={() => copyUUID(uuid, index)}
                    className="ml-4 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm"
                  >
                    {copied === index ? '✓' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
