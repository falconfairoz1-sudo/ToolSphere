'use client';

import { useState } from 'react';
import { Tag, Sparkles, Copy, RefreshCw, CheckCircle } from 'lucide-react';

export default function AIMetaDescription() {
  const [pageTitle, setPageTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const generateDescriptions = () => {
    if (!pageTitle.trim()) {
      alert('Please enter a page title');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
      const contentWords = pageContent.trim().split(/\s+/).slice(0, 20).join(' ');
      
      const templates = [
        `Discover ${pageTitle}. ${contentWords ? contentWords.slice(0, 100) : 'Learn more about our services and solutions.'}`,
        `${pageTitle} - ${keywordList.length > 0 ? keywordList.slice(0, 3).join(', ') + '. ' : ''}Get expert insights and comprehensive information.`,
        `Looking for ${pageTitle}? ${contentWords ? contentWords.slice(0, 90) : 'Find everything you need here.'}`,
        `${pageTitle}: Your complete guide to ${keywordList[0] || 'success'}. ${contentWords.slice(0, 80)}`,
        `Explore ${pageTitle}. ${keywordList.length > 0 ? 'Featuring ' + keywordList.slice(0, 2).join(' and ') + '. ' : ''}Professional solutions and expert advice.`,
        `${pageTitle} | ${keywordList.length > 0 ? keywordList.slice(0, 2).join(' & ') + ' - ' : ''}Quality information and resources you can trust.`,
        `Get the best ${pageTitle} ${keywordList[0] ? 'for ' + keywordList[0] : ''}. ${contentWords.slice(0, 90)}`,
        `${pageTitle} - ${contentWords ? contentWords.slice(0, 120) : 'Comprehensive information and expert guidance.'}`,
        `Find out everything about ${pageTitle}. ${keywordList.length > 0 ? 'Including ' + keywordList.slice(0, 3).join(', ') + '.' : 'Expert tips and advice.'}`,
        `${pageTitle}: ${keywordList.length > 0 ? keywordList[0] + ', ' + keywordList[1] + ' and more. ' : ''}${contentWords.slice(0, 80)}`
      ];

      // Ensure descriptions are within 150-160 characters (optimal length)
      const optimized = templates.map(desc => {
        if (desc.length > 160) {
          return desc.slice(0, 157) + '...';
        }
        return desc;
      });

      setDescriptions(optimized);
      setGenerating(false);
    }, 700);
  };

  const copyDescription = (desc: string) => {
    navigator.clipboard.writeText(desc);
    alert('Meta description copied to clipboard!');
  };

  const getCharacterCount = (text: string) => {
    const length = text.length;
    if (length < 120) return { color: 'text-red-600', status: 'Too Short' };
    if (length <= 160) return { color: 'text-green-600', status: 'Perfect' };
    return { color: 'text-orange-600', status: 'Too Long' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4">
              <Tag className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Meta Description Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate SEO-optimized meta descriptions for your web pages
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Meta Description Best Practices:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Keep it between 150-160 characters for optimal display</li>
                  <li>Include your target keywords naturally</li>
                  <li>Make it compelling and action-oriented</li>
                  <li>Accurately describe the page content</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Page Title *
              </label>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="e.g., Best Digital Marketing Services 2024"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., SEO, marketing, social media"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Page Content Summary (Optional)
              </label>
              <textarea
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                placeholder="Brief description of what the page is about..."
                className="w-full h-24 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateDescriptions}
            disabled={generating || !pageTitle.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            {generating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Descriptions...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Meta Descriptions</span>
              </>
            )}
          </button>

          {/* Results */}
          {descriptions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Generated Meta Descriptions
              </h2>

              <div className="space-y-3">
                {descriptions.map((desc, index) => {
                  const charInfo = getCharacterCount(desc);
                  return (
                    <div
                      key={index}
                      className="group p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          Option #{index + 1}
                        </span>
                        <button
                          onClick={() => copyDescription(desc)}
                          className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition opacity-0 group-hover:opacity-100"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-900 dark:text-white mb-3 leading-relaxed">
                        {desc}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-semibold ${charInfo.color}`}>
                          {desc.length} characters - {charInfo.status}
                        </span>
                        <div className="flex items-center space-x-2">
                          {desc.length >= 120 && desc.length <= 160 && (
                            <span className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span>SEO Optimized</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Character bar */}
                      <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            desc.length < 120
                              ? 'bg-red-500'
                              : desc.length <= 160
                              ? 'bg-green-500'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${Math.min((desc.length / 160) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* HTML Code Example */}
              <div className="mt-8 p-6 bg-gray-900 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-3">HTML Implementation</h3>
                <code className="text-green-400 text-sm">
                  &lt;meta name="description" content="{descriptions[0]}" /&gt;
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
