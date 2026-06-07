'use client';

import { useState } from 'react';
import { Link, Copy, Check } from 'lucide-react';

export default function URLEncoderDecoder() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [copied, setCopied] = useState('');

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(input));
    } catch (error) {
      setEncoded('Error encoding URL');
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(input));
    } catch (error) {
      setDecoded('Error decoding URL');
    }
  };

  const copyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <Link className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">URL Encoder/Decoder</h1>
          </div>
          <p className="text-gray-600 text-lg">Encode and decode URLs safely</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Text or URL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or URL to encode/decode..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={encode}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Encode
            </button>
            <button
              onClick={decode}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Decode
            </button>
          </div>
        </div>

        {encoded && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Encoded URL</h3>
              <button
                onClick={() => copyText(encoded, 'encoded')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
              >
                {copied === 'encoded' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'encoded' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800 break-all">
              {encoded}
            </div>
          </div>
        )}

        {decoded && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Decoded URL</h3>
              <button
                onClick={() => copyText(decoded, 'decoded')}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all flex items-center gap-2"
              >
                {copied === 'decoded' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'decoded' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm text-gray-800 break-all">
              {decoded}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
