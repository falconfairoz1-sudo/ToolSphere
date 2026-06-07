'use client';

import { useState } from 'react';
import { Sparkles, Mail, Copy, Check, Download, Loader2 } from 'lucide-react';

export default function AIEmailWriter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) {
      alert('Please enter some input');
      return;
    }

    setLoading(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock AI output
      const mockOutput = `AI Generated Output for: "AI Email Writer"

Input: ${input}

Generated Result:
This is a simulated AI-generated response. In production, this would connect to an AI API like OpenAI, Anthropic, or Google AI to generate real content based on your input.

Key Features:
• Advanced natural language processing
• Context-aware generation
• High-quality output
• Fast processing
• Multiple language support

The actual implementation would use:
- API integration with AI services
- Proper error handling
- Rate limiting
- Token management
- Response streaming
- Content filtering

Generated at: ${new Date().toLocaleString()}`;
      
      setOutput(mockOutput);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-email-writer-output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-16 h-16 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI Email Writer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Compose professional emails
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={loading || !input.trim()}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 mb-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>

          {/* Output Section */}
          {output && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Generated Output
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadOutput}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
                  {output}
                </pre>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3 text-sm">
              AI Features:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-indigo-800 dark:text-indigo-200">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Advanced AI processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Natural language understanding</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>High-quality output</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Fast generation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}