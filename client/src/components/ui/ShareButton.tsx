'use client';

import { useState } from 'react';
import { Share2, Check, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
  text?: string;
}

export default function ShareButton({ title, url, text }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = text || `Check out ${title} on ToolSphere!`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-2 space-y-1">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={shareToTwitter}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Share on Twitter</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Share on Facebook</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Share on LinkedIn</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
