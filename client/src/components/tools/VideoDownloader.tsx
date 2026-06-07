'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, Video, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

export default function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const detectPlatform = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
    if (url.includes('vimeo.com')) return 'Vimeo';
    if (url.includes('dailymotion.com')) return 'Dailymotion';
    return 'Direct URL';
  };

  const getDownloadService = (platform: string): { name: string; url: string; instructions: string } => {
    const services: Record<string, { name: string; url: string; instructions: string }> = {
      'YouTube': {
        name: 'Y2Mate',
        url: 'https://www.y2mate.com',
        instructions: 'Paste your YouTube URL, select quality, and download',
      },
      'Instagram': {
        name: 'SnapInsta',
        url: 'https://snapinsta.app',
        instructions: 'Paste your Instagram URL and download photos, videos, or reels',
      },
      'TikTok': {
        name: 'SnapTik',
        url: 'https://snaptik.app',
        instructions: 'Paste your TikTok URL to download without watermark',
      },
      'Facebook': {
        name: 'FBDown',
        url: 'https://www.fbdown.net',
        instructions: 'Paste your Facebook video URL and download in HD',
      },
      'Twitter/X': {
        name: 'TWDown',
        url: 'https://twdown.net',
        instructions: 'Paste your Twitter/X URL to download videos and GIFs',
      },
      'Vimeo': {
        name: 'Vimeo Downloader',
        url: 'https://vimeodownloader.com',
        instructions: 'Paste your Vimeo URL and select quality',
      },
      'Dailymotion': {
        name: 'SaveFrom',
        url: 'https://en.savefrom.net',
        instructions: 'Paste your Dailymotion URL and download',
      },
      'Direct URL': {
        name: 'SaveFrom',
        url: 'https://en.savefrom.net',
        instructions: 'Paste your video URL and download',
      },
    };

    return services[platform] || services['Direct URL'];
  };

  const handleDownload = () => {
    setError('');

    if (!url.trim()) {
      setError('Please enter a video URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    const platform = detectPlatform(url);
    const service = getDownloadService(platform);

    // Copy URL to clipboard
    navigator.clipboard.writeText(url).then(() => {
      // Open the download service
      window.open(service.url, '_blank');
    }).catch(() => {
      // If clipboard fails, still open the service
      window.open(service.url, '_blank');
    });
  };

  const platform = url ? detectPlatform(url) : '';
  const service = platform ? getDownloadService(platform) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Download className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Video Downloader
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Download videos from YouTube, Instagram, TikTok, Facebook, and more
            </p>
          </div>

          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Video URL
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste video URL here (YouTube, Instagram, TikTok, etc.)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
              </div>
              <button
                onClick={handleDownload}
                disabled={!url.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2 whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Platform Detection & Service Info */}
          {platform && service && (
            <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-4">
                <Video className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📱 Detected: {platform}
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Opening <strong>{service.name}</strong> - {service.instructions}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded">
                    <span>💡</span>
                    <span>Your URL has been copied to clipboard - just paste it on the downloader site!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Quick Access Services */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🚀 Quick Access Download Services:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { platform: 'YouTube', name: 'Y2Mate', url: 'https://www.y2mate.com', icon: '🎥' },
                { platform: 'Instagram', name: 'SnapInsta', url: 'https://snapinsta.app', icon: '📸' },
                { platform: 'TikTok', name: 'SnapTik', url: 'https://snaptik.app', icon: '🎵' },
                { platform: 'Facebook', name: 'FBDown', url: 'https://www.fbdown.net', icon: '👥' },
                { platform: 'Twitter/X', name: 'TWDown', url: 'https://twdown.net', icon: '🐦' },
                { platform: 'All Platforms', name: 'SaveFrom', url: 'https://en.savefrom.net', icon: '🌐' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.platform}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Supported Platforms */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              ✅ Supported Platforms:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Twitter/X', 'Vimeo', 'Dailymotion', 'Reddit'].map((p) => (
                <div key={p} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3">
              📌 How It Works:
            </h3>
            <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start space-x-2">
                <span className="font-bold">1.</span>
                <span>Copy the video URL from YouTube, Instagram, TikTok, or any supported platform</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold">2.</span>
                <span>Paste the URL in the input field above and click "Download"</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold">3.</span>
                <span>We'll open the best downloader service and copy your URL to clipboard</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold">4.</span>
                <span>Paste your URL on the downloader site, choose quality, and download!</span>
              </li>
            </ol>
          </div>

          {/* Note */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>⚠️ Important:</strong> We connect you to trusted third-party download services. 
              Please respect copyright laws and only download videos you have permission to use. 
              This tool is for personal use only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
