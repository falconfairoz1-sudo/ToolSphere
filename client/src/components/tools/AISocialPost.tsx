'use client';

import { useState } from 'react';
import { Share2, Sparkles, Copy, Hash } from 'lucide-react';

export default function AISocialPost() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'linkedin' | 'facebook' | 'instagram'>('twitter');
  const [tone, setTone] = useState<'professional' | 'casual' | 'funny' | 'inspirational'>('casual');
  const [posts, setPosts] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const platformLimits = {
    twitter: 280,
    linkedin: 3000,
    facebook: 63206,
    instagram: 2200
  };

  const generatePosts = () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      const limit = platformLimits[platform];
      const generatedPosts: string[] = [];
      const generatedHashtags: string[] = [];

      // Generate hashtags
      const topicWords = topic.split(' ').filter(w => w.length > 3);
      generatedHashtags.push(
        ...topicWords.slice(0, 3).map(w => `#${w.charAt(0).toUpperCase() + w.slice(1)}`),
        '#' + platform.charAt(0).toUpperCase() + platform.slice(1),
        '#SocialMedia'
      );

      // Generate posts based on tone and platform
      if (tone === 'professional') {
        generatedPosts.push(
          `Excited to share insights on ${topic}. Key takeaways: innovation, growth, and strategic thinking. What's your perspective?`,
          `${topic} is transforming the industry. Here's what you need to know to stay ahead of the curve.`,
          `Professional tip: ${topic} requires careful planning and execution. Let's discuss best practices.`
        );
      } else if (tone === 'casual') {
        generatedPosts.push(
          `Just discovered something cool about ${topic}! 🎉 Anyone else excited about this?`,
          `${topic} is amazing! Here's why you should care... 👇`,
          `Quick thought on ${topic}: it's way more interesting than I expected! What do you think?`
        );
      } else if (tone === 'funny') {
        generatedPosts.push(
          `Me trying to understand ${topic}: 🤔😅 But seriously, it's actually pretty cool!`,
          `${topic}? More like... okay I don't have a joke but it's awesome! 😂`,
          `Plot twist: ${topic} is not what you think it is! (But it's still great) 🎭`
        );
      } else if (tone === 'inspirational') {
        generatedPosts.push(
          `${topic} reminds us that growth comes from continuous learning. Keep pushing forward! 💪`,
          `Every expert in ${topic} was once a beginner. Your journey starts today. ✨`,
          `${topic} teaches us that success is built one step at a time. Believe in your potential! 🌟`
        );
      }

      // Add platform-specific variations
      if (platform === 'linkedin') {
        generatedPosts.push(
          `I've been working with ${topic} for a while now, and here are 3 key lessons I've learned:\n\n1. [Insight 1]\n2. [Insight 2]\n3. [Insight 3]\n\nWhat has been your experience?`
        );
      } else if (platform === 'instagram') {
        generatedPosts.push(
          `✨ ${topic} ✨\n\nSwipe to learn more! 👉\n\n${generatedHashtags.slice(0, 5).join(' ')}`
        );
      }

      // Ensure posts fit platform limits
      const trimmedPosts = generatedPosts.map(post => {
        if (post.length > limit) {
          return post.slice(0, limit - 3) + '...';
        }
        return post;
      });

      setPosts(trimmedPosts);
      setHashtags(generatedHashtags);
      setGenerating(false);
    }, 700);
  };

  const copyPost = (post: string) => {
    const withHashtags = `${post}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(withHashtags);
    alert('Post copied with hashtags!');
  };

  const platformIcons = {
    twitter: '🐦',
    linkedin: '💼',
    facebook: '👥',
    instagram: '📸'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl mb-4">
              <Share2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Social Post Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create engaging social media posts instantly
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic or Message *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., productivity tips, new product launch"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['twitter', 'linkedin', 'facebook', 'instagram'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`py-3 px-4 rounded-xl font-medium transition ${
                        platform === p
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <span className="mr-2">{platformIcons[p]}</span>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['professional', 'casual', 'funny', 'inspirational'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`py-3 px-4 rounded-xl font-medium transition text-sm ${
                        tone === t
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={generatePosts}
            disabled={generating || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>{generating ? 'Generating...' : 'Generate Posts'}</span>
          </button>

          {posts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generated Posts
              </h2>

              {posts.map((post, index) => (
                <div
                  key={index}
                  className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl border-2 border-violet-200 dark:border-violet-800"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                      Post #{index + 1}
                    </span>
                    <button
                      onClick={() => copyPost(post)}
                      className="px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition flex items-center space-x-1 text-sm"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                  
                  <p className="text-gray-900 dark:text-white mb-3 whitespace-pre-line">
                    {post}
                  </p>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {post.length} / {platformLimits[platform]} characters
                  </div>
                </div>
              ))}

              <div className="p-5 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center space-x-2 mb-3">
                  <Hash className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Suggested Hashtags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
