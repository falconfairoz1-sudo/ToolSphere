'use client';

import { useState } from 'react';
import { ShoppingBag, Sparkles, Copy, Download } from 'lucide-react';

export default function AIProductDescription() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState<'professional' | 'casual' | 'luxury' | 'technical'>('professional');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateDescription = () => {
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      const featureList = features.split(',').map(f => f.trim()).filter(f => f);
      
      let intro = '';
      let body = '';
      let closing = '';

      switch (tone) {
        case 'professional':
          intro = `Introducing ${productName} - a premium solution designed for ${targetAudience || 'professionals'}.`;
          body = featureList.length > 0
            ? `This exceptional product features ${featureList.slice(0, 3).join(', ')}, ensuring optimal performance and reliability.`
            : `Engineered with precision and built to last, ${productName} delivers outstanding results.`;
          closing = `Experience the difference with ${productName}. Order now and elevate your ${targetAudience || 'business'} to new heights.`;
          break;
        
        case 'casual':
          intro = `Meet ${productName} - your new favorite ${targetAudience ? 'companion for ' + targetAudience : 'everyday essential'}!`;
          body = featureList.length > 0
            ? `We've packed it with awesome features like ${featureList.slice(0, 3).join(', ')}. Pretty cool, right?`
            : `It's super easy to use and makes life so much better!`;
          closing = `Ready to try ${productName}? Grab yours today and see what all the buzz is about!`;
          break;
        
        case 'luxury':
          intro = `Discover ${productName} - an exquisite masterpiece crafted for the discerning ${targetAudience || 'connoisseur'}.`;
          body = featureList.length > 0
            ? `Meticulously designed with ${featureList.slice(0, 3).join(', ')}, every detail reflects uncompromising quality and sophistication.`
            : `Each element has been carefully curated to deliver an unparalleled experience of elegance and refinement.`;
          closing = `Indulge in the extraordinary. ${productName} - where luxury meets perfection.`;
          break;
        
        case 'technical':
          intro = `${productName} - Advanced ${targetAudience ? targetAudience + ' ' : ''}Solution with Cutting-Edge Technology.`;
          body = featureList.length > 0
            ? `Key specifications include: ${featureList.slice(0, 4).join(', ')}. Engineered for maximum efficiency and performance.`
            : `Built with state-of-the-art components and optimized algorithms for superior functionality.`;
          closing = `Technical support and comprehensive documentation included. ${productName} - engineered for excellence.`;
          break;
      }

      const fullDescription = `${intro}\n\n${body}\n\n${closing}`;
      setDescription(fullDescription);
      setGenerating(false);
    }, 800);
  };

  const copyDescription = () => {
    navigator.clipboard.writeText(description);
    alert('Description copied to clipboard!');
  };

  const downloadDescription = () => {
    const blob = new Blob([description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${productName.replace(/\s+/g, '-')}-description.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl mb-4">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Product Description Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create compelling product descriptions that sell
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Premium Wireless Headphones"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Features (comma-separated)
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="e.g., noise cancellation, 30-hour battery, Bluetooth 5.0"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., music lovers, professionals, gamers"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tone of Voice
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['professional', 'casual', 'luxury', 'technical'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-3 px-4 rounded-xl font-medium transition ${
                      tone === t
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generateDescription}
            disabled={generating || !productName.trim()}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>{generating ? 'Generating...' : 'Generate Description'}</span>
          </button>

          {description && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Generated Description
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyDescription}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadDescription}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl border-2 border-rose-200 dark:border-rose-800">
                <p className="text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Words</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {description.split(/\s+/).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Characters</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {description.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tone</p>
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {tone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
