'use client';

import { useState } from 'react';
import { Radio, Copy, Check } from 'lucide-react';

export default function MorseCodeTranslator() {
  const [input, setInput] = useState('');
  const [morse, setMorse] = useState('');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const morseCode: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorse = Object.fromEntries(
    Object.entries(morseCode).map(([k, v]) => [v, k])
  );

  const textToMorse = () => {
    const result = input
      .toUpperCase()
      .split('')
      .map(char => morseCode[char] || char)
      .join(' ');
    setMorse(result);
  };

  const morseToText = () => {
    try {
      const result = input
        .split(' ')
        .map(code => reverseMorse[code] || '')
        .join('');
      setText(result);
    } catch (error) {
      setText('Invalid morse code');
    }
  };

  const copyResult = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Morse Code Translator</h1>
          </div>
          <p className="text-gray-600 text-lg">Translate text to Morse code and back</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or morse code (space-separated)..."
            className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none font-mono text-sm"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={textToMorse}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Text → Morse
            </button>
            <button
              onClick={morseToText}
              disabled={!input}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Morse → Text
            </button>
          </div>
        </div>

        {morse && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Morse Code</h3>
              <button
                onClick={() => copyResult(morse, 'morse')}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all flex items-center gap-2"
              >
                {copied === 'morse' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'morse' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-2xl text-gray-800 break-all text-center">
              {morse}
            </div>
          </div>
        )}

        {text && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Translated Text</h3>
              <button
                onClick={() => copyResult(text, 'text')}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center gap-2"
              >
                {copied === 'text' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'text' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-lg text-gray-800 break-all">
              {text}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg p-6 text-white mt-6">
          <h3 className="text-lg font-semibold mb-3">Morse Code Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-mono">
            {Object.entries(morseCode).slice(0, 26).map(([letter, code]) => (
              <div key={letter} className="flex justify-between">
                <span>{letter}:</span>
                <span className="ml-2">{code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
