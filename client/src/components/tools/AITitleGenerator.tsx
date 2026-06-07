'use client';

import { useState } from 'react';
import { Newspaper, Sparkles, Copy, RefreshCw, TrendingUp } from 'lucide-react';

export default function AITitleGenerator() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [titleStyle, setTitleStyle] = useState<'catchy' | 'professional' | 'seo' | 'listicle' | 'question'>('catchy');
  const [titles, setTitles] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const titleTemplates = {
    catchy: [
      'The Ultimate Guide to {topic}',
      '{topic}: Everything You Need to Know',
      'Unlock the Secrets of {topic}',
      'Master {topic} in 5 Simple Steps',
      'The Truth About {topic} Nobody Tells You',
      '{topic} Made Easy: A Complete Guide',
      'Transform Your {topic} Today',
      'The Revolutionary Approach to {topic}',
      'Discover the Power of {topic}',
      '{topic}: The Game-Changing Strategy'
    ],
    professional: [
      'A Comprehensive Analysis of {topic}',
      'Understanding {topic}: Key Insights',
      'The Essential Guide to {topic}',
      '{topic}: Best Practices and Strategies',
      'Implementing {topic} in Your Organization',
      'The Business Case for {topic}',
      '{topic}: Trends and Future Outlook',
      'Optimizing {topic} for Success',
      'Strategic Approaches to {topic}',
      '{topic}: Industry Standards and Guidelines'
    ],
    seo: [
      'Best {topic} Tips for {keywords}',
      'How to {topic} - Complete {keywords} Guide',
      '{topic} for {keywords}: Ultimate Resource',
      'Top {keywords} Strategies for {topic}',
      '{topic} Tutorial: {keywords} Edition',
      'Learn {topic} with {keywords}',
      '{keywords} and {topic}: What You Need to Know',
      '{topic} Explained: {keywords} Focus',
      'Mastering {topic} for {keywords}',
      '{keywords}: The {topic} Handbook'
    ],
    listicle: [
      '10 Amazing {topic} Tips You Need to Try',
      '7 Ways {topic} Can Change Your Life',
      '15 {topic} Hacks That Actually Work',
      '5 Reasons Why {topic} Matters',
      '12 {topic} Mistakes to Avoid',
      '8 Proven {topic} Techniques',
      '20 {topic} Ideas for Beginners',
      '6 {topic} Trends You Can\'t Ignore',
      '9 Essential {topic} Tools',
      '11 {topic} Secrets from Experts'
    ],
    question: [
      'What is {topic} and Why Does It Matter?',
      'How Can {topic} Benefit You?',
      'Is {topic} Right for Your Business?',
      'Why Should You Care About {topic}?',
      'What Makes {topic} So Effective?',
      'How to Get Started with {topic}?',
      'Can {topic} Really Make a Difference?',
      'What Are the Best {topic} Practices?',
      'How Does {topic} Actually Work?',
      'Why Is Everyone Talking About {topic}?'
    ]
  };

  const generateTitles = () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      const templates = titleTemplates[titleStyle];
      const generated = templates.map(template => {
        let title = template.replace(/{topic}/g, topic);
        if (keywords) {
          title = title.replace(/{keywords}/g, keywords);
        } else {
          title = title.replace(/\s*{keywords}\s*/g, '').replace(/:\s*$/, '');
        }
        return title;
      });

      // Add some variations
      const variations = [
        `${topic}: A Beginner's Guide`,
        `The Complete ${topic} Handbook`,
        `${topic} 101: Getting Started`,
        `Advanced ${topic} Techniques`,
        `${topic}: Tips from the Pros`
      ];

      setTitles([...generated, ...variations]);
      setGenerating(false);
    }, 600);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    alert('Title copied to clipboard!');
  };

  const copyAllTitles = () => {
    const allTitles = titles.join('\n');
    navigator.clipboard.writeText(allTitles);
    alert('All titles copied to clipboard!');
  };

  const styleInfo = {
    catchy: { icon: '✨', color: 'from-pink-600 to-purple-600', desc: 'Attention-grabbing and engaging' },
    professional: { icon: '💼', color: 'from-blue-600 to-indigo-600', desc: 'Formal and business-oriented' },
    seo: { icon: '🔍', color: 'from-green-600 to-teal-600', desc: 'Optimized for search engines' },
    listicle: { icon: '📝', color: 'from-orange-600 to-red-600', desc: 'Numbered lists and tips' },
    question: { icon: '❓', color: 'from-yellow-600 to-orange-600', desc: 'Question-based headlines' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <Newspaper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Title Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate catchy titles and headlines for your content
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic or Subject *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Digital Marketing, Healthy Eating, Web Development"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords (Optional)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., beginners, 2024, tips"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Style Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Title Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(styleInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setTitleStyle(key as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    titleStyle === key
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                  }`}
                >
                  <div className="text-3xl mb-2">{info.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {info.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateTitles}
            disabled={generating || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            {generating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Titles...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Titles</span>
              </>
            )}
          </button>

          {/* Results */}
          {titles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <span>Generated Titles ({titles.length})</span>
                </h2>
                <button
                  onClick={copyAllTitles}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy All</span>
                </button>
              </div>

              <div className="space-y-3">
                {titles.map((title, index) => (
                  <div
                    key={index}
                    className="group p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400 mr-2">
                          #{index + 1}
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {title}
                        </span>
                      </div>
                      <button
                        onClick={() => copyTitle(title)}
                        className="ml-4 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition opacity-0 group-hover:opacity-100"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
