'use client';

import { useState } from 'react';
import { Sparkles, Image as ImageIcon, Wand2, Download, RefreshCw, Settings } from 'lucide-react';

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState({
    style: 'realistic',
    size: '1024x1024',
    quality: 'high',
    steps: 50,
  });

  const styles = [
    { id: 'realistic', name: 'Realistic', emoji: '📸' },
    { id: 'artistic', name: 'Artistic', emoji: '🎨' },
    { id: 'anime', name: 'Anime', emoji: '🎭' },
    { id: 'digital-art', name: 'Digital Art', emoji: '💻' },
    { id: 'oil-painting', name: 'Oil Painting', emoji: '🖼️' },
    { id: '3d-render', name: '3D Render', emoji: '🎲' },
  ];

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setGenerating(true);

    try {
      // Simulate AI image generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate a placeholder image with text
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(0.5, '#764ba2');
      gradient.addColorStop(1, '#f093fb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 1024);

      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AI Generated Image', 512, 400);
      
      ctx.font = '32px Arial';
      ctx.fillText(`Style: ${settings.style}`, 512, 500);
      ctx.fillText(`Size: ${settings.size}`, 512, 550);
      
      ctx.font = '24px Arial';
      const words = prompt.split(' ');
      let line = '';
      let y = 650;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (testLine.length > 40 && line !== '') {
          ctx.fillText(line, 512, y);
          line = words[i] + ' ';
          y += 30;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 512, y);

      setGeneratedImage(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const downloadImage = () => {
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `ai-generated-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Wand2 className="w-16 h-16 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AI Image Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate stunning images from text descriptions using AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Controls */}
            <div className="space-y-6">
              {/* Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prompt (Describe what you want to see)
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A beautiful sunset over mountains, vibrant colors, highly detailed..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSettings({ ...settings, style: style.id })}
                      className={`p-3 rounded-lg border-2 transition ${
                        settings.style === style.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.emoji}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {style.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Settings */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  <Settings className="w-4 h-4" />
                  <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Settings</span>
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image Size
                      </label>
                      <select
                        value={settings.size}
                        onChange={(e) => setSettings({ ...settings, size: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="512x512">512 × 512</option>
                        <option value="1024x1024">1024 × 1024</option>
                        <option value="1024x1792">1024 × 1792 (Portrait)</option>
                        <option value="1792x1024">1792 × 1024 (Landscape)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quality
                      </label>
                      <select
                        value={settings.quality}
                        onChange={(e) => setSettings({ ...settings, quality: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="standard">Standard</option>
                        <option value="high">High</option>
                        <option value="ultra">Ultra</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Negative Prompt (What to avoid)
                      </label>
                      <textarea
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="blurry, low quality, distorted..."
                        className="w-full h-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={generateImage}
                disabled={generating || !prompt.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating Image...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>

            {/* Right: Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generated Image
              </label>
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                {generatedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={generatedImage}
                      alt="AI Generated"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={downloadImage}
                      className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white text-gray-900 rounded-lg shadow-lg transition flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-semibold">Download</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mb-4" />
                    <p className="text-sm">Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              <strong>Note:</strong> This is a demonstration interface. In production, it would connect to AI image generation services like DALL-E, Midjourney, or Stable Diffusion to create real images from your prompts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
