'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Music, Link as LinkIcon, Video } from 'lucide-react';

export default function VideoToMP3() {
  const [mode, setMode] = useState<'file' | 'url'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAudioUrl(null);
    }
  };

  const convertToMP3 = async () => {
    if (mode === 'file' && !videoFile) {
      alert('Please select a video file');
      return;
    }
    if (mode === 'url' && !videoUrl) {
      alert('Please enter a video URL');
      return;
    }

    // Check if URL is from unsupported platforms
    if (mode === 'url' && videoUrl) {
      const unsupportedPlatforms = [
        'youtube.com', 'youtu.be', 'instagram.com', 'facebook.com', 
        'tiktok.com', 'twitter.com', 'x.com', 'vimeo.com', 'dailymotion.com'
      ];
      
      const isUnsupported = unsupportedPlatforms.some(platform => 
        videoUrl.toLowerCase().includes(platform)
      );
      
      if (isUnsupported) {
        alert('❌ YouTube, Instagram, Facebook, TikTok, and Twitter videos are not supported in URL mode.\n\n✅ Solution:\n1. Download the video first using a video downloader\n2. Then use "Upload File" mode to convert it to MP3');
        return;
      }
    }

    setConverting(true);
    setProgress(0);

    try {
      if (mode === 'file' && videoFile) {
        // Convert uploaded file
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        
        video.onloadedmetadata = () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = audioContext.createMediaElementSource(video);
          const dest = audioContext.createMediaStreamDestination();
          source.connect(dest);
          source.connect(audioContext.destination);

          const mediaRecorder = new MediaRecorder(dest.stream);
          const chunks: Blob[] = [];

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setConverting(false);
            setProgress(100);
          };

          video.onended = () => {
            mediaRecorder.stop();
          };

          video.ontimeupdate = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(Math.round(percent));
          };

          mediaRecorder.start();
          video.play();
        };
      } else if (mode === 'url' && videoUrl) {
        // For URL mode, we'll use a simpler approach
        // Note: This requires CORS-enabled videos
        const video = videoRef.current;
        if (!video) return;

        video.src = videoUrl;
        video.load();

        video.onloadedmetadata = () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = audioContext.createMediaElementSource(video);
          const dest = audioContext.createMediaStreamDestination();
          source.connect(dest);
          source.connect(audioContext.destination);

          const mediaRecorder = new MediaRecorder(dest.stream);
          const chunks: Blob[] = [];

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setConverting(false);
            setProgress(100);
          };

          video.onended = () => {
            mediaRecorder.stop();
          };

          video.ontimeupdate = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(Math.round(percent));
          };

          mediaRecorder.start();
          video.play();
        };

        video.onerror = () => {
          const errorMsg = videoUrl.includes('youtube') || videoUrl.includes('youtu.be') 
            ? 'YouTube videos cannot be loaded directly. Please download the video first and use Upload File mode.'
            : videoUrl.includes('instagram') 
            ? 'Instagram videos cannot be loaded directly. Please download the video first and use Upload File mode.'
            : 'Failed to load video from URL. The URL must be a direct video file link (ending in .mp4, .webm, etc.) and CORS-enabled.';
          
          alert('❌ ' + errorMsg);
          setConverting(false);
        };
      }
    } catch (error) {
      console.error('Error converting video:', error);
      alert('Failed to convert video. Please try again.');
      setConverting(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'audio.mp3';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Music className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Video to MP3 Converter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Extract audio from video files or URLs
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('file')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                mode === 'file'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>Upload File</span>
            </button>
            <button
              onClick={() => setMode('url')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                mode === 'url'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <LinkIcon className="w-5 h-5" />
              <span>From URL</span>
            </button>
          </div>

          {/* File Upload Mode */}
          {mode === 'file' && !videoFile && (
            <div className="mb-6">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Video className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    MP4, AVI, MOV, MKV (MAX. 100MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {/* URL Input Mode */}
          {mode === 'url' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                  <strong>⚠️ Important:</strong> Direct video file URLs only
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                  ✅ Works: Direct links ending in .mp4, .webm, .mov, etc.
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  ❌ Doesn't work: YouTube, Instagram, Facebook, TikTok, Twitter (use download tools first)
                </p>
              </div>
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200 font-semibold mb-2">
                  💡 How to use YouTube/Instagram videos:
                </p>
                <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Download the video first using a video downloader tool</li>
                  <li>Then upload the downloaded file using "Upload File" mode above</li>
                  <li>Or use online services like: y2mate.com, savefrom.net, or snapinsta.app</li>
                </ol>
              </div>
            </div>
          )}

          {/* Video Info */}
          {videoFile && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Video className="w-8 h-8 text-primary-600" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{videoFile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {converting && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Converting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-semibold mb-3">
                ✓ Conversion Complete!
              </p>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mp3" />
              </audio>
            </div>
          )}

          {/* Hidden video element for URL mode */}
          <video ref={videoRef} className="hidden" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={convertToMP3}
              disabled={converting || (mode === 'file' && !videoFile) || (mode === 'url' && !videoUrl)}
              className="flex-1 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
            >
              {converting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <Music className="w-5 h-5" />
                  <span>Convert to MP3</span>
                </>
              )}
            </button>

            {audioUrl && (
              <button
                onClick={downloadAudio}
                className="flex-1 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download MP3</span>
              </button>
            )}

            {(videoFile || videoUrl) && (
              <button
                onClick={() => {
                  setVideoFile(null);
                  setVideoUrl('');
                  setAudioUrl(null);
                  setProgress(0);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="py-4 px-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Reset
              </button>
            )}
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              <strong>📌 Best Practice:</strong>
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2 list-disc list-inside">
              <li><strong>Upload File mode:</strong> Works with all video files - recommended for best results</li>
              <li><strong>URL mode:</strong> Only works with direct video file links (not YouTube/Instagram/etc)</li>
              <li><strong>For social media videos:</strong> Download them first, then use Upload File mode</li>
              <li><strong>Audio quality:</strong> Depends on the source video quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
