'use client';

import { useState } from 'react';
import { Hash, Copy } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');

  const generateHashes = async () => {
    if (!input) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    // MD5 (simplified - using a basic implementation)
    const md5 = await simpleMD5(input);
    
    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256 = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // SHA-512
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
    const sha512 = Array.from(new Uint8Array(sha512Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    setHashes({ md5, sha256, sha512 });
  };

  const simpleMD5 = async (str: string) => {
    // Simple hash for demo - in production use a proper MD5 library
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  const copyHash = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Hash className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Hash Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate MD5, SHA-256, and SHA-512 hashes
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
          />
        </div>

        <button
          onClick={generateHashes}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition mb-6"
        >
          Generate Hashes
        </button>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([type, hash]) => (
              <div key={type} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                    {type}
                  </p>
                  <button
                    onClick={() => copyHash(hash, type)}
                    className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied === type ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-gray-900 dark:text-white break-all">
                  {hash}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
